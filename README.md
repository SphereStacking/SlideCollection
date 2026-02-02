# My Slides

## 訪問者向け情報

@SphereStacking が作成したスライドを公開しています。

https://slides.spherestacking.com/

---

## 開発者向け情報

### 参考資料

- [公式ガイド](https://sli.dev/guide/)

### 使用技術

- [slidev](https://github.com/slidevjs/slidev)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)

### 環境構築手順

1. リポジトリのクローン

   ```sh
   git clone {リポジトリURL}
   ```

2. 依存関係のインストール

   ```sh
   cd src
   pnpm install
   ```

3. ローカルでスライドを起動

   ```sh
   pnpm dev
   ```

### スライドのエクスポート

```sh
cd src/slides/{slideフォルダ}
npx slidev export
```
