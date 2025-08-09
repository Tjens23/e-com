#!/usr/bin/env bash
set -euo pipefail

# Get latest tag or empty
if git describe --tags --abbrev=0 >/dev/null 2>&1; then
    latest_tag=$(git describe --tags --abbrev=0)
    commit_range="${latest_tag}..HEAD"
else
    latest_tag="0.0.0"
    commit_range="$(git rev-list --max-parents=0 HEAD)..HEAD" # from first commit
fi

commits=$(git log $commit_range --pretty=format:"%s%n%b")

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
