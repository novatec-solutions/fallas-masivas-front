git pull origin $branch
npm run build
cd dist
rm -rf /var/www/html
cp -r fallas-masivas/* /var/www/html