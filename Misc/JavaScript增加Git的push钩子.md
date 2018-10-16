# Dep
- devDependencies: 
>@commitlint/config-conventional
<br>
>@commitlint/cli
<br>
>standard-version

- dependencies: 
>husky

# Config file
Add `commitlint.config.js`

> module.exports = {
  extends: ['@commitlint/config-conventional'],
};

# Script
>  "scripts": {
    "commitmsg": "commitlint -E GIT_PARAMS",
    "release": "standard-version"
  },