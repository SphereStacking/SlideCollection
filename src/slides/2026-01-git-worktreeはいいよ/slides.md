---
theme: seriph
title: Git Worktree の使い方と活用法について
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
    複数ブランチを同時に扱い、DXを向上できる
  </div>
</div>

---
src: ../../components/slides/profile_2026_q1.md
hideInToc: true
---

---
layout: center
hideInToc: true
---

# Outline

<Toc maxDepth="1" />

---
layout: center
---

# はじめに


- どういった場面で `Git Worktree` が役に立つのか
- 詳しいコマンドの使い方やオプションについては話しません

詳しい使い方は公式ドキュメントや VSCode 拡張機能にお任せします 🙏


---

<h1 class="text-center py-5">
  開発中に
</h1>

<div class="relative h-80">

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
    <img class="h-50" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left:0 }"
    :enter="{ opacity: 1,left:100, y: 20 }"
    class="absolute top-0 p-2 rounded-lg bg-blue-500/70 text-white max-w-48 text-center text-sm">
    レビューお願いします！
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, right:0 }"
    :enter="{ opacity: 1,  right:100, y: 100 }" class="absolute p-2 rounded-lg bg-blue-500/70  text-white text-sm max-w-48 text-center">
    エラー調査お願いします！
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-blue-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left:0 }"
    :enter="{ opacity: 1,left:100, y: 200 }"
    class="absolute p-2 rounded-lg bg-blue-500/80 text-white text-sm max-w-50">
    先にこの機能実装できる？
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-500/80"></div>
  </div>

  <div v-click v-motion :initial="{ opacity: 0, bottom: 100 }" :enter="{ opacity: 1, x:300, bottom: 0 }" class="absolute p-2 rounded-lg bg-red-500/80 text-white text-sm text-center">
    今、いいところなんだけどな...
    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-500/80"></div>
  </div>
</div>
---

<h1 class="text-center py-5">
  切り替え中に
</h1>

<div class="relative h-80">

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
    <img class="h-50" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left:150 }"
    :enter="{ opacity: 1,left:100, y: 20 }"
    class="absolute top-0 p-2 rounded-lg bg-teal-500/70 text-white max-w-48 text-center text-sm">
    変更があるから<br>
    <code>check out</code>できないな
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, right:150 }"
    :enter="{ opacity: 1,  right:100, y: 100 }" class="absolute p-2 rounded-lg bg-teal-500/70  text-white text-sm max-w-48 text-center">
    <code>git stash</code>して〜
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left:150 }"
    :enter="{ opacity: 1,left:100, y: 200 }"
    class="absolute p-2 rounded-lg bg-teal-500/80 text-white text-sm max-w-50">
    <code>check out</code>できた
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>
</div>

---
layout: center
---

# 作業して

---

<h1 class="text-center py-5">
  戻ってきたら
</h1>

<div class="relative h-80">

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
    <img class="h-50" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left: 150 }"
    :enter="{ opacity: 1, left: 100, y: 20 }"
    class="absolute top-0 p-2 rounded-lg bg-teal-500/70 text-white max-w-48 text-center text-sm">
    <code>git checkout</code>して
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, right: 150 }"
    :enter="{ opacity: 1, right: 100, y: 100 }"
    class="absolute p-2 rounded-lg bg-teal-500/70 text-white text-sm text-center">
    <code>git stash pop</code>して
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, left: 150 }"
    :enter="{ opacity: 1, left: 100, y: 200 }"
    class="absolute p-2 rounded-lg bg-teal-500/70 text-white text-sm">
    依存が変わったから<br>
    <code>npm i</code> からやりなおしだ
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>

</div>

---
layout: center
---

# 作業の切り替えコストが高くて
# 先延ばしにしがち

---
layout: center
---

# Git Worktree なら...

<div class="mt-6 text-2xl text-center">
  <span v-click>「ブランチを切り替える」</span>
  <span v-click>ではなく</span>
  <span v-click class="text-green-400 font-bold">「ディレクトリを移動する」</span>
</div>

<div v-click class="mt-6 p-4 text-center">

## stash 不要 / ビルドキャッシュ維持


## だから直ぐに元の作業に戻って来れる。
</div>




---
layout: center
---

# Git Worktree だと どう変わるのか

<div class="grid grid-cols-2 gap-8 mt-8">
<div v-click class="p-4 rounded-lg bg-gray-800">

## 通常のgit操作だと

  ```
    reps/
    ├── project_A/
    └── project_B/

  ```

- 1リポジトリ = 1作業ディレクトリ
- 作業切り替え時はgitのワーキングをなくしてブランチ切り替え時はが必要


</div>

<div v-click class="p-4 rounded-lg bg-green-900">

## Git Worktreeだと

  ```
    reps/
    └── project_A/
        ├── project_A-main/      ← メイン（main）
        ├── project_A-pr-2345/   ← PRレビュー用
        └── project_A-fix-2347/  ← バグ修正用
  ```

- 1リポジトリ = **N個の作業ディレクトリ**
- 各ディレクトリで異なるブランチを同時展開可能
- フォルダ移動だけで作業を瞬時に切り替えられる。

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
layout: center
---

## コマンドを多いし覚えるの大変ですよね

---
layout: center
---

# VSCode 拡張機能
コマンドを使わずUIから実行できます！

<logos-visual-studio-code class="inline mr-2" /> [Git Worktree Manager](https://marketplace.visualstudio.com/items?itemName=jackiotyu.git-worktree-manager)

<div v-click class="mt-6 p-3 rounded bg-green-900 text-center">

サイドバーから直感的に操作できるのでかなり楽です。

</div>

---
layout: center
---

軽くデモを行います。

---
layout: center
---

# 注意点
便利だけど知っておきたいこと

<div class="space-y-4">

<div v-click class="flex gap-4 p-4 rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-950/80 to-transparent">
  <div class="text-2xl font-mono text-red-400 opacity-60">01</div>
  <div>
    <div class="font-bold text-red-300 mb-1">同一ブランチは1箇所のみ</div>
    <div class="text-sm text-gray-300">同じブランチを複数worktreeで同時チェックアウト不可</div>
  </div>
</div>

<div v-click class="flex gap-4 p-4 rounded-lg border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-950/80 to-transparent">
  <div class="text-2xl font-mono text-yellow-400 opacity-60">02</div>
  <div>
    <div class="font-bold text-yellow-300 mb-1">サブモジュールは実験的</div>
    <div class="text-sm text-gray-300">各worktreeで別コピー → ディスク容量増、手動初期化が必要</div>
  </div>
</div>

<div v-click class="flex gap-4 p-4 rounded-lg border-l-4 border-orange-500 bg-gradient-to-r from-orange-950/80 to-transparent">
  <div class="text-2xl font-mono text-orange-400 opacity-60">03</div>
  <div>
    <div class="font-bold text-orange-300 mb-1">メインworktreeは削除不可</div>
    <div class="text-sm text-gray-300">.gitディレクトリを持つ参照元のため、移動・削除できない</div>
  </div>
</div>

<div v-click class="flex gap-4 p-4 rounded-lg border-l-4 border-purple-500 bg-gradient-to-r from-purple-950/80 to-transparent">
  <div class="text-2xl font-mono text-purple-400 opacity-60">04</div>
  <div>
    <div class="font-bold text-purple-300 mb-1">.gitignore対象はコピーされない</div>
    <div class="text-sm text-gray-300">.env等は手動コピーやシンボリックリンクで対応</div>
  </div>
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
  <div class="text-3xl">🔀</div>
  <div>stash 不要で割り込み対応がスムーズに</div>
</div>

<div v-click class="flex items-center gap-4">
  <div class="text-3xl">💻</div>
  <div>VSCode 拡張機能で簡単に操作できる</div>
</div>

</div>

<div v-click class="mt-8 text-center text-gray-400">

参考: [Git 公式ドキュメント](https://git-scm.com/docs/git-worktree) ｜ [GUIで簡単に使えるガイド](https://kurutto115.hatenablog.com/entry/2025/git-worktree)

</div>
