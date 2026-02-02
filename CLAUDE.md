# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Slidevベースのプレゼンテーションスライドをホスティングするプラットフォーム。Cloudflare Workers上にデプロイされ、pnpmワークスペースによるモノレポ構成で複数のスライドを管理する。

**本番サイト:** https://slides.spherestacking.com/

## 開発コマンド

すべてのコマンドは`src/`ディレクトリで実行する。

```sh
pnpm install          # 依存関係のインストール
pnpm dev              # 対話的にスライドを選択して開発サーバー起動
pnpm dev:latest       # 最新のスライドを自動選択して起動
pnpm build            # 全スライドをビルド（並列実行、デフォルト並列数: 2）
pnpm build:index      # slides.jsonマニフェストを生成
pnpm build:redirects  # Cloudflare用_redirectsファイルを生成
pnpm preview          # dist/ディレクトリをローカルでプレビュー
```

**スライドをPDFにエクスポート:**
```sh
cd src/slides/{スライドフォルダ}
npx slidev export
```

**特定のスライドのみビルド:**
```sh
pnpm build --only=slug名
```

## アーキテクチャ

### ディレクトリ構成

```
src/
├── worker.ts              # Honoベースのエントリーポイント（API + SPAルーティング）
├── index.html             # ランディングページ
├── slides.json            # 自動生成されるスライド一覧（git管理外）
├── scripts/               # ビルド・開発用スクリプト
│   ├── dev.ts            # 対話的開発サーバー起動
│   ├── build.ts          # 並列ビルド実行
│   ├── generate-index.ts # slides.json生成
│   └── utils.ts          # 共通ユーティリティ
├── slides/               # 各スライドのワークスペースパッケージ
│   └── {スライドフォルダ}/
│       ├── package.json  # 個別パッケージ定義
│       └── slides.md     # Slidevプレゼンテーション
└── components/slides/    # 共有コンポーネント（プロフィール等）
```

### Worker構成（Hono）

- `/api/slides` - slides.jsonを返すAPIエンドポイント（CORS対応、5分キャッシュ）
- `/*` - 静的アセット配信 + SPAフォールバック（親ディレクトリのindex.htmlを探索）

### スライドメタデータ

各`slides.md`のYAMLフロントマターで管理:

```yaml
meta:
  slug: url-identifier     # URL用識別子
  date: YYYY-MM-DD        # ソート用日付
  event: "イベント名"       # 発表イベント（任意）
  description: "説明"
  icon: "iconify:アイコン名"
  published: true/false   # 公開フラグ
  legacyPath: "旧パス"     # レガシーURLリダイレクト用
```

### ビルド出力

- 日付付きスライド: `dist/{year}/{slug}/`
- 特殊スライド（日付なし）: `dist/{slug}/`

## 技術スタック

- **Slidev** - Markdownベースのプレゼンテーションフレームワーク
- **Hono** - 軽量Webフレームワーク
- **Cloudflare Workers** - サーバーレスデプロイ
- **pnpm** - パッケージマネージャ（v9.15.0）
- **TypeScript** - ES2022ターゲット
