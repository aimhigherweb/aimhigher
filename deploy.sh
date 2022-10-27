#!/bin/bash

# netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions"

OUTPUT=$(netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions")

NETLIFY_URL=jq -r '.deploy_url' <<<"$OUTPUT"
NETLIFY_LOGS="${OUTPUT}" | jq -r '.logs' <<<$OUTPUT
DEPLOY_ID=$(jq -r '.deploy_id' <<<"${OUTPUT}")
SITE_NAME="${OUTPUT}" | jq -r '.site_name'

echo "${OUTPUT}"
echo "${OUTPUT}" | jq -r '.deploy_url'

echo 'Printing out items'
echo $NETLIFY_URL
echo $NETLIFY_LOGS
echo $DEPLOY_ID
echo $SITE_NAME

echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT