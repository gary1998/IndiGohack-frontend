set -x

rm -rf js/config.json
echo "{\"BACKEND_URL\":\"$BACKEND_URL\"}" >> js/config.json
node server.js