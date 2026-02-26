# Contributing

## Publishing

Start by updating the version number:

```sh
git checkout main
git pull --autostash --prune --rebase

VERSION=$(pnpm version patch --no-git-tag-version)
echo $(jq --arg v "${VERSION#v}" '.version = $v' jsr.json) > jsr.json
pnpm run format

git checkout -b "release/$VERSION"
git commit --all --message "🔖 $VERSION"
git push --set-upstream origin "release/$VERSION"

gh pr create --assignee @me --base main --draft --fill-verbose --head "release/$VERSION" --title "🔖 $VERSION"
```

Once the CI passes, merge the pull request, wait for the CI to pass again then push a new tag:

```sh
git checkout main
git pull --autostash --prune --rebase
git tag "$VERSION" --annotate --message "🔖 $VERSION" --sign
git push --tags
```
