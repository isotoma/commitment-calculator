#!/bin/bash

repo_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

main() {
    rm -rf build
    mkdir -p build

    cp index.html main.js build/
}

cd "$repo_dir" && main "$@"
