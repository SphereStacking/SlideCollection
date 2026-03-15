---
theme: seriph
favicon: /logo.svg
title: "Temporal — ライブラリ不要の 新しい日付処理 API"
info: |
  ES2026 標準化 — ライブラリ不要の日付処理へ
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
  slug: temporal-api
  date: '2026-03'
  description: "Temporal — ライブラリ不要の 新しい日付処理 API"
  icon: "logos:javascript"
  published: true
  tags:
    - javascript
    - temporal
    - tc39
    - es2026
seoMeta:
  ogImage: ./og-image.png
---

<div class="h-full w-full flex items-center justify-center p-8">
  <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" class="text-center">
    <div class="flex items-center justify-center gap-4 mb-4">
      <logos-javascript class="text-6xl" />
      <div class="text-7xl font-black tracking-tight text-white">Temporal</div>
    </div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
         class="text-2xl font-bold text-gray-400 mb-4">ライブラリ不要の 新しい日付処理 API</div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
         class="flex items-center justify-center gap-3 mb-3">
      <span class="px-3 py-1 bg-green-500/20 border border-green-500 text-green-400 text-sm font-mono">Stage 4</span>
      <span class="px-3 py-1 bg-blue-500/20 border border-blue-500 text-blue-400 text-sm font-mono">ES2026</span>
      <span class="px-3 py-1 bg-purple-500/20 border border-purple-500 text-purple-400 text-sm font-mono">2026.03.11</span>
    </div>
  </div>
</div>

<!--
- 今日は JavaScript の日付処理が大きく変わるニュースを持ってきました
- Temporal API が今月 Stage 4 に到達して、ES2026 の正式仕様になりました
- まずは、なぜこれが必要だったのか、Date の問題から見ていきましょう
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-2xl bg-gray-900/50 border border-gray-700 rounded-lg p-6">
    <div class="text-gray-500 text-xs font-mono mb-4">$ whoami</div>
    <div class="mb-4">
      <div class="text-white text-xl font-bold">Sphere <span class="text-gray-500 text-sm">(まんまる / まる)</span></div>
    </div>
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span class="text-cyan-400">Role:</span>
        <span class="text-gray-300 ml-2">Frontend Engineer</span>
      </div>
      <div>
        <span class="text-cyan-400">Favorite:</span>
        <span class="text-green-400 ml-2">Vue.js 💚</span>
      </div>
      <div>
        <span class="text-cyan-400">GitHub:</span>
        <a href="https://github.com/SphereStacking" class="text-blue-400 hover:underline ml-2">SphereStacking</a>
      </div>
      <div>
        <span class="text-cyan-400">X:</span>
        <a href="https://x.com/SphereStacking" class="text-blue-400 hover:underline ml-2">@SphereStacking</a>
      </div>
    </div>
  </div>
</div>

<!--
- Sphere です、フロントエンドエンジニアをやっています
- 今日は Temporal API について5分でお話しします
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center">
  <div class="w-full max-w-xl">
    <div class="text-gray-500 font-mono text-sm mb-6"># 今日の流れ</div>
    <Toc maxDepth="1" class="space-y-3 text-lg" />
  </div>
</div>

<!--
- まず Date の何が問題なのかを3つに分けて紹介します
- そのあと Temporal がどう解決するかをお見せします
-->

---
title: Date の闇 ① ミュータビリティ
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Date の<span class="text-red-400">闇</span> ①
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-6">破壊的変更 — 触れたら壊れる</div>
    <div class="grid grid-cols-2 gap-6">
      <!-- 問題のコード -->
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-xs text-red-400 font-mono mb-2">// やりがちなコード</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-4 font-mono text-sm leading-relaxed">
          <div><span class="text-purple-400">const</span> <span class="text-cyan-300">original</span> = <span class="text-yellow-300">new</span> Date(<span class="text-yellow-300">"2026-03-15"</span>)</div>
          <div class="mt-2"><span class="text-gray-600">// コピーして変更したい</span></div>
          <div><span class="text-purple-400">const</span> <span class="text-cyan-300">copy</span> = original</div>
          <div>copy.<span class="text-red-400">setDate</span>(copy.getDate() - 1)</div>
          <div class="mt-2">console.log(original)</div>
          <div class="text-red-400">// → 3月14日 💥 original も変わった！</div>
          <div class="text-gray-600">// copy と original は同じオブジェクト</div>
        </div>
      </div>
      <!-- なぜ起きるか -->
      <div v-click v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-xs text-red-400 font-mono mb-2">// 関数に渡しても壊れる</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-4 font-mono text-sm leading-relaxed">
          <div><span class="text-purple-400">function</span> <span class="text-yellow-300">formatForAPI</span>(date) {</div>
          <div class="pl-4">date.<span class="text-red-400">setHours</span>(0, 0, 0, 0)</div>
          <div class="pl-4"><span class="text-purple-400">return</span> date.toISOString()</div>
          <div>}</div>
          <div class="mt-2"><span class="text-purple-400">const</span> <span class="text-cyan-300">now</span> = <span class="text-yellow-300">new</span> Date()</div>
          <div>formatForAPI(now)</div>
          <div class="text-red-400">// now の時刻が 00:00:00 に！💥</div>
          <div class="text-gray-600">// 呼び出し元の変数が壊れる</div>
        </div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-6 p-3 border border-red-800/30 bg-red-950/20 rounded text-center">
      <span class="text-red-400 font-bold">Date はミュータブル</span>
      <span class="text-gray-500"> — set系メソッドが元のオブジェクトを直接書き換える</span>
    </div>
  </div>
</div>

<!--
- Date 最大の問題はミュータブルなことです
- 左の例：コピーしたつもりが同じ参照なので original まで変わってしまう
- 右の例：ユーティリティ関数に渡しただけで呼び出し元が壊れる
- コードレビューでも見落としやすく、実際にバグとして踏んだ方も多いはず
- Date の set 系メソッドは全部これです。setHours, setMonth, setFullYear...
-->

---
title: Date の闇 ② 罠だらけの API
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Date の<span class="text-red-400">闇</span> ②
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-4">罠だらけの API — 直感に反する仕様</div>
    <div class="grid grid-cols-2 gap-4">
      <!-- 月0始まり -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// 月が0始まり（Javaから継承）</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-xs leading-relaxed">
          <div><span class="text-yellow-300">new</span> Date(2026, <span class="text-red-400">3</span>, 15) <span class="text-red-400">// → 4月 😱</span></div>
          <div><span class="text-yellow-300">new</span> Date(2026, <span class="text-green-400">2</span>, 15) <span class="text-gray-600">// → 3月 🤯</span></div>
          <div class="text-gray-600 mt-1">// 日は1始まり、月だけ0始まり...なぜ？</div>
        </div>
      </div>
      <!-- 不正な日付がエラーにならない -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// 不正な日付がエラーにならない</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-xs leading-relaxed">
          <div><span class="text-yellow-300">new</span> Date(2026, 1, 30) <span class="text-gray-600">// 2月30日</span></div>
          <div class="text-red-400">// → 3月2日 💥 静かに別の日になる</div>
          <div class="mt-1"><span class="text-yellow-300">new</span> Date(2026, 0, 31).<span class="text-red-400">setMonth</span>(1)</div>
          <div class="text-red-400">// → 3月3日 💥 こちらも静かにずれる</div>
        </div>
      </div>
      <!-- getYear の罠 -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// 似た名前で全く違う結果</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-xs leading-relaxed">
          <div><span class="text-yellow-300">new</span> Date().<span class="text-red-400">getYear</span>()</div>
          <div class="text-red-400">// → 126 😱 （1900年からの差分）</div>
          <div class="mt-1"><span class="text-yellow-300">new</span> Date().<span class="text-green-400">getFullYear</span>()</div>
          <div class="text-gray-600">// → 2026 （こっちが正しい）</div>
        </div>
      </div>
      <!-- toString -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// 出力が実装依存</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-xs leading-relaxed">
          <div><span class="text-yellow-300">new</span> Date().toString()</div>
          <div class="text-gray-500">// "Sun Mar 15 2026 14:30:00</div>
          <div class="text-gray-500">//  GMT+0900 (日本標準時)"</div>
          <div class="text-gray-600">// ロケール依存、フォーマット指定不可</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- 次は API 設計の罠です。全部初見では気づけないものばかり
- 月が0始まり：これは Java の Calendar から受け継いだ1995年の負の遺産
  - Brendan Eich が10日で作った JavaScript の名残
- 不正な日付：2月30日を渡してもエラーにならず3月2日になる。setMonth も同じ
  - エラーも出ないのが厄介、バグの原因になりやすい
- getYear：1900年からの差分を返す謎メソッド。getFullYear と間違えやすい
- toString：機械可読でもなく、フォーマット指定もできない
-->

---
title: Date の闇 ③ タイムゾーン
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Date の<span class="text-red-400">闇</span> ③
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-4">タイムゾーン — 最大の地雷原</div>
    <div class="space-y-3">
      <!-- 内部表現の説明 -->
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// Date の内部表現 — 全てが UTC ミリ秒</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-sm">
          <div><span class="text-yellow-300">new</span> Date(<span class="text-yellow-300">"2026-03-15"</span>)</div>
          <div class="text-gray-600 mt-1">// 内部値: <span class="text-orange-400">1742169600000</span>（1970-01-01 UTC からのミリ秒）</div>
          <div class="text-gray-600">// 実体: <span class="text-cyan-300">2026-03-15T00:00:00.000Z</span>（UTC の深夜0時）</div>
          <div class="text-red-400 mt-1">// → 「3月15日」という日付だけを持つことは不可能</div>
        </div>
      </div>
      <!-- 環境依存の結果 -->
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-xs text-red-400 font-mono mb-1">// getDate() の結果が環境で変わる</div>
        <div class="bg-gray-900 border border-red-800/50 rounded p-3 font-mono text-sm">
          <div><span class="text-yellow-300">new</span> Date(<span class="text-yellow-300">"2026-03-15"</span>).getDate()</div>
          <div class="text-gray-600 mt-1">// UTC 0時 → ローカル時刻に変換して日付を返す</div>
          <div class="text-red-400">// → UTC+9（日本）: 3/15 09:00 JST → <span class="text-white font-bold">15</span></div>
          <div class="text-red-400">// → UTC-5（NY）: 3/14 19:00 EST → <span class="text-white font-bold">14</span> 💥 前日！</div>
        </div>
      </div>
      <!-- まとめカード -->
      <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
           class="grid grid-cols-2 gap-3">
        <div class="p-3 border border-red-800/30 bg-red-950/20 rounded text-center">
          <div class="text-red-400 text-sm font-bold mb-1">Date = 必ず UTC ミリ秒</div>
          <div class="text-xs text-gray-500">「日付だけ」は存在できない</div>
          <div class="text-xs text-gray-600 mt-1">誕生日すら時刻+TZ情報を持つ</div>
        </div>
        <div class="p-3 border border-red-800/30 bg-red-950/20 rounded text-center">
          <div class="text-red-400 text-sm font-bold mb-1">TZ 指定が UTC かローカルだけ</div>
          <div class="text-xs text-gray-500">"America/New_York" のような指定不可</div>
          <div class="text-xs text-gray-600 mt-1">国際対応では致命的</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- Date の内部は「1970年1月1日 UTC からのミリ秒」という単一の数値
  - "2026-03-15" と書いても、実際は「UTC の3月15日 深夜0時ちょうど」という瞬間を指す
  - つまり「3月15日」という日付だけを保持することは構造的に不可能
- この UTC 基準の値を getDate() でローカル時刻に変換するので、結果が環境で変わる
  - 日本（UTC+9）では UTC 0時 → JST 9時だから同じ15日
  - ニューヨーク（UTC-5）では UTC 0時 → EST 前日19時だから14日になる
- これが「Date にはタイムゾーンなしの日付がない」ということの本質
  - Temporal の PlainDate がこれを解決する（後で紹介）
-->

---
title: なぜライブラリが必要だったのか
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> だからライブラリに<span class="text-orange-400">頼ってきた</span>
    </h1>
    <div class="space-y-4">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="text-2xl w-12 text-center font-bold text-yellow-400">M</div>
        <div class="flex-1">
          <div class="font-bold text-white">Moment.js</div>
          <div class="text-xs text-gray-500">4.15MB / 週 25.8M DL</div>
        </div>
        <div class="text-red-400 text-xs font-mono px-2 py-1 bg-red-950/50 rounded">deprecated</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="text-2xl w-12 text-center font-bold text-purple-400">fn</div>
        <div class="flex-1">
          <div class="font-bold text-white">date-fns</div>
          <div class="text-xs text-gray-500">週 39.6M DL</div>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="text-2xl w-12 text-center font-bold text-cyan-400">L</div>
        <div class="flex-1">
          <div class="font-bold text-white">Luxon</div>
          <div class="text-xs text-gray-500">週 18.9M DL</div>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="text-2xl w-12 text-center font-bold text-green-400">D</div>
        <div class="flex-1">
          <div class="font-bold text-white">Day.js</div>
          <div class="text-xs text-gray-500">2KB / 週 21.5M DL</div>
        </div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-6 text-center">
      <div class="text-gray-500 text-sm mb-2">合計 週間ダウンロード数</div>
      <div class="text-4xl font-black text-orange-400">1億回<span class="text-gray-500 text-xl">超</span></div>
      <div class="text-gray-600 text-xs mt-2">State of JS: 日付処理は開発者の不満 第2位</div>
    </div>
  </div>
</div>

<!--
- こういった問題があるから、みんなライブラリに頼ってきました
- Moment.js は deprecated になったけどまだ週2500万DL
- Day.js は2KBと軽量で人気
- 合計すると週1億回以上ダウンロードされている
- State of JS の調査でも、日付処理は静的型付けに次ぐ第2位の不満
- これだけ多くの人が困っている → 標準APIで解決すべき問題
-->

---
title: Temporal の登場
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> <span class="text-green-400">Temporal</span> の歩み <span class="text-gray-500 text-lg">— 9年の旅路</span>
    </h1>
    <div class="relative">
      <!-- タイムライン軸 -->
      <div class="absolute left-6 top-0 bottom-0 w-px bg-gray-700"></div>
      <div class="space-y-4">
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-4 pl-0">
          <div class="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xs font-mono text-gray-400 z-10">2017</div>
          <div class="flex-1 p-3 bg-gray-900/50 border border-gray-700 rounded">
            <div class="font-bold text-white text-sm">Stage 1 — 提案</div>
            <div class="text-xs text-gray-500">Maggie Johnson-Pint (Moment.js メンテナー) が TC39 に提案</div>
          </div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-4 pl-0">
          <div class="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center text-xs font-mono text-gray-400 z-10">2018</div>
          <div class="flex-1 p-3 bg-gray-900/50 border border-gray-700 rounded">
            <div class="font-bold text-white text-sm">Stage 2 — ドラフト</div>
            <div class="text-xs text-gray-500">API 設計の議論が本格化。型の分離方針が固まる</div>
          </div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-4 pl-0">
          <div class="w-12 h-12 rounded-full bg-gray-800 border-2 border-blue-600 flex items-center justify-center text-xs font-mono text-blue-400 z-10">2021</div>
          <div class="flex-1 p-3 bg-gray-900/50 border border-gray-700 rounded">
            <div class="font-bold text-white text-sm">Stage 3 — 仕様確定</div>
            <div class="text-xs text-gray-500">ブラウザ実装開始。4,500件超の test262 テスト</div>
          </div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-4 pl-0">
          <div class="w-12 h-12 rounded-full bg-gray-800 border-2 border-orange-500 flex items-center justify-center text-xs font-mono text-orange-400 z-10">2025</div>
          <div class="flex-1 p-3 bg-gray-900/50 border border-gray-700 rounded">
            <div class="font-bold text-white text-sm">Firefox 139 が初出荷</div>
            <div class="text-xs text-gray-500">初めてブラウザにネイティブ搭載</div>
          </div>
        </div>
        <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
             class="flex items-center gap-4 pl-0">
          <div class="w-12 h-12 rounded-full bg-green-900 border-2 border-green-400 flex items-center justify-center text-xs font-mono text-green-400 z-10 font-bold">2026</div>
          <div class="flex-1 p-3 bg-green-950/30 border border-green-500 rounded">
            <div class="font-bold text-green-400 text-sm">Chrome 144 対応 → Stage 4 到達 🎉</div>
            <div class="text-xs text-gray-400">1月 Chrome/Edge ネイティブ対応、3/11 TC39 で ES2026 承認</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- そこで登場したのが Temporal です
- 2017年に Moment.js のメンテナーだった Maggie Johnson-Pint さんが提案
  - Date の問題を一番よく知っている人が動いた
- 2018年に Stage 2 でドラフトに。PlainDate, ZonedDateTime など型を分ける方針がここで固まった
- 9年もかかった理由：日付・時刻の仕様は複雑で、タイムゾーン・カレンダー・DST全部カバーする必要があった
  - test262 テストだけで4,500件以上
- 2025年に Firefox が初出荷、2026年1月に Chrome が続き
- そして今月3月11日、ニューヨークの TC39 総会で Stage 4 到達！ES2026 の一部に
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> ちなみに <span class="text-cyan-300">TC39</span> とは
    </h1>
    <div class="mb-6 text-gray-400 text-sm">
      <span class="text-white font-bold">Technical Committee 39</span> — Ecma International 配下の委員会。
      <span class="text-cyan-300">JavaScript (ECMAScript)</span> の仕様を策定する。
    </div>
    <div class="mb-4 text-xs text-gray-500 font-mono">// Stage プロセス — 提案から標準化までの道のり</div>
    <div class="space-y-2">
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-3 p-2 bg-gray-900/50 rounded">
        <div class="w-20 text-center px-2 py-1 bg-gray-700/50 text-gray-400 text-xs font-mono rounded">Stage 0</div>
        <div class="text-sm text-gray-400">Strawman — アイデア段階</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-3 p-2 bg-gray-900/50 rounded">
        <div class="w-20 text-center px-2 py-1 bg-gray-700/50 text-gray-400 text-xs font-mono rounded">Stage 1</div>
        <div class="text-sm text-gray-400">Proposal — 問題と解決策の提案</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-3 p-2 bg-gray-900/50 rounded">
        <div class="w-20 text-center px-2 py-1 bg-gray-700/50 text-gray-400 text-xs font-mono rounded">Stage 2</div>
        <div class="text-sm text-gray-400">Draft — 仕様のドラフト作成</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-3 p-2 bg-blue-950/30 rounded">
        <div class="w-20 text-center px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">Stage 3</div>
        <div class="text-sm text-gray-300">Candidate — 仕様確定、ブラウザ実装開始</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-3 p-2 bg-green-950/30 rounded">
        <div class="w-20 text-center px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">Stage 4</div>
        <div class="text-sm text-green-300">Finished — 標準仕様に組み込み確定</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="mt-4 text-xs text-gray-600 text-center">
      メンバー: Google, Apple, Mozilla, Microsoft, Bloomberg, Igalia など
    </div>
  </div>
</div>

<!--
- ちなみに TC39 について補足します
- TC39 は Ecma International の中にある委員会で、JavaScript の仕様を決めている場所
- 新機能は Stage 0〜4 のプロセスを経て標準化される
- Stage 3 で仕様が固まりブラウザが実装を始める、Stage 4 で正式に標準入り
- さっきのタイムラインの Stage 1〜4 がこのプロセスです
-->

---
title: 主要な型
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-5xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> Temporal の<span class="text-green-400">型</span>たち
    </h1>
    <div class="grid grid-cols-3 gap-3">
      <!-- Instant -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-blue-950/30 border border-blue-500/50 rounded">
        <div class="text-blue-400 font-bold text-sm mb-1">Temporal.Instant</div>
        <div class="text-xs text-gray-400 mb-2">絶対時刻（ナノ秒精度）</div>
        <div class="font-mono text-xs text-gray-500">2026-03-15T05:00:00Z</div>
        <div class="text-xs text-gray-600 mt-2">サーバーログ、タイムスタンプ</div>
      </div>
      <!-- ZonedDateTime -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-green-950/30 border border-green-500/50 rounded">
        <div class="text-green-400 font-bold text-sm mb-1">Temporal.ZonedDateTime</div>
        <div class="text-xs text-gray-400 mb-2">TZ + カレンダー付き日時</div>
        <div class="font-mono text-xs text-gray-500">2026-03-15T14:00+09:00<br/>[Asia/Tokyo]</div>
        <div class="text-xs text-gray-600 mt-2">ユーザー向け表示、予約</div>
      </div>
      <!-- PlainDateTime -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-purple-950/30 border border-purple-500/50 rounded">
        <div class="text-purple-400 font-bold text-sm mb-1">Temporal.PlainDateTime</div>
        <div class="text-xs text-gray-400 mb-2">TZなしの日時</div>
        <div class="font-mono text-xs text-gray-500">2026-03-15T14:00:00</div>
        <div class="text-xs text-gray-600 mt-2">カレンダーの予定</div>
      </div>
      <!-- PlainDate -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-cyan-950/30 border border-cyan-500/50 rounded">
        <div class="text-cyan-400 font-bold text-sm mb-1">Temporal.PlainDate</div>
        <div class="text-xs text-gray-400 mb-2">日付のみ</div>
        <div class="font-mono text-xs text-gray-500">2026-03-15</div>
        <div class="text-xs text-gray-600 mt-2">誕生日、期限</div>
      </div>
      <!-- PlainTime -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-yellow-950/30 border border-yellow-500/50 rounded">
        <div class="text-yellow-400 font-bold text-sm mb-1">Temporal.PlainTime</div>
        <div class="text-xs text-gray-400 mb-2">時刻のみ</div>
        <div class="font-mono text-xs text-gray-500">14:00:00</div>
        <div class="text-xs text-gray-600 mt-2">営業時間、アラーム</div>
      </div>
      <!-- Duration -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-orange-950/30 border border-orange-500/50 rounded">
        <div class="text-orange-400 font-bold text-sm mb-1">Temporal.Duration</div>
        <div class="text-xs text-gray-400 mb-2">期間・長さ</div>
        <div class="font-mono text-xs text-gray-500">P2DT3H30M</div>
        <div class="text-xs text-gray-600 mt-2">差分計算、タイマー</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1 }"
         class="mt-4 text-center text-xs text-gray-600 font-mono">
      // 共通メソッド: .from() .with() .add() .subtract() .until() .since() .equals() .compare()
    </div>
  </div>
</div>

<!--
- Temporal の大きな特徴は、用途に応じた型が分かれていること
- Instant：UTCの絶対時刻。サーバー間のログやAPIのタイムスタンプに
- ZonedDateTime：タイムゾーン付き。ユーザーに「東京の14時」と表示するときに
- PlainDate/PlainTime：TZなし。誕生日や営業時間など「ただの日付・時刻」
- Duration：期間。「2日3時間30分」のような時間の長さ
- 重要なのは、全ての型に .from(), .add(), .until() など共通のメソッドがあること
  - 一つ覚えれば全部使える
-->

---
title: こう変わる ① 不変 & 直感的
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-5xl">
    <h1 class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> こう<span class="text-green-400">変わる</span> ① <span class="text-gray-500 text-lg">不変 & 直感的</span>
    </h1>
    <div class="grid grid-cols-2 gap-6">
      <div class="text-sm text-red-400 font-mono mb-1">--- a/Date (Before)</div>
      <div class="text-sm text-green-400 font-mono mb-1">+++ b/Temporal (After)</div>
    </div>
    <div class="space-y-4">
      <!-- ミュータビリティ解決 -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// ミュータブル — 元が壊れる</div>
          <div class="text-gray-400"><span class="text-purple-400">const</span> d = <span class="text-yellow-300">new</span> Date()</div>
          <div class="text-gray-400">d.<span class="text-red-400">setDate</span>(d.getDate() + 30)</div>
          <div class="text-red-400 text-xs">// d 自体が変更される 💥</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// イミュータブル — 常に安全</div>
          <div class="text-gray-400"><span class="text-purple-400">const</span> d = Temporal.Now.plainDateISO()</div>
          <div class="text-gray-400"><span class="text-purple-400">const</span> later = d.<span class="text-green-400">add</span>({ days: 30 })</div>
          <div class="text-green-400 text-xs">// d は変わらない、later は新オブジェクト 🔒</div>
        </div>
      </div>
      <!-- 月の指定 -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 月が0始まり</div>
          <div class="text-gray-400"><span class="text-yellow-300">new</span> Date(2026, <span class="text-red-400">2</span>, 15)</div>
          <div class="text-red-400 text-xs">// 2 → 3月... 🤔</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 月が1始まり（当然）</div>
          <div class="text-gray-400">Temporal.PlainDate.from(<span class="text-green-400">"2026-03-15"</span>)</div>
          <div class="text-green-400 text-xs">// 3月は3！✨</div>
        </div>
      </div>
      <!-- 月末の安全な加算 -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 1月31日 + 1ヶ月</div>
          <div class="text-gray-400">jan31.<span class="text-red-400">setMonth</span>(1)</div>
          <div class="text-red-400 text-xs">// → 3月3日 オーバーフロー 💥</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 1月31日 + 1ヶ月</div>
          <div class="text-gray-400">jan31.<span class="text-green-400">add</span>({ months: 1 })</div>
          <div class="text-green-400 text-xs">// → 2月28日 正しくクランプ ✅</div>
        </div>
      </div>
      <!-- 差分計算 -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 日付の差分</div>
          <div class="text-gray-400 text-xs">Math.floor((d2 - d1) / (1000*60*60*24))</div>
          <div class="text-red-400 text-xs">// ミリ秒→日を手動計算 😵</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 日付の差分</div>
          <div class="text-gray-400 text-xs">d1.<span class="text-green-400">until</span>(d2, { largestUnit: <span class="text-yellow-300">"day"</span> }).days</div>
          <div class="text-green-400 text-xs">// 直感的！年月日単位も可 🎯</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- では具体的にどう変わるか、Before/After で見ていきましょう
- イミュータブル：add() は新しいオブジェクトを返す。元は絶対に変わらない
- 月が1始まり：当たり前のことが当たり前にできる
- 月末クランプ：1月31日+1ヶ月 → 2月28日に正しく丸めてくれる。オーバーフローしない
- 差分計算：ミリ秒を手動で割り算する必要がなくなる。until() で直感的に
-->

---
title: こう変わる ② タイムゾーン
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-5xl">
    <h1 class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> こう<span class="text-green-400">変わる</span> ② <span class="text-gray-500 text-lg">タイムゾーン & 型の使い分け</span>
    </h1>
    <div class="grid grid-cols-2 gap-6">
      <div class="text-sm text-red-400 font-mono mb-1">--- a/Date (Before)</div>
      <div class="text-sm text-green-400 font-mono mb-1">+++ b/Temporal (After)</div>
    </div>
    <div class="space-y-4">
      <!-- タイムゾーン変換 -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 東京の時刻をNYで表示したい</div>
          <div class="text-red-400 text-xs">// 標準APIだけでは不可能 🚫</div>
          <div class="text-gray-600 text-xs">// Intl.DateTimeFormat で表示だけ可能</div>
          <div class="text-gray-600 text-xs">// 計算はライブラリ必須</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 東京の時刻をNYで表示</div>
          <div class="text-gray-400 text-xs"><span class="text-purple-400">const</span> tokyo = Temporal.Now</div>
          <div class="text-gray-400 text-xs pl-2">.zonedDateTimeISO(<span class="text-green-400">"Asia/Tokyo"</span>)</div>
          <div class="text-gray-400 text-xs"><span class="text-purple-400">const</span> ny = tokyo</div>
          <div class="text-gray-400 text-xs pl-2">.withTimeZone(<span class="text-green-400">"America/New_York"</span>)</div>
          <div class="text-green-400 text-xs">// 同じ瞬間、違うTZ表現 ✨</div>
        </div>
      </div>
      <!-- 日付だけ -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 「誕生日」を保存したい</div>
          <div class="text-gray-400 text-xs"><span class="text-yellow-300">new</span> Date(<span class="text-yellow-300">"2000-06-15"</span>)</div>
          <div class="text-red-400 text-xs">// 内部的にUTC時刻が付く</div>
          <div class="text-red-400 text-xs">// TZによっては6月14日になる 💥</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 「誕生日」を保存</div>
          <div class="text-gray-400 text-xs">Temporal.PlainDate.from(<span class="text-green-400">"2000-06-15"</span>)</div>
          <div class="text-green-400 text-xs">// 純粋な日付。TZ変換されない</div>
          <div class="text-green-400 text-xs">// どのTZでも6月15日のまま ✅</div>
        </div>
      </div>
      <!-- DST -->
      <div v-click class="grid grid-cols-2 gap-6">
        <div class="bg-red-950/20 border-l-2 border-red-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// 夏時間の境界を跨ぐ</div>
          <div class="text-gray-400 text-xs">date.setHours(date.getHours() + 1)</div>
          <div class="text-red-400 text-xs">// DST切替日に2時間進むことがある</div>
          <div class="text-red-400 text-xs">// 存在しない時刻を生成 💥</div>
        </div>
        <div class="bg-green-950/20 border-l-2 border-green-500 p-3 rounded-r font-mono text-sm">
          <div class="text-gray-600 text-xs mb-1">// DST を安全に処理</div>
          <div class="text-gray-400 text-xs">zdt.<span class="text-green-400">add</span>({ hours: 1 })</div>
          <div class="text-green-400 text-xs">// DST境界を自動で考慮</div>
          <div class="text-green-400 text-xs">// 曖昧な時刻は明示的に解決 ✅</div>
        </div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-4 p-3 bg-green-950/20 border border-green-500/30 rounded text-center text-sm">
      <span class="text-green-400 font-bold">用途に応じた型</span>
      <span class="text-gray-400">を選ぶだけで、TZ問題の多くが構造的に解消される</span>
    </div>
  </div>
</div>

<!--
- タイムゾーン周りの変化が一番大きい
- TZ変換：withTimeZone() のワンライナーで東京→NYの変換ができる
- 誕生日問題：PlainDate なら純粋な日付。どのTZでも6月15日のまま
  - Date では不可能だった「日付だけ」が型として存在する
- DST：夏時間の境界も自動で考慮。存在しない時刻を生成しない
- ポイントは「正しい型を選ぶだけ」でTZ問題の多くが構造的に解消されること
-->

---
title: ブラウザサポート
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> ブラウザサポート <span class="text-gray-500 text-lg">2026年3月時点</span>
    </h1>
    <div class="space-y-3">
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 rounded">
        <logos-chrome class="text-2xl w-8" />
        <div class="flex-1 font-bold text-white">Chrome / Edge</div>
        <div class="text-green-400 font-mono text-sm">144+</div>
        <div class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">対応済み</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 rounded">
        <logos-firefox class="text-2xl w-8" />
        <div class="flex-1 font-bold text-white">Firefox</div>
        <div class="text-green-400 font-mono text-sm">139+</div>
        <div class="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">初出荷</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -10 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 rounded">
        <logos-safari class="text-2xl w-8" />
        <div class="flex-1 font-bold text-white">Safari</div>
        <div class="text-gray-500 font-mono text-sm">—</div>
        <div class="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">未対応</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-8 flex items-center justify-between p-4 bg-gray-900/50 border border-gray-700 rounded">
      <div>
        <div class="text-gray-500 text-sm">グローバルカバレッジ</div>
        <div class="text-3xl font-black text-white">64.32<span class="text-gray-500 text-lg">%</span></div>
      </div>
      <div class="text-right">
        <div class="text-yellow-400 text-sm">Safari 待ち...</div>
        <div class="text-gray-600 text-xs">Technology Preview でフラグ有効化可能</div>
      </div>
    </div>
  </div>
</div>

<!--
- 気になるブラウザサポートです
- Firefox が2025年5月に先陣を切って出荷、Chrome/Edge が今年1月に続きました
- Safari はまだ未対応ですが、Technology Preview ではフラグで有効化できる状態
- グローバルカバレッジは約64%。Safari が来れば一気に90%超えるはず
- iOSユーザーがいるプロダクションではまだポリフィルが必要です
-->

---
title: 今日から使うには
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> 今日から<span class="text-green-400">使う</span>には
    </h1>
    <div class="space-y-6">
      <!-- ポリフィル -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-cyan-400 font-mono mb-2">// ポリフィルで全環境対応</div>
        <div class="bg-gray-900 border border-gray-700 rounded p-4">
          <div class="font-mono text-sm">
            <span class="text-gray-500">$</span> <span class="text-cyan-300">npm install @js-temporal/polyfill</span>
          </div>
          <div class="font-mono text-sm mt-3">
            <span class="text-purple-400">import</span> <span class="text-gray-400">{ Temporal }</span> <span class="text-purple-400">from</span> <span class="text-yellow-300">'@js-temporal/polyfill'</span>
          </div>
          <div class="font-mono text-sm mt-2 text-gray-500">
            const now = Temporal.Now.<span class="text-green-400">plainDateISO</span>()
          </div>
          <div class="font-mono text-sm text-gray-600">
            // → "2026-03-15"
          </div>
        </div>
      </div>
      <!-- TypeScript -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }">
        <div class="text-xs text-cyan-400 font-mono mb-2">// TypeScript 6.0 で組み込み型定義追加</div>
        <div class="bg-gray-900 border border-gray-700 rounded p-4">
          <div class="font-mono text-sm">
            <span class="text-gray-600">// tsconfig.json</span>
          </div>
          <div class="font-mono text-sm text-gray-400">
            { "compilerOptions": { "lib": [<span class="text-green-400">"esnext"</span>] } }
          </div>
          <div class="font-mono text-sm text-gray-600 mt-1">
            // Temporal の型が自動で利用可能
          </div>
        </div>
      </div>
      <!-- ネイティブ -->
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="flex items-center gap-3 p-3 bg-green-950/20 border border-green-500/30 rounded text-sm">
        <span class="text-green-400 text-lg">💡</span>
        <div>
          <span class="text-green-300">Chrome/Firefox ではポリフィルなしでそのまま動く！</span>
          <span class="text-gray-500 text-xs ml-2">Safari 対応後は完全ネイティブへ</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- 今日から使う方法は2つ
- ポリフィル：npm install 一発で全環境対応。既存コードも段階的に移行できる
- TypeScript 6.0 で組み込み型定義が追加されたので、型補完もバッチリ
- Chrome と Firefox ではポリフィルなしでネイティブに動く
- まずは新規コードから試してみるのがオススメ
-->

---
title: まとめ
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> まとめ
    </h1>
    <div class="flex gap-6">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex-1 border-l-2 border-green-500 pl-4 py-3">
        <div class="text-green-400 text-xs font-mono mb-1">// IMMUTABLE</div>
        <div class="text-lg font-bold text-white mb-1">不変 + 明示的TZ</div>
        <div class="text-gray-500 text-sm">バグの温床だった Date の問題を根本から解決</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 200 }"
           class="flex-1 border-l-2 border-cyan-500 pl-4 py-3">
        <div class="text-cyan-400 text-xs font-mono mb-1">// TYPE-SAFE</div>
        <div class="text-lg font-bold text-white mb-1">用途別の型</div>
        <div class="text-gray-500 text-sm">意図が明確なコードで誤用を防止</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 400 }"
           class="flex-1 border-l-2 border-blue-500 pl-4 py-3">
        <div class="text-blue-400 text-xs font-mono mb-1">// READY</div>
        <div class="text-lg font-bold text-white mb-1">今日から試せる</div>
        <div class="text-gray-500 text-sm">ポリフィルで全環境OK、Chrome/Firefox はネイティブ</div>
      </div>
    </div>
    <div v-click class="mt-8 text-xs text-gray-600 space-y-1">
      <div><span class="text-gray-500">// References:</span></div>
      <div><a href="https://tc39.es/proposal-temporal/" class="text-green-500 hover:underline">tc39.es/proposal-temporal</a> — 公式仕様</div>
      <div><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal" class="text-green-500 hover:underline">MDN Temporal</a> — リファレンス</div>
    </div>
  </div>
</div>

<!--
- まとめです
- 1つ目：不変性と明示的なTZ処理で、Date のバグの温床を根本から解決
- 2つ目：用途別の型を選ぶだけで、意図が明確なコードになる
- 3つ目：ポリフィルで今日から試せる。Chrome/Firefoxはネイティブ対応済み
- 詳しくは MDN のリファレンスが充実しているのでぜひチェックしてください
-->

---
layout: center
---

<h1 class="font-mono"><span class="text-gray-500">//</span> END</h1>

<!--
- ご清聴ありがとうございました！
-->
