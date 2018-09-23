#!/bin/sh

# git remote add alraqmiyyat https://github.com/alraqmiyyat/alraqmiyyat.github.io.git
# git pull alraqmiyyat master
# git push origin master

echo "Pulling updates from alraqmiyyat.github.io"
printf "\n\n"
git pull alraqmiyyat master
git add .
git commit -m "New updates from alraqmiyyat.github.io"
echo "Pushing updates to maximromanov.github.io"
printf "\n\n"
git push origin master

printf "\n\nDone!"

# if issues, check: https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files