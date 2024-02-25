aria2c --on-download-complete="$(pwd)/hook.sh" "$@"
