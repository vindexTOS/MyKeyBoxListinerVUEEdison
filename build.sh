git checkout built
git merge master
npm run build
git add -A
git commit -m "Build"
git push origin built
git checkout master
