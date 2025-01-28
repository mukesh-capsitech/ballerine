#!/usr/bin/env sh

if [[ -z "$VITE_DOMAIN" ]]
then
    VITE_DOMAIN="http://localhost:3000"
fi

if [[ -z "$VITE_API_KEY" ]]
then
    VITE_API_KEY="secret"
fi

if [[ -z "$VITE_AUTH_ENABLED" ]]
then
    VITE_AUTH_ENABLED=true
fi


if [[ -z "$VITE_MOCK_SERVER" ]]
then
    VITE_MOCK_SERVER=false
fi

if [[ -z "$VITE_POLLING_INTERVAL" ]]
then
    VITE_POLLING_INTERVAL=10
fi

if [[ -z "$VITE_ASSIGNMENT_POLLING_INTERVAL" ]]
then
    VITE_ASSIGNMENT_POLLING_INTERVAL=5
fi

if [[ -z "$VITE_FETCH_SIGNED_URL" ]]
then
    VITE_FETCH_SIGNED_URL=false
fi

cat << EOF > /usr/share/nginx/html/config.js
globalThis.env = {
  VITE_API_URL: "$VITE_DOMAIN/api/v1/internal",
  VITE_API_KEY: "$VITE_API_KEY",
  VITE_AUTH_ENABLED: "$VITE_AUTH_ENABLED",
  VITE_MOCK_SERVER: "$VITE_MOCK_SERVER",
  VITE_POLLING_INTERVAL: "$VITE_POLLING_INTERVAL",
  VITE_ASSIGNMENT_POLLING_INTERVAL: "$VITE_ASSIGNMENT_POLLING_INTERVAL",
  VITE_FETCH_SIGNED_URL: "$VITE_FETCH_SIGNED_URL",
  VITE_ENVIRONMENT_NAME: "local",
  MODE: "production"
}
EOF

# Handle CMD command
exec "$@"
