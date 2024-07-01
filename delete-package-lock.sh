#!/bin/bash
# This script deletes package-lock.json and runs yarn install

# Check if package-lock.json exists in the current directory
if [ -f package-lock.json ]; then
    echo "Removing package-lock.json..."
    rm package-lock.json
    echo "Running yarn install to update yarn.lock..."
    yarn install
    echo "package-lock.json removed and yarn.lock updated successfully."
else
    echo "package-lock.json does not exist. No action needed."
fi