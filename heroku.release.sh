#!/bin/bash
imageId=$(docker inspect registry.heroku.com/$HEROKU_APP_NAME/web --format={{.Id}})
curl -n -X PATCH https://api.heroku.com/apps/${HEROKU_APP_NAME}/formation \
  -d '{
  "updates": [
    {
      "type": "web",
      "docker_image": "'"$imageId"'"
    }
  ]
}' \
  -H "Authorization: Bearer $HEROKU_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases"