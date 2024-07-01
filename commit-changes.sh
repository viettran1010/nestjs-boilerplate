#!/bin/bash
# This script commits changes to the version control system

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "No changes to commit."
else
    echo "Committing changes..."
    git add .
    git commit -m "Remove package-lock.json and update yarn.lock"
    echo "Changes committed successfully."
fi