# My Slides

- スライドの複数起動は不可

## powerd by

- [slidev](https://github.com/slidevjs/slidev)
- [docker](https://www.docker.com/)

## 参考

- [公式 guide](https://sli.dev/guide/)

## 環境構築

1. リポジトリの clone

   ```sh
   git clone {リポジトリURL}
   ```

2. Editor に pretter 拡張機能をインストール

   - [pretter](https://prettier.io/)
   - [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

3. コンテナを立ち上げる

   ```sh
   docker-compose up -d
   ```

4. コンテナに入る

   ```sh
   docker-compose exec slidev bash
   ```

## 新規スライド

1. コンテナに入る

   ```sh
   docker-compose up -d
   docker-compose exec slidev bash
   ```

2. 新規スライドを作成

   ```sh
   yarn create slidev
   ```

3. 対話に従いスライドを作成

   - 新規作成時は自動でローカルでスライドが起動される。

## ローカルのスライド環境を起動

1. コンテナに入る

   ```sh
   docker-compose exec slidev bash
   ```

2. 編集対象の slide に移動

   ```sh
   cd {slideフォルダ}
   ```

3. スライドを起動

   ```sh
   npx slidev --remote
   ```

4. スライドを開く

   ```sh
   root@4ea691802e16:~/slidev/test# npx slidev --remote


   ●■▲
   Slidev  v0.49.28

   theme       @slidev/theme-seriph
   css engine  unocss
   entry       /root/slidev/{slideフォルダ}/slides.md

   public slide show   > http://localhost:3030/
   presenter mode      > http://localhost:3030/presenter/
   slides overview     > http://localhost:3030/overview/
   remote control      > http://172.23.0.2:3030/entry/

   shortcuts           > restart | open | edit | quit | qrcode
   ```
