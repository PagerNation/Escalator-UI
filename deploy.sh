#! /bin/bash

if [ "$TRAVIS_BRANCH" == "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  chmod 400 EscalatorUI.pem
  NODE_ENV=production npm run compile
  mv Caddyfile dist/Caddyfile
  tar -czf package.tgz dist
  scp -i EscalatorUI.pem -o StrictHostKeyChecking=no package.tgz $DEPLOY_USER@$DEPLOY_HOST:~/
  ssh -i EscalatorUI.pem -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/deploy.sh
fi