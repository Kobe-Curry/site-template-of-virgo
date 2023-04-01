#!/bin/sh

cd ..
echo "[copy] START"
echo "[copy] >>>>>>>>>>>>"
cp -r "site" ".temp"
echo "[copy] DONEE"
cd ".temp"
echo "[clear] START"
echo "[clear] >>>>>>>>>>>"
rm -rf ".git"
rm -rf "static/ship/.git"
rm -rf "static/emojing/.git"
rm -rf "themes/virgo/.git"
rm -rf "content/secrets"
echo "[clear] DONEE"
pwd
git init
git add .
git commit -m "Templete updates."
git remote add origin https://github.com/loveminimal/site-template-of-virgo.git
git push -f origin master:main
# git remote add origin https://gitee.com/loveminimal/site-template-of-virgo.git
# git push -f origin master
cd ..
rm -rf ".temp"
cd "site"