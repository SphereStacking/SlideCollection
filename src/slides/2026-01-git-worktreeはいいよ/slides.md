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

<div class="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">

  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
    <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
    <div class="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
  </div>

  <!-- メインコンテンツ -->
  <div class="relative z-10 text-center">
    <div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"
         class="font-mono text-sm text-green-400 mb-4 tracking-widest">
      $ git worktree
    </div>
    <h1 v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, delay: 200 }"
        class="text-7xl font-bold mb-6">
      <logos-git-icon class="inline-block mr-4" />
      <span class="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        Git Worktree
      </span>
    </h1>
    <p v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 400 }"
       class="text-2xl text-gray-400">
      複数ブランチを同時に扱い、<span class="text-green-400">DX</span>を向上できる
    </p>
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

<div class="text-center">
  <h1 class="text-4xl font-bold mb-8">はじめに</h1>
  <div class="space-y-6 max-w-2xl mx-auto">
    <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-green-900/30 border border-green-500/30">
      <div class="text-3xl">🎯</div>
      <div class="text-left">
        <div class="font-bold text-green-300">今日話すこと</div>
        <div class="text-gray-300">どういった場面で <code class="text-green-400">Git Worktree</code> が役に立つのか</div>
      </div>
    </div>
    <div v-click class="flex items-center gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-600/30">
      <div class="text-3xl">📖</div>
      <div class="text-left">
        <div class="font-bold text-gray-300">話さないこと</div>
        <div class="text-gray-400">詳しいコマンドの使い方やオプション</div>
      </div>
    </div>
  </div>

  <p v-click class="mt-8 text-gray-500 text-sm">
    詳しい使い方は公式ドキュメントや VSCode 拡張機能にお任せします 🙏
  </p>
</div>


---

<h1 class="text-center text-3xl font-bold mb-4">開発中に</h1>

<div class="relative h-80">

  <!-- 背景のグラデーション -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent rounded-xl"></div>

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="relative">
      <div class="absolute -inset-4 bg-blue-500/10 rounded-full blur-xl"></div>
      <img class="h-44 relative" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-4 left-16 p-3 rounded-xl bg-blue-500/80 backdrop-blur text-white max-w-48 text-sm shadow-lg shadow-blue-500/20">
    <div class="font-bold mb-1">📩 レビューお願いします！</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-blue-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: 50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-16 right-16 p-3 rounded-xl bg-blue-500/80 backdrop-blur text-white text-sm max-w-48 shadow-lg shadow-blue-500/20">
    <div class="font-bold mb-1">🐛 エラー調査お願いします！</div>
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-blue-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute bottom-16 left-16 p-3 rounded-xl bg-blue-500/80 backdrop-blur text-white text-sm max-w-52 shadow-lg shadow-blue-500/20">
    <div class="font-bold">🚀 先にこの機能実装できる？</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-blue-500/80"></div>
  </div>

  <div v-click v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }"
       class="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-xl bg-red-500/90 backdrop-blur text-white text-sm shadow-lg shadow-red-500/30">
    <div class="font-bold">😅 今、いいところなんだけどな...</div>
    <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-red-500/90"></div>
  </div>
</div>
---

<h1 class="text-center text-3xl font-bold mb-4">切り替え中に</h1>

<div class="relative h-80">

  <!-- 背景のグラデーション -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/20 to-transparent rounded-xl"></div>

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="relative">
      <div class="absolute -inset-4 bg-teal-500/10 rounded-full blur-xl"></div>
      <img class="h-44 relative" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-4 left-16 p-3 rounded-xl bg-teal-500/80 backdrop-blur text-white max-w-52 text-sm shadow-lg shadow-teal-500/20">
    <div class="font-bold">🚫 変更があるから <code class="bg-black/30 px-1 rounded">checkout</code> できないな</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: 50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-20 right-16 p-3 rounded-xl bg-teal-500/80 backdrop-blur text-white text-sm max-w-48 shadow-lg shadow-teal-500/20">
    <div class="font-bold">📦 <code class="bg-black/30 px-1 rounded">git stash</code> して〜</div>
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-teal-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute bottom-12 left-16 p-3 rounded-xl bg-teal-500/80 backdrop-blur text-white text-sm max-w-48 shadow-lg shadow-teal-500/20">
    <div class="font-bold">✅ <code class="bg-black/30 px-1 rounded">checkout</code> できた</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-teal-500/80"></div>
  </div>
</div>

---
layout: center
---

<div class="text-center">
  <div v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }"
       class="text-8xl mb-6">⌨️</div>
  <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
      class="text-4xl font-bold text-gray-300">作業して...</h1>
  <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 600 }"
       class="mt-4 font-mono text-green-400 text-sm">
  </div>
</div>

---

<h1 class="text-center text-3xl font-bold mb-4">戻ってきたら</h1>

<div class="relative h-80">

  <!-- 背景のグラデーション -->
  <div class="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/20 to-transparent rounded-xl"></div>

  <!-- 中心のユーザー -->
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="relative">
      <div class="absolute -inset-4 bg-orange-500/10 rounded-full blur-xl"></div>
      <img class="h-44 relative" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-4 left-16 p-3 rounded-xl bg-orange-500/80 backdrop-blur text-white max-w-48 text-sm shadow-lg shadow-orange-500/20">
    <div class="font-bold">🔄 <code class="bg-black/30 px-1 rounded">git checkout</code> して</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-orange-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: 50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute top-20 right-16 p-3 rounded-xl bg-orange-500/80 backdrop-blur text-white text-sm max-w-48 shadow-lg shadow-orange-500/20">
    <div class="font-bold">📤 <code class="bg-black/30 px-1 rounded">git stash pop</code> して</div>
    <div class="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-orange-500/80"></div>
  </div>

  <div
    v-click
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="absolute bottom-12 left-16 p-3 rounded-xl bg-red-500/80 backdrop-blur text-white text-sm max-w-56 shadow-lg shadow-red-500/20">
    <div class="font-bold">😫 依存が変わったから <code class="bg-black/30 px-1 rounded">npm i</code> からやりなおしだ</div>
    <div class="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-transparent border-l-red-500/80"></div>
  </div>

</div>

---
layout: center
---

<div class="text-center">
  <div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"
       class="text-6xl mb-8">😩</div>

  <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 200 }"
      class="text-3xl font-bold mb-4">
    作業の切り替えコストが<span class="text-red-400">高くて</span>
  </h1>

  <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 400 }"
      class="text-3xl font-bold text-gray-400">
    先延ばしにしがち
  </h2>
</div>

---
layout: center
class: "bg-gradient-to-br from-gray-900 via-gray-900 to-green-950"
---

<div class="h-full w-full flex flex-col items-center justify-center">
  <div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"
       class="font-mono text-sm text-green-400 mb-4 tracking-widest">
    $ git worktree add
  </div>

  <h1 v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, delay: 100 }"
      class="text-5xl font-bold mb-12">
    <logos-git-icon class="inline-block mr-3" />
    <span class="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">Git Worktree</span>
    <span class="text-white"> なら...</span>
  </h1>

  <div class="flex items-center gap-4 text-2xl">
    <span v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
          class="px-4 py-2 rounded-lg bg-gray-700/50 backdrop-blur">「ブランチを切り替える」</span>
    <span v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
          class="text-gray-400">ではなく</span>
    <span v-click v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }"
          class="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/50 text-green-400 font-bold">
      「ディレクトリを移動する」
    </span>
  </div>

  <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
       class="mt-12 flex gap-6">
    <div class="px-6 py-3 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 shadow-lg">
      <div class="text-green-400 font-bold text-lg">✓ stash 不要</div>
    </div>
    <div class="px-6 py-3 rounded-xl bg-gray-800/50 backdrop-blur border border-gray-700/50 shadow-lg">
      <div class="text-green-400 font-bold text-lg">✓ ビルドキャッシュ維持</div>
    </div>
  </div>

  <p v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
     class="mt-8 text-xl text-gray-400">
    だから<span class="text-white font-bold">直ぐに</span>元の作業に戻って来れる
  </p>
</div>




---
layout: center
---

<div class="h-full w-full flex flex-col items-center justify-center px-8">
  <h1 v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"
      class="text-4xl font-bold mb-10">
    <logos-git-icon class="inline-block mr-3" />
    Git Worktree だと<span class="text-green-400">どう変わるのか</span>
  </h1>

  <div class="grid grid-cols-2 gap-8 w-full max-w-5xl">
    <div v-click v-motion :initial="{ opacity: 0, x: -30 }" :enter="{ opacity: 1, x: 0 }"
         class="p-6 rounded-2xl bg-gray-800/50 backdrop-blur border border-gray-700/50 shadow-xl">
      <h2 class="text-xl font-bold text-gray-300 mb-4 flex items-center gap-2">
        <span class="text-2xl">📁</span> 通常のgit操作だと
      </h2>
      <div class="font-mono text-sm bg-black/30 rounded-lg p-4 mb-4 border border-gray-700/30">
        <div class="text-gray-400">reps/</div>
        <div class="text-gray-400">├── <span class="text-blue-400">project_A/</span></div>
        <div class="text-gray-400">└── <span class="text-blue-400">project_B/</span></div>
      </div>
      <ul class="space-y-2 text-gray-300">
        <li class="flex items-start gap-2">
          <span class="text-gray-500">•</span>
          <span>1リポジトリ = <span class="text-gray-400">1作業ディレクトリ</span></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-red-400">✗</span>
          <span>ブランチ切り替え時は <code class="bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded text-sm">stash</code> が必要</span>
        </li>
      </ul>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: 30 }" :enter="{ opacity: 1, x: 0 }"
         class="p-6 rounded-2xl bg-green-900/30 backdrop-blur border border-green-500/30 shadow-xl shadow-green-500/10">
      <h2 class="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
        <span class="text-2xl">🌳</span> Git Worktreeだと
      </h2>
      <div class="font-mono text-sm bg-black/30 rounded-lg p-4 mb-4 border border-green-700/30">
        <div class="text-gray-400">reps/</div>
        <div class="text-gray-400">└── <span class="text-blue-400">project_A/</span></div>
        <div class="text-green-400 pl-6">├── project_A-main/ <span class="text-gray-500">← メイン</span></div>
        <div class="text-green-400 pl-6">├── project_A-pr-2345/ <span class="text-gray-500">← PRレビュー</span></div>
        <div class="text-green-400 pl-6">└── project_A-fix-2347/ <span class="text-gray-500">← バグ修正</span></div>
      </div>
      <ul class="space-y-2 text-gray-300">
        <li class="flex items-start gap-2">
          <span class="text-green-400">✓</span>
          <span>1リポジトリ = <span class="text-green-400 font-bold">N個の作業ディレクトリ</span></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-400">✓</span>
          <span>異なるブランチを<span class="text-green-400">同時展開可能</span></span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-green-400">✓</span>
          <span>フォルダ移動だけで<span class="text-green-400">瞬時に切り替え</span></span>
        </li>
      </ul>
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
layout: center
---

<div class="text-center">
  <div class="text-5xl mb-6">🤯</div>
  <h2 class="text-2xl text-gray-300">コマンド<span class="text-yellow-400">も多いし</span>覚えるの大変ですよね</h2>
</div>

---
layout: center
---

<div class="text-center">
  <div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }"
       class="mb-6">
    <logos-visual-studio-code class="text-6xl" />
  </div>

  <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 200 }"
      class="text-3xl font-bold mb-2">VSCode 拡張機能</h1>

  <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 400 }"
     class="text-gray-400 mb-6">コマンドを使わずUIから実行できます！</p>

  <a v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1, delay: 600 }"
     href="https://marketplace.visualstudio.com/items?itemName=jackiotyu.git-worktree-manager"
     class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-bold">
    <logos-visual-studio-code /> Git Worktree Manager
  </a>

  <div v-click class="mt-8 p-4 rounded-lg bg-green-900/50 border border-green-500/30 max-w-md mx-auto">
    <p class="text-green-300">💡 サイドバーから直感的に操作できるのでかなり楽です</p>
  </div>
</div>

---
layout: center
---

<div class="text-center">
  <div v-motion :initial="{ opacity: 0, rotate: -10 }" :enter="{ opacity: 1, rotate: 0 }"
       class="text-7xl mb-6">🎬</div>
  <h1 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 300 }"
      class="text-4xl font-bold mb-4">Demo</h1>
  <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
     class="text-gray-400">軽くデモを行います</p>
</div>

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

<div class="text-center mb-8">
  <h1 class="text-4xl font-bold">まとめ</h1>
</div>

<div class="grid grid-cols-3 gap-6 max-w-4xl mx-auto">

<div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
     class="p-6 rounded-xl bg-gradient-to-br from-green-900/50 to-green-950/30 border border-green-500/20 text-center">
  <div class="text-4xl mb-4">🌳</div>
  <div class="font-bold text-green-300 mb-2">Git Worktree</div>
  <div class="text-sm text-gray-400">1リポジトリで<br>複数作業ディレクトリ</div>
</div>

<div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 200 }"
     class="p-6 rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-950/30 border border-blue-500/20 text-center">
  <div class="text-4xl mb-4">🔀</div>
  <div class="font-bold text-blue-300 mb-2">スムーズな切り替え</div>
  <div class="text-sm text-gray-400">stash 不要で<br>割り込み対応</div>
</div>

<div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 400 }"
     class="p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-purple-950/30 border border-purple-500/20 text-center">
  <div class="text-4xl mb-4">💻</div>
  <div class="font-bold text-purple-300 mb-2">VSCode 拡張</div>
  <div class="text-sm text-gray-400">GUIで<br>簡単に操作</div>
</div>

</div>

<div v-click class="mt-10 text-center text-sm text-gray-500">
  参考: <a href="https://git-scm.com/docs/git-worktree" class="text-green-400 hover:underline">Git 公式ドキュメント</a>
</div>
