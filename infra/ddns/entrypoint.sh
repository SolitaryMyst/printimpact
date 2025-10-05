#!/bin/sh
set -eu

log() {
  # UTC timestamp
  printf '%s %s\n' "$(date -u +'%Y-%m-%dT%H:%M:%SZ')" "$*"
}

# Required env
: "${CHANGEIP_USER:?Set CHANGEIP_USER}"
: "${CHANGEIP_PASS:?Set CHANGEIP_PASS}"
: "${CHANGEIP_HOSTNAMES:?Set CHANGEIP_HOSTNAMES (comma-separated)}"

# Optional env
INTERVAL_SECONDS="${INTERVAL_SECONDS:-300}"
CHANGEIP_BASE_URL="${CHANGEIP_BASE_URL:-https://nic.changeip.com/nic/update}"
PUBLIC_IP_ENDPOINTS="${PUBLIC_IP_ENDPOINTS:-https://api.ipify.org,https://ifconfig.me}"
CURL_UA="${CURL_UA:-curl-ddns}"

get_public_ip() {
  IFS=,
  for ep in $PUBLIC_IP_ENDPOINTS
  do
    ip="$(curl -A "$CURL_UA" -fsS "$ep" 2>/dev/null || true)"
    if [ -n "$ip" ]; then
      echo "$ip"
      return 0
    fi
  done
  return 1
}

dns_a() {
  host="$1"
  dig +short A "$host" | head -n1
}

update_hostname() {
  host="$1"
  pubip="$2"
  resp="$(curl -A "$CURL_UA" -fsS \
    --get "$CHANGEIP_BASE_URL" \
    --data-urlencode "u=$CHANGEIP_USER" \
    --data-urlencode "p=$CHANGEIP_PASS" \
    --data-urlencode "hostname=$host" \
    --data-urlencode "myip=$pubip" 2>/dev/null || true)"
  log "update $host -> $pubip | response='$resp'"
}

log "starting changeip ddns updater"
log "hosts: $CHANGEIP_HOSTNAMES | interval: ${INTERVAL_SECONDS}s"

while :
do
  pubip="$(get_public_ip || true)"
  if [ -z "${pubip:-}" ]; then
    log "failed to determine public IP"
    sleep "$INTERVAL_SECONDS"
    continue
  fi

  IFS=,
  for host in $CHANGEIP_HOSTNAMES
  do
    host="$(echo "$host" | xargs)"
    [ -z "$host" ] && continue
    current="$(dns_a "$host" || true)"
    if [ "$current" != "$pubip" ]; then
      log "change detected for $host: dns='$current' -> wan='$pubip'"
      update_hostname "$host" "$pubip"
    else
      log "no change for $host (=$pubip)"
    fi
  done

  sleep "$INTERVAL_SECONDS"
done
