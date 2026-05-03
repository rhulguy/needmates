#!/bin/bash
set -e

# Force-push the main branch to GitHub using GITHUB_TOKEN secret.
# Requires GITHUB_TOKEN env var to be set (Replit secret with repo scope).

if [ -z "$GITHUB_TOKEN" ]; then
  echo "Error: GITHUB_TOKEN is not set. Add it as a Replit secret." >&2
  exit 1
fi

REMOTE_BASE="https://github.com/rhulguy/needmates.git"

# Guarantee the clean (token-free) URL is restored on exit, whether the push
# succeeds, fails, or the script is interrupted.
trap 'git remote set-url origin "$REMOTE_BASE"' EXIT

git remote set-url origin "https://${GITHUB_TOKEN}@github.com/rhulguy/needmates.git"
git push --force origin main

echo "Push to $REMOTE_BASE succeeded."
