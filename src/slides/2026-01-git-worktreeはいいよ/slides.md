---
theme: seriph
title: Git Worktree はいいよ
info: |
  Git Worktree の使い方と活用法について
transition: slide-up
layout: intro
hideInToc: true
colorSchema: dark
fonts:
  sans: 'Robot'
  serif: 'Robot Slab'
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
meta:
  slug: git-worktree
  date: '2026-01'
  description: Git Worktreeの使い方と活用法について
  icon: logos:git-icon
  published: true
  legacyPath: 2026-01-git-worktreeはいいよ
---

<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
  <div class="text-6xl font-bold mb-4">
    <logos-git-icon class="inline-block mr-2" /> Git Worktree
  </div>
  <div class="text-2xl text-gray-400">
    複数ブランチを同時に作業する魔法
  </div>
</div>

---
src: ../../components/slides/profile_2024.md
hideInToc: true
---

---
layout: center
hideInToc: true
---

# 目次

<Toc maxDepth="1" />

---
layout: center
---

# Git Worktree とは

<div class="grid grid-cols-2 gap-8 mt-8">
<div v-click class="p-4 rounded-lg bg-gray-800">

## 通常の Git

```
myproject/
└── .git/
    └── (1つの作業ディレクトリ)
```

- 1リポジトリ = 1作業ディレクトリ
- ブランチ切り替え時は **stash** が必要

</div>
<div v-click class="p-4 rounded-lg bg-green-900">

## Git Worktree

```
myproject/           # main ブランチ
myproject-feature/   # feature ブランチ
myproject-hotfix/    # hotfix ブランチ
└── 全て同じ .git を共有
```

- 1リポジトリ = **N個の作業ディレクトリ**
- 各ディレクトリで異なるブランチを同時展開

</div>
</div>

---

# なぜ Worktree が必要なのか

<div class="grid grid-cols-2 gap-8 mt-8">
<div>

## stash の問題点

<div v-click class="mt-4 text-red-400">

- 作業を中断して stash → 忘れがち
- stash list が溜まって混乱
- ビルドキャッシュが無駄になる
- コンテキストスイッチのコスト

</div>
</div>
<div>

## Worktree のメリット

<div v-click class="mt-4 text-green-400">

- 作業を中断せず別ブランチで作業
- 各 worktree で独立したビルドキャッシュ
- 複数機能を並行開発
- IDE で複数ウィンドウを開ける

</div>
</div>
</div>

<div v-click class="mt-8 p-4 rounded-lg bg-blue-900 text-center">

**「ブランチを切り替える」から「ディレクトリを移動する」へ**

</div>

---
layout: center
---

# 基本コマンド: add

新しい作業ツリーを作成する

```bash {1|3|5|7|all}
# パス名から自動でブランチを作成
git worktree add ../feature-login

# 既存ブランチを指定してチェックアウト
git worktree add ../hotfix hotfix/urgent-fix

# 新規ブランチを作成して追加
git worktree add -b feature/new ../feature-new

# デタッチHEAD（特定コミットで作業）
git worktree add -d ../debug abc1234
```

<div v-click class="mt-4 p-3 rounded bg-yellow-900 text-sm">

💡 リモートに同名ブランチがあれば自動で追跡設定される

</div>

---

# 基本コマンド: list / remove

<div class="grid grid-cols-2 gap-8">
<div>

## list - 一覧表示

```bash
$ git worktree list
/path/to/main       abc1234 [main]
/path/to/feature    def5678 [feature/auth]
/path/to/hotfix     ghi9012 [hotfix/bug]
```

<div v-click class="mt-4">

```bash
# 詳細表示
git worktree list --verbose

# スクリプト用出力
git worktree list --porcelain
```

</div>
</div>
<div>

## remove - 削除

```bash
# worktree を削除
git worktree remove ../feature-login
```

<div v-click class="mt-4">

```bash
# 変更がある場合は強制削除
git worktree remove --force ../feature-login
```

</div>

<div v-click class="mt-4 p-3 rounded bg-red-900 text-sm">

⚠️ 未コミットの変更があると失敗する

</div>
</div>
</div>

---

# 基本コマンド: prune / その他

<div class="grid grid-cols-2 gap-8">
<div>

## prune - クリーンアップ

```bash
# 孤立した worktree 情報を削除
git worktree prune

# 削除される内容を事前確認
git worktree prune --dry-run
```

<div v-click class="mt-4 text-sm text-gray-400">

ディレクトリを手動削除した場合に使用

</div>
</div>
<div>

## その他のコマンド

<div v-click>

```bash
# worktree をロック（prune から保護）
git worktree lock ../feature
git worktree unlock ../feature
```

</div>

<div v-click class="mt-4">

```bash
# worktree を移動
git worktree move ../old ../new

# リンク修復（手動移動後）
git worktree repair
```

</div>
</div>
</div>

---
layout: center
---

# コマンド早見表

| コマンド | 用途 |
|---------|------|
| `git worktree add <path>` | 新しい worktree を作成 |
| `git worktree add -b <branch> <path>` | 新規ブランチで worktree 作成 |
| `git worktree list` | worktree 一覧を表示 |
| `git worktree remove <path>` | worktree を削除 |
| `git worktree prune` | 孤立した情報をクリーンアップ |
| `git worktree lock/unlock` | 保護 / 解除 |
| `git worktree move` | 移動 |
| `git worktree repair` | リンク修復 |

---

# VSCode 拡張機能: Git Worktree Manager

<div class="mt-2 text-gray-400">コマンドが苦手な人はこちら！</div>

<div class="grid grid-cols-2 gap-8 mt-6">
<div>

## 主な機能

<div v-click class="mt-4 space-y-2">

- **Ctrl+Shift+R** で worktree を高速切り替え
- GUI で新規 worktree を作成
- ワークスペースに複数 worktree を追加
- お気に入り登録で即座にアクセス
- 設定ファイルの自動コピー

</div>
</div>
<div v-click>

## インストール

```
拡張機能で検索:
Git Worktree Manager
```

<div class="mt-4 p-3 rounded bg-blue-900 text-sm">

<logos-visual-studio-code class="inline mr-2" />
[marketplace.visualstudio.com](https://marketplace.visualstudio.com/items?itemName=jackiotyu.git-worktree-manager)

</div>

<div class="mt-4 text-sm text-gray-400">

⭐ 5.0 / 9,000+ インストール / 無料

</div>
</div>
</div>

<div v-click class="mt-6 p-3 rounded bg-green-900 text-center">

💡 サイドバーから直感的に操作できるので初心者にもおすすめ

</div>

---

# ユースケース 1: 緊急バグ修正

<div class="mt-4">

**シナリオ**: feature 開発中に本番バグ発生！

</div>

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="p-4 rounded-lg bg-red-900">

## stash を使う場合

```bash {1|2|3|4|5|all}
git stash              # 作業を退避
git checkout main
git checkout -b hotfix
# ... 修正 ...
git checkout feature
git stash pop          # 作業を復元
```

<div v-click class="text-sm text-red-300 mt-2">

😵 手順が多い、stash を忘れがち

</div>
</div>
<div class="p-4 rounded-lg bg-green-900">

## worktree を使う場合

```bash {1|2|3|4|all}
git worktree add ../hotfix main
cd ../hotfix
# ... 修正 & コミット ...
cd ../myproject        # 元の作業に戻る
git worktree remove ../hotfix
```

<div v-click class="text-sm text-green-300 mt-2">

😊 作業を中断せず、すぐ戻れる

</div>
</div>
</div>

---

# ユースケース 2: コードレビュー

<div class="mt-4">

**シナリオ**: 他の人の PR を手元で動作確認したい

</div>

```bash {1-2|4-5|7-8|all}
# レビュー対象のブランチを展開
git worktree add ../review feature/someone-pr

# 動作確認（ビルド、テスト、手動確認）
cd ../review && npm install && npm run dev

# レビュー完了後、クリーンアップ
git worktree remove ../review
```

<div v-click class="mt-6 p-4 rounded-lg bg-blue-900">

💡 **メリット**
- 自分の作業を中断しなくていい
- レビュー専用の環境を素早く作れる
- 終わったらすぐ削除できる

</div>

---

# ユースケース 3: 並行開発 & AI 活用

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

## 複数機能の同時進行

```
myproject/
├── main/           # メイン
├── feature-auth/   # 認証機能
├── feature-api/    # API 改善
└── feature-ui/     # UI 改善
```

<div v-click class="mt-4 text-sm">

各機能を独立して開発・テスト可能

</div>
</div>
<div v-click>

## AI アシスタントとの並列作業

```bash
# AI 用の worktree を作成
git worktree add ../ai-task feature/ai-work
```

<div class="mt-4 text-sm">

- AI に一部を任せながら自分も作業
- 結果を確認してからマージ
- **2024-2025年のトレンド**

</div>

<div class="mt-2 p-2 rounded bg-purple-900 text-xs">

🤖 Claude Code などの AI エージェントと相性抜群

</div>
</div>
</div>

---

# ベストプラクティス

<div class="grid grid-cols-2 gap-8 mt-4">
<div>

## ディレクトリ命名規則

```bash
# パターン1: プロジェクト名-ブランチ名
myproject/
myproject-feature-auth/
myproject-hotfix/

# パターン2: 専用ディレクトリで管理
myproject/.worktrees/
├── feature-auth/
├── feature-api/
└── hotfix/
```

<div v-click class="mt-2 text-sm text-gray-400">

チームで統一すると分かりやすい

</div>
</div>
<div v-click>

## シェルエイリアス設定

```bash
# ~/.bashrc or ~/.zshrc
alias gwta='git worktree add'
alias gwtl='git worktree list'
alias gwtr='git worktree remove'

# よく使うパターン
alias gwt-hotfix='git worktree add \
  ../$(basename $(pwd))-hotfix main'
```

</div>
</div>

---
layout: center
---

# 注意点

<div class="grid grid-cols-2 gap-6 mt-8">
<div v-click class="p-4 rounded-lg bg-red-900">

## ⚠️ 同一ブランチは1箇所のみ

同じブランチを複数の worktree で<br>
同時にチェックアウトできない

</div>
<div v-click class="p-4 rounded-lg bg-yellow-900">

## ⚠️ サブモジュールに制限

サブモジュールを含むプロジェクトでは<br>
一部機能が制限される（実験的）

</div>
<div v-click class="p-4 rounded-lg bg-orange-900">

## ⚠️ メインは削除不可

メインの worktree（最初の clone）は<br>
削除・移動できない

</div>
<div v-click class="p-4 rounded-lg bg-purple-900">

## ⚠️ .gitignore はコピーされない

新しい worktree には `.gitignore` 対象の<br>
ファイルはコピーされない（.env 等）

</div>
</div>

---
layout: center
---

# まとめ

<div class="text-left mt-8 space-y-4">

<div v-click class="flex items-center gap-4">
  <div class="text-3xl">🌳</div>
  <div><strong>Git Worktree</strong> = 1リポジトリで複数作業ディレクトリ</div>
</div>

<div v-click class="flex items-center gap-4">
  <div class="text-3xl">📝</div>
  <div><code>add</code>, <code>list</code>, <code>remove</code> の3つを覚えればOK</div>
</div>

<div v-click class="flex items-center gap-4">
  <div class="text-3xl">🚀</div>
  <div>緊急対応・並行開発・レビューで威力を発揮</div>
</div>

<div v-click class="flex items-center gap-4">
  <div class="text-3xl">📁</div>
  <div>ディレクトリ命名規則を決めておくと便利</div>
</div>

</div>

<div v-click class="mt-8 text-center text-gray-400">

参考: [Git 公式ドキュメント](https://git-scm.com/docs/git-worktree) ｜ [GUIで簡単に使えるガイド](https://kurutto115.hatenablog.com/entry/2025/git-worktree)

</div>
