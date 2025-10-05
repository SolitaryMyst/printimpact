# ChangeIP DDNS Updater (Docker)

Minimal updater for ChangeIP-compatible DDNS. Independent of router firmware.

## Files
- `Dockerfile` and `entrypoint.sh`: container logic.
- `docker-compose.yml`: stack definition.
- `.env.example`: copy to `.env` and fill in values.

## Usage
```bash
cd /mnt/data/ddns
cp .env.example .env
# edit .env with your credentials and hostnames
docker compose up -d --build
docker logs -f changeip-ddns
```

## Notes
- Supports multiple hostnames: set `CHANGEIP_HOSTNAMES` as comma-separated list.
- Healthcheck uses ipify to ensure outbound connectivity.
- If your ISP uses CGNAT, inbound port forwarding will not work regardless of DDNS.
