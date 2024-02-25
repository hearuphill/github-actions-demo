#!/bin/env bash
echo -e "Called with: \nGID=$1 \nNumberOfFiles=$2 \nFilePath=$3"

# https://aria2.github.io/manual/en/html/aria2c.html#event-hook

if [[ "$2" == "0" ]]; then
    exit
fi

printf "[[download complete]] \n\n%s \n%s" "$3" "$1 $2" |
    curl --data-binary @- ntfy.sh/sshxsshx

npx zx hook.mjs "$1" "$2" "$3"
exit 0

result=$(aliyunpan u "$3" /aria2)

printf "[[upload complete]] \n\n%s \n%s" "$3" "$result" |
    curl --data-binary @- ntfy.sh/sshxsshx
