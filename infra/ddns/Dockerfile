FROM alpine:3.20

# Install tools
RUN apk add --no-cache curl bind-tools tzdata ca-certificates &&     adduser -D -H -u 10001 ddns

WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

USER ddns

HEALTHCHECK --interval=1m --timeout=10s --start-period=20s   CMD wget -qO- https://api.ipify.org || exit 1

ENTRYPOINT ["/app/entrypoint.sh"]
