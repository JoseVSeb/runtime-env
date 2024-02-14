#!/bin/sh

# inject matching env variables in built html on server startup
runtime-env -m ^REACT_APP_ -p ./*.html

# serve the static files
serve -s .