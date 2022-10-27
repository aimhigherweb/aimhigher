#!/bin/bash

echo 'Deploying works'
echo $NETLIFY_SITE_ID
echo $NETLIFY_AUTH_TOKEN


# netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions"

OUTPUT=$(sh -c netlify deploy --build --site $NETLIFY_SITE_ID --auth $NETLIFY_AUTH_TOKEN --json --message "Deploying from GitHub Actions")
echo $OUTPUT

#           NETLIFY_OUTPUT=$(echo "$OUTPUT")
#           NETLIFY_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*(--)[a-zA-Z0-9./?=_-]*') #Unique key: --
#           NETLIFY_LOGS_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://app.netlify.com/[a-zA-Z0-9./?=_-]*') #Unique key: app.netlify.com
#           NETLIFY_LIVE_URL=$(echo "$OUTPUT" | grep -Eo '(http|https)://[a-zA-Z0-9./?=_-]*' | grep -Eov "netlify.com") #Unique key: don't containr -- and app.netlify.com
#           echo $NETLIFY_OUTPUT
#           echo $NETLIFY_URL
#           echo $NETLIFY_LOGS_URL
#           echo $NETLIFY_LIVE_URL