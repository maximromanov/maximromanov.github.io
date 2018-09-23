#!/bin/sh

# may need to run `chmod 755 scriptName.sh` to make it executable

git push origin master
git status
echo "Pushing updates to alraqmiyyat.github.io has been completed..."

echo "Syncing alraqmiyyat.github.io with maximromanov.github.io"
cd ../maximromanov.github.io/ && ./sync.sh

printf "\n\nDone!"