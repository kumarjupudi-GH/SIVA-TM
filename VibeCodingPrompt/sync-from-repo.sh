#!/bin/sh
# Refresh implemented-code/ from the repo so it always matches what is deployed. Run from the repo root: sh VibeCodingPrompt/sync-from-repo.sh
set -e
D=VibeCodingPrompt/implemented-code
rm -rf "$D"; mkdir -p "$D"
cp -r source index.html _headers build_deploy.py apps-script logo try worker README.md "$D"/
echo "synced to $D"
