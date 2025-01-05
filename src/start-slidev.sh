#!/bin/bash

# slidesディレクトリ内のフォルダを一覧表示
echo "Available slide folders:"
ls -d slides/*/ | nl

# ユーザーに選択させる
echo -n "Select folder number: "
read choice

# 選択されたフォルダのパスを取得
selected_folder=$(ls -d slides/*/ | sed -n "${choice}p")

if [ -z "$selected_folder" ]; then
    echo "Invalid selection"
    exit 1
fi

# 選択されたフォルダに移動
cd "$selected_folder"

# slidevを実行
npx slidev --remote 
