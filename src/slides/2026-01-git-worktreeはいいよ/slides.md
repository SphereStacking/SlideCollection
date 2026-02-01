---
theme: seriph
title: Git Worktree の使い方と活用法について
info: |
  Git Worktree の使い方と活用法について
transition: view-transition
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

<div class="h-full w-full flex items-center justify-center p-8">
  <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" class="w-full max-w-3xl">
    <Terminal title="~/repos/project" size="lg">
      <TerminalPrompt v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
           path="~/repos" command="slide --title" class="text-gray-500 text-sm mb-4" />
      <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 600 }"
           class="flex items-center gap-4 mb-6">
        <logos-git-icon class="text-5xl" />
        <div>
          <h1 class="text-5xl font-bold text-white tracking-tight">Git Worktree</h1>
          <div class="text-orange-400 text-lg mt-1">複数ブランチを<span class="underline decoration-wavy decoration-orange-400/50">同時に</span>扱える</div>
        </div>
      </div>
      <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 900 }"
           class="text-sm border-l-2 border-green-500 pl-4 py-2 bg-green-950/30">
        <span class="text-gray-400">#</span> <span class="text-green-300">stash不要</span> ・ <span class="text-green-300">ビルドキャッシュ維持</span> ・ <span class="text-green-300">瞬時に切り替え</span>
      </div>
      <TerminalPrompt v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 1200 }"
           path="~/repos" cursor class="mt-4 text-gray-500 text-sm" />
    </Terminal>
  </div>
</div>

---
hideInToc: true
---

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-2xl">
    <Terminal title="profile" size="sm">
      <div class="mb-4">
        <TerminalPrompt command="sphere --name" />
        <div class="text-white pl-4">Sphere <span class="text-gray-500">(まんまる / まる)</span></div>
      </div>
      <div class="mb-4">
        <TerminalPrompt command="sphere --info" />
        <div class="pl-4"><span class="text-cyan-400">Role:</span>      Frontend Engineer</div>
        <div class="pl-4"><span class="text-cyan-400">Favorite:</span>  <span class="text-green-400">Vue.js</span> 💚</div>
      </div>
      <div class="mb-4">
        <TerminalPrompt command="sphere --links" />
        <div class="pl-4"><span class="text-cyan-400">GitHub:</span>     <a href="https://github.com/SphereStacking" class="text-blue-400 hover:underline">github.com/SphereStacking</a></div>
        <div class="pl-4"><span class="text-cyan-400">X:</span>          <a href="https://x.com/SphereStacking" class="text-blue-400 hover:underline">x.com/SphereStacking</a></div>
        <div class="pl-4"><span class="text-cyan-400">Portfolio:</span>  <a href="https://spherestacking.com" class="text-blue-400 hover:underline">spherestacking.com</a></div>
      </div>
      <TerminalPrompt cursor />
    </Terminal>
  </div>
</div>

---
hideInToc: true
---

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-xl">
    <Terminal title="~/repos/git-worktree-demo">
      <TerminalPrompt path="~/repos" command="slide --agenda" class="text-sm text-gray-500 mb-4" />
      <div class="text-xl text-gray-400 mb-4"># 今日の流れ</div>
      <Toc maxDepth="1" class="space-y-2 text-lg" />
    </Terminal>
  </div>
</div>

---
title: はじめに
---

<div class="h-full flex items-center justify-center px-16">
  <div class="w-full max-w-3xl">
    <Terminal title="~/repos/git-worktree-demo">
      <TerminalPrompt path="~/repos" command="slide --intro" class="text-sm text-gray-500 mb-4" />
      <div class="text-xl text-gray-400 mb-6"># はじめに</div>
      <div class="space-y-4">
        <div v-click v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1 }"
             class="flex gap-3 items-start">
          <div class="text-green-400 font-bold">+</div>
          <div class="border-l-2 border-green-500 pl-4 py-1 bg-green-950/20">
            <div class="text-white">どういった場面で <span class="text-green-300">Git Worktree</span> が役に立つのか</div>
            <div class="text-xs text-gray-500 mt-1">// 今日のメイン</div>
          </div>
        </div>
        <div v-click v-motion :initial="{ x: -20, opacity: 0 }" :enter="{ x: 0, opacity: 1 }"
             class="flex gap-3 items-start opacity-60">
          <div class="text-red-400 font-bold">-</div>
          <div class="border-l-2 border-red-500/50 pl-4 py-1 line-through decoration-red-400/50">
            <div class="text-gray-400">詳しいコマンドの使い方やオプション</div>
            <div class="text-xs text-gray-600 mt-1 no-underline">// 公式ドキュメント参照</div>
          </div>
        </div>
      </div>
      <div v-click class="mt-6 text-gray-600 text-xs">
        # 詳しい使い方は公式ドキュメントや VSCode 拡張機能にお任せします
      </div>
    </Terminal>
  </div>
</div>


---
title: よくあるシーン
---

<div class="h-full flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-6 font-mono">
    <span class="text-gray-500">//</span> 開発中に
  </h1>
  <div class="relative w-full max-w-3xl h-72">
    <!-- 中心のユーザー -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img class="h-40" style="view-transition-name: developer" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
    <!-- Slack風通知 -->
    <div v-click v-motion :initial="{ opacity: 0, x: -30 }" :enter="{ opacity: 1, x: 0 }"
         class="absolute top-0 left-0 p-2 bg-white text-gray-900 text-sm rounded shadow-xl max-w-48 transform -rotate-2">
      <div class="flex items-center gap-2 mb-1">
        <div class="w-5 h-5 bg-green-500 rounded-sm flex items-center justify-center text-white text-xs font-bold">S</div>
        <span class="font-bold text-xs">Slack</span>
      </div>
      <div class="text-gray-700 text-xs">📩 レビューお願いします！</div>
    </div>
    <!-- GitHub風通知 -->
    <div v-click v-motion :initial="{ opacity: 0, x: 30 }" :enter="{ opacity: 1, x: 0 }"
         class="absolute top-8 right-0 p-2 bg-gray-900 border border-gray-700 text-sm rounded max-w-48 transform rotate-2">
      <div class="flex items-center gap-2 mb-1">
        <logos-github-icon class="w-4 h-4" />
        <span class="text-gray-400 text-xs">Issue #342</span>
      </div>
      <div class="text-red-400 text-xs">🐛 エラー調査お願いします</div>
    </div>
    <!-- 直接の依頼 -->
    <div v-click v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }"
         class="absolute bottom-12 left-0 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-full shadow-lg">
      🚀 先にこの機能実装できる？
    </div>
    <!-- 心の声 -->
    <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="absolute bottom-0 left-1/2 -translate-x-1/2 px-3 py-1.5 border-2 border-dashed border-red-400 text-red-300 text-xs bg-red-950/50">
      😅 今、いいところなんだけどな...
    </div>
  </div>
</div>
---

<div class="h-full flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-6 font-mono">
    <span class="text-gray-500">//</span> 切り替え中に
  </h1>
  <div class="relative w-full max-w-3xl h-72">
    <!-- 中心のユーザー -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img class="h-40" style="view-transition-name: developer" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
    <!-- ターミナルエラー -->
    <div v-click v-motion :initial="{ opacity: 0, y: -10 }" :enter="{ opacity: 1, y: 0 }"
         class="absolute top-0 left-0 font-mono text-xs bg-gray-950 border border-red-800 p-2 rounded max-w-56">
      <div class="text-red-400">error: Your local changes would be overwritten</div>
      <div class="text-gray-500 text-xs mt-1">Please commit or stash them.</div>
    </div>
    <!-- コマンド実行 -->
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="absolute top-16 right-0 font-mono text-sm">
      <span class="text-green-400">$</span> <span class="text-cyan-300">git stash</span>
    </div>
    <!-- 成功メッセージ -->
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="absolute bottom-4 left-0 font-mono text-xs bg-gray-950 border border-green-800 p-2 rounded">
      <div class="text-green-400">✓ Switched to branch 'feature/review'</div>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-6 font-mono">
    <span class="text-gray-500">//</span> 作業中して...
  </h1>
  <div class="relative w-full max-w-3xl h-72">
    <!-- 中心のユーザー -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img class="h-40" style="view-transition-name: developer" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col items-center justify-center">
  <h1 class="text-3xl font-bold mb-6 font-mono">
    <span class="text-gray-500">//</span> 戻ってきたら
  </h1>
  <div class="relative w-full max-w-3xl h-72">
    <!-- 中心のユーザー -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <img class="h-40" style="view-transition-name: developer" src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJWP8a9vbGKmeUKbagxvtnL6XsYxKaKeQ01Vm8uiQPdkAdpUQtSGaICZO9MY5P-uzPFhJ_i6txSb8aSjOlxNEgMTJEi8bh0QkHNv8L-96G4uERtiwIEDn7F9dj8Vie7_vCLxqOIH6Qtt0B/s800/job_programmer.png" >
    </div>
    <!-- コマンド1 -->
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="absolute top-4 left-0 font-mono text-sm">
      <span class="text-green-400">$</span> git checkout main
    </div>
    <!-- コマンド2 -->
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="absolute top-12 right-0 font-mono text-sm">
      <span class="text-green-400">$</span> git stash pop
    </div>
    <!-- npm install の悲劇 -->
    <div v-click v-motion :initial="{ opacity: 0, scale: 0.9 }" :enter="{ opacity: 1, scale: 1 }"
         class="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-xs bg-gray-950 border border-red-800 p-3 rounded max-w-xs">
      <div class="text-orange-400 mb-1">$ npm install</div>
      <div class="text-gray-500 text-xs">added 847 packages in 2m 34s</div>
      <div class="text-red-400 mt-1 text-xs">😫 依存変わってたからやり直し...</div>
    </div>
  </div>
</div>

---

<div class="h-full flex flex-col items-center justify-center">
  <div v-motion :initial="{ opacity: 0, rotate: -5 }" :enter="{ opacity: 1, rotate: 0 }"
       class="text-7xl mb-8 transform -rotate-3">😩</div>

  <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 200 }"
      class="text-4xl font-bold mb-4">
    切り替えコストが<span class="text-red-500 text-5xl font-black">高い</span>
  </h1>

  <h2 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 400 }"
      class="text-2xl text-gray-500 font-mono">
    // だから先延ばしにしがち
  </h2>
</div>

---
title: Git Worktree とは
---

<div class="h-full flex items-center justify-center px-16">
  <div class="w-full max-w-3xl">
    <Terminal title="~/repos/project">
      <TerminalPrompt path="~/repos" command="slide --solution" class="text-sm text-gray-500 mb-4" />
      <div class="text-xl text-gray-400 mb-6"># Git Worktree <span class="text-green-400">なら...</span></div>
      <div class="space-y-4">
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-3">
          <span class="text-red-400">-</span>
          <span class="text-red-400 line-through opacity-60">git checkout feature</span>
          <span class="text-gray-600 text-sm">// ブランチ切り替え</span>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-3 text-lg">
          <span class="text-green-400">+</span>
          <span class="text-green-400 font-bold">cd ../project-feature/</span>
          <span class="text-gray-600 text-sm">// ディレクトリ移動だけ</span>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
           class="mt-8 flex gap-6 text-sm">
        <div class="border-l-2 border-green-500 pl-3">
          <span class="text-green-400">✓</span> stash 不要
        </div>
        <div class="border-l-2 border-green-500 pl-3">
          <span class="text-green-400">✓</span> キャッシュ維持
        </div>
        <div class="border-l-2 border-green-500 pl-3">
          <span class="text-green-400">✓</span> 即座に復帰
        </div>
      </div>
    </Terminal>
  </div>
</div>




---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-5xl">
    <Terminal title="~/repos">
      <TerminalPrompt path="~/repos" command="diff -u 通常のgit git-worktree" class="text-sm text-gray-500 mb-4" />
      <div class="grid grid-cols-2 gap-8">
        <!-- 通常 -->
        <div v-click>
          <div class="text-sm mb-3 text-red-400">--- a/通常のgit</div>
          <div class="text-sm bg-red-950/30 p-4 border-l-2 border-red-500">
            <div class="text-gray-500">reps/</div>
            <div class="text-gray-400">├── project_A/</div>
            <div class="text-gray-400">└── project_B/</div>
          </div>
          <div class="mt-4 text-sm space-y-1">
            <div class="text-gray-500">• 1リポジトリ = 1ディレクトリ</div>
            <div class="text-red-400">• checkout時は stash 必須</div>
          </div>
        </div>
        <!-- Worktree -->
        <div v-click>
          <div class="text-sm mb-3 text-green-400">+++ b/git worktree</div>
          <div class="text-sm bg-green-950/30 p-4 border-l-2 border-green-500">
            <div class="text-gray-500">reps/</div>
            <div class="text-gray-400">└── project_A/</div>
            <div class="text-green-400 pl-6">├── main/</div>
            <div class="text-green-400 pl-6">├── pr-2345/</div>
            <div class="text-green-400 pl-6">└── fix-2347/</div>
          </div>
          <div class="mt-4 text-sm space-y-1">
            <div class="text-green-400">+ 1リポジトリ = N個のディレクトリ</div>
            <div class="text-green-400">+ 同時に複数ブランチ展開</div>
            <div class="text-green-400">+ cd だけで切り替え</div>
          </div>
        </div>
      </div>
    </Terminal>
  </div>
</div>

---
title: コマンド早見表
---

<div class="flex items-center justify-center h-full">
  <div class="w-full max-w-4xl">
    <Terminal title="~/repos" size="sm">
      <TerminalPrompt path="~/repos" command="man git-worktree" class="mb-3" />
      <div class="text-yellow-400 mb-3">GIT-WORKTREE(1)</div>
      <div class="space-y-2 text-gray-300">
        <div class="flex"><span class="text-cyan-400 w-72">git worktree add &lt;path&gt;</span><span class="text-gray-500">新しい worktree を作成</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree add -b &lt;branch&gt; &lt;path&gt;</span><span class="text-gray-500">新規ブランチで作成</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree list</span><span class="text-gray-500">一覧を表示</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree remove &lt;path&gt;</span><span class="text-gray-500">削除</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree prune</span><span class="text-gray-500">孤立した情報をクリーンアップ</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree lock/unlock</span><span class="text-gray-500">保護 / 解除</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree move</span><span class="text-gray-500">移動</span></div>
        <div class="flex"><span class="text-cyan-400 w-72">git worktree repair</span><span class="text-gray-500">リンク修復</span></div>
      </div>
      <div class="mt-4 text-gray-600 text-xs">Press q to quit, h for help</div>
    </Terminal>
  </div>
</div>

---

<div class="h-full flex items-center justify-center">
  <div class="relative">
    <!-- 散らばるコマンドたち -->
    <div class="absolute -top-16 -left-20 text-sm font-mono text-gray-600 rotate-[-8deg]">git worktree add</div>
    <div class="absolute -top-8 right-0 text-xs font-mono text-gray-700 rotate-[5deg]">git worktree prune</div>
    <div class="absolute top-4 -left-32 text-xs font-mono text-gray-700 rotate-[-3deg]">git worktree list</div>
    <div class="absolute bottom-12 -right-24 text-sm font-mono text-gray-600 rotate-[12deg]">git worktree remove</div>
    <div class="absolute -bottom-8 left-0 text-xs font-mono text-gray-700 rotate-[-6deg]">git worktree lock</div>
    <!-- メインテキスト -->
    <div class="text-center relative z-10">
      <div class="text-6xl mb-6 transform rotate-12">😵‍💫</div>
      <h2 class="text-3xl font-bold">
        <span class="text-gray-400">コマンド</span><span class="text-yellow-400 text-4xl font-black">多すぎ</span><span class="text-gray-400">...覚えられない</span>
      </h2>
    </div>
  </div>
</div>

---
title: VSCode 拡張機能
---

<div class="h-full flex items-center px-16">
  <div class="flex gap-12 items-center">
    <!-- 左: VSCodeアイコン -->
    <div v-motion :initial="{ opacity: 0, x: -30 }" :enter="{ opacity: 1, x: 0 }">
      <logos-visual-studio-code class="text-8xl" />
    </div>
    <!-- 右: 説明 -->
    <div class="flex-1">
      <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 200 }"
          class="text-4xl font-bold mb-4">
        <span class="text-blue-400">Git Worktree Manager</span>
      </h1>
      <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 400 }"
         class="text-xl text-gray-400 mb-6">コマンド不要。UIでぽちぽち操作</p>
      <a v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0, delay: 600 }"
         href="https://marketplace.visualstudio.com/items?itemName=jackiotyu.git-worktree-manager"
         class="inline-flex items-center gap-3 px-5 py-2.5 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 transition font-mono text-sm">
        <span>marketplace.visualstudio.com</span>
        <span class="text-gray-500">→</span>
      </a>
      <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
           class="mt-6 font-mono text-sm">
        <span class="text-gray-500">//</span> <span class="text-green-400">サイドバーから直感的に操作できる</span>
      </div>
    </div>
  </div>
</div>

---
title: Demo
---

<div class="h-full flex items-center justify-center">
  <div class="text-center">
    <div v-motion :initial="{ scale: 0 }" :enter="{ scale: 1 }"
         class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
      <span class="text-6xl">▶</span>
    </div>
    <h1 v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
        class="text-5xl font-black tracking-tight mb-2">DEMO</h1>
    <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
       class="font-mono text-gray-500">// 実際に動かしてみる</p>
  </div>
</div>

---
title: 注意点
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <Terminal title="~/repos/git-worktree-demo">
      <TerminalPrompt path="~/repos" command="slide --caution" class="text-sm text-gray-500 mb-4" />
      <div class="text-xl text-yellow-400 mb-6"># ⚠ 注意点 <span class="text-gray-500 text-sm">// 便利だけど知っておきたい</span></div>
      <div class="grid grid-cols-2 gap-3">
        <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
             class="p-3 border-l-2 border-red-500 bg-red-950/30">
          <div class="text-xs text-red-400 mb-1">// IMPORTANT</div>
          <div class="font-bold text-red-200 text-sm mb-1">同一ブランチは1箇所のみ</div>
          <div class="text-xs text-gray-500">複数worktreeで同時チェックアウト不可</div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, delay: 100 }"
             class="p-3 border-l-2 border-yellow-500 bg-yellow-950/30">
          <div class="text-xs text-yellow-400 mb-1">// EXPERIMENTAL</div>
          <div class="font-bold text-yellow-200 text-sm mb-1">サブモジュールは実験的</div>
          <div class="text-xs text-gray-500">手動初期化が必要</div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, delay: 200 }"
             class="p-3 border-l-2 border-orange-500 bg-orange-950/30">
          <div class="text-xs text-orange-400 mb-1">// READONLY</div>
          <div class="font-bold text-orange-200 text-sm mb-1">メインworktreeは削除不可</div>
          <div class="text-xs text-gray-500">.gitディレクトリの参照元</div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0, delay: 300 }"
             class="p-3 border-l-2 border-purple-500 bg-purple-950/30">
          <div class="text-xs text-purple-400 mb-1">// MANUAL</div>
          <div class="font-bold text-purple-200 text-sm mb-1">.gitignore対象はコピーされない</div>
          <div class="text-xs text-gray-500">.env等は手動で対応</div>
        </div>
      </div>
    </Terminal>
  </div>
</div>

---
title: まとめ
---

<div class="h-full flex items-center justify-center px-16">
  <div class="w-full max-w-4xl">
    <Terminal title="~/repos/git-worktree-demo">
      <TerminalPrompt path="~/repos" command="slide --summary" class="text-sm text-gray-500 mb-4" />
      <div class="text-xl text-gray-400 mb-6"># まとめ</div>
      <div class="flex gap-6">
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex-1 border-l-2 border-green-500 pl-4 py-2">
          <div class="text-green-400 text-xs mb-1">// CONCEPT</div>
          <div class="text-lg font-bold text-white mb-1">1リポジトリ = N作業場</div>
          <div class="text-gray-500 text-sm">ブランチごとにディレクトリを分ける</div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 200 }"
             class="flex-1 border-l-2 border-cyan-500 pl-4 py-2">
          <div class="text-cyan-400 text-xs mb-1">// BENEFIT</div>
          <div class="text-lg font-bold text-white mb-1">stash要らずで即切替</div>
          <div class="text-gray-500 text-sm">割り込み作業もストレスフリー</div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 400 }"
             class="flex-1 border-l-2 border-blue-500 pl-4 py-2">
          <div class="text-blue-400 text-xs mb-1">// TOOL</div>
          <div class="text-lg font-bold text-white mb-1">VSCode拡張で楽々</div>
          <div class="text-gray-500 text-sm">Git Worktree Manager</div>
        </div>
      </div>
      <div v-click class="mt-6 text-xs text-gray-600">
        <span class="text-gray-500">// See also:</span>
        <a href="https://git-scm.com/docs/git-worktree" class="text-green-500 hover:underline ml-2">git-scm.com/docs/git-worktree</a>
      </div>
    </Terminal>
  </div>
</div>

---
layout: center
---

# END
