#!/bin/bash

# netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions"

OUTPUT=$(netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions")

NETLIFY_URL="${OUTPUT}" | jq -r '.deploy_url'
NETLIFY_LOGS="${OUTPUT}" | jq -r '.logs'
DEPLOY_ID="${OUTPUT}" | jq -r '.deploy_id'
SITE_NAME="${OUTPUT}" | jq -r '.site_name'

echo "${OUTPUT}" | jq -r '.deploy_url'

echo 'Printing out items'
echo $NETLIFY_URL
echo $NETLIFY_LOGS
echo $DEPLOY_ID
echo $SITE_NAME

echo "NETLIFY_URL=${NETLIFY_URL}" >> $GITHUB_OUTPUT