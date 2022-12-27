#!/bin/bash
shopt -s extglob
set -o nounset
set -o errexit

DOCKER_BUILDKIT=1 docker build --network=host -t fdt-pub/cli:latest -f build/Dockerfile .
