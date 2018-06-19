echo "### Deploy Changes"
git config credential.helper "store --file=.git/credentials"
echo "https://${GH_TOKEN}:@github.com" > .git/credentials
git add dist
git commit -m "[travis-ci] auto build $(date +'%F %H:%M %Z')"
git push origin master