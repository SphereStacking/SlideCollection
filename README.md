# My Slides

## 訪問者向け情報

@SphereStacking が作成したスライドを公開しています。

https://spherestacking.github.io/SlideCollection/

---

## 開発者向け情報

### 参考資料

- [公式ガイド](https://sli.dev/guide/)

### 使用技術

- [slidev](https://github.com/slidevjs/slidev)

### 環境構築手順

> [!NOTE]
> スライドの複数起動は不可

1. リポジトリのクローン

   ```sh
   git clone {リポジトリURL}
   ```

2. エディタに Prettier 拡張機能をインストール

   - [Prettier](https://prettier.io/)
   - [prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

3. コンテナを立ち上げる

   ```sh
   docker-compose up -d
   ```

4. コンテナに入る

   ```sh
   docker-compose exec slidev bash
   ```

### 新規スライド作成手順

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

### ローカルスライド環境の起動手順

1. コンテナに入る

   ```sh
   docker-compose exec slidev bash
   ```

2. 編集対象のスライドフォルダに移動

   ```sh
   cd {slideフォルダ}
   ```

3. スライドを起動

   ```sh
   npx slidev --remote

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
