#!/usr/bin/env bash

# https://github.com/tickstep/aliyunpan?tab=readme-ov-file#apt%E5%AE%89%E8%A3%85
sudo curl -fsSL http://file.tickstep.com/apt/pgp | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg >/dev/null && echo "deb [signed-by=/etc/apt/trusted.gpg.d/tickstep-packages-archive-keyring.gpg arch=amd64,arm64] http://file.tickstep.com/apt aliyunpan main" | sudo tee /etc/apt/sources.list.d/tickstep-aliyunpan.list >/dev/null && sudo apt-get update && sudo apt-get install -y aliyunpan

# https://github.com/yt-dlp/yt-dlp/wiki/Installation#with-pip
python3 -m pip install --no-deps -U yt-dlp

sudo apt install aria2

script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd -P)
cd "$script_dir" || exit

mkdir .aria2 download
touch .aria2/aria2.session
chmod 777 *.sh
ln -s ./download ../dl

# https://github.com/tickstep/aliyunpan/blob/main/docs/manual.md#%E7%99%BB%E5%BD%95%E9%98%BF%E9%87%8C%E4%BA%91%E7%9B%98%E5%B8%90%E5%8F%B7
aliyunpan login -QrCode
aria2c --conf-path=aria2c.conf --on-download-complete="$(pwd)/hook.sh"
