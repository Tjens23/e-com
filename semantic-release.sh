#!/usr/bin/env bash
set -euo pipefail

latest_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "0.0.0")
commits=$(git log ${latest_tag}..HEAD --pretty=format:"%s%n%b")

if echo "$commits" | grep -q "BREAKING CHANGE:"; then
    release_type="major"
elif echo "$commits" | grep -q "^feat"; then
    release_type="minor"
elif echo "$commits" | grep -q "^fix"; then
    release_type="patch"
else
    echo "No release needed."
    exit 0
fi

IFS='.' read -r major minor patch <<< "$latest_tag"
case "$release_type" in
    major) major=$((major + 1)); minor=0; patch=0 ;;
    minor) minor=$((minor + 1)); patch=0 ;;
    patch) patch=$((patch + 1)) ;;
esac

new_version="$major.$minor.$patch"
git tag "$new_version"
git push origin "$new_version"

echo "Released $new_version ($release_type)"

