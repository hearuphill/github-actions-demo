#!/usr/bin/env bash

ssh-switcher load hearuphill -a || exit
rm -rf .git
git init
git remote add origin git@github.com:hearuphill/github-actions-demo.git
git branch -M main
git add .
git commit -m .
git push -uf origin main
