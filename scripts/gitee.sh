#!/bin/sh
# -------------------
# Deploy posts to `loveminimal.github.io`
# -------------------

if [ -d "public" ]
then
    cp -r "public" "../.temp"
    cd "../.temp"
    pwd
    git init
    git add .
    git commit -m "Posts update."
    git remote add origin https://gitee.com/loveminimal/loveminimal.git
    # git push -f origin master:main
    git push -f origin master
    cd ..
    rm -rf ".temp"
    cd "site"
fi