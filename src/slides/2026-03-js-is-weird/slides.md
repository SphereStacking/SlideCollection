---
theme: seriph
favicon: /logo.svg
title: "奇妙なJSの言語仕様"
info: |
  JavaScriptの闇を体感する選択式クイズ
  jsisweird.com にインスパイアされた LT用スライド
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
  slug: js-is-weird
  date: '2026-03'
  event: 社内LT会
  description: "JavaScriptの闘を体感する選択式クイズ"
  icon: "logos:javascript"
  published: true
  tags:
    - javascript
    - quiz
    - type-coercion
---

<div class="h-full w-full flex items-center justify-center p-8">
  <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" class="text-center">
    <div class="flex items-center justify-center gap-4 mb-4">
      <twemoji-exploding-head class="text-6xl" />
      <div class="text-7xl font-black tracking-tight text-white">奇妙なJSの言語仕様</div>
    </div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }"
         class="text-2xl font-bold text-gray-400 mb-4">JavaScriptの闇を体感する選択式クイズ</div>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
         class="flex items-center justify-center gap-3 mb-3">
      <span class="px-3 py-1 bg-yellow-500/20 border border-yellow-500 text-yellow-400 text-sm font-mono">Quiz</span>
      <span class="px-3 py-1 bg-red-500/20 border border-red-500 text-red-400 text-sm font-mono">社内LT会</span>
      <span class="px-3 py-1 bg-purple-500/20 border border-purple-500 text-purple-400 text-sm font-mono">2026.03</span>
    </div>
  </div>
</div>

<!--
- 今日はJavaScriptの闇を体感してもらいます
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
- 今日は JS の奇妙な言語仕様についてクイズ形式でお話しします
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
- まずクイズで JS の闇を体感してもらいます
- そのあと実務の話と対策をお伝えします
-->

---
title: JSは奇妙な言語仕様がある
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl text-center">
    <h1 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> JSは奇妙な言語仕様がある
    </h1>
    <p v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }" class="text-lg text-gray-400 leading-relaxed">
      これらをしってなぜTSが世界的に使われているのかをしっていただきたいです
    </p>
  </div>
</div>

<!--
- 世界で最も使われている言語だけど、誰も説明できない挙動がたくさんある
- 8問のクイズで実際に体感してもらいます。気軽にどうぞ
-->

---
title: Q1. Boolean の足し算
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q1. <span class="text-gray-400 text-xl">Boolean の足し算</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      <span class="text-purple-400">true</span> + <span class="text-purple-400">false</span>
    </div>

<QuizQuestion :question="1" correct="B" options='"truefalse" | 1 | NaN | SyntaxError'>

`+` 演算子がBoolean→Numberへ暗黙変換。`true` → `1`, `false` → `0`。よって `1 + 0 = 1`。

文字列連結にならないのは、どちらもstringではないから。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> <code>1</code>（_Bool→int昇格）</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>1</code>（bool⊂int）</div></div>

</QuizQuestion>
  </div>
</div>

<!--
- まずはウォーミングアップ。true と false を足すとどうなるか
- JSは + 演算子でBooleanをNumberに暗黙変換する。true=1, false=0
- CやPythonでも同じ結果になるけど、JavaやRustはそもそもコンパイルエラー
-->

---
title: Q2. 配列の足し算
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q2. <span class="text-gray-400 text-xl">配列の足し算</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      [<span class="text-yellow-300">1</span>,<span class="text-yellow-300">2</span>,<span class="text-yellow-300">3</span>] + [<span class="text-yellow-300">4</span>,<span class="text-yellow-300">5</span>,<span class="text-yellow-300">6</span>]
    </div>

<QuizQuestion :question="2" correct="B" options='[1,2,3,4,5,6] | "1,2,34,5,6" | 21 | NaN'>

配列に `+` を使うと `ToPrimitive` → `toString()` が呼ばれる。
`[1,2,3].toString()` は `"1,2,3"`、`[4,5,6].toString()` は `"4,5,6"`。

よって `"1,2,3" + "4,5,6"` = `"1,2,34,5,6"`。配列同士の加算は**文字列連結**になる。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> ポインタ演算（別物）</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>[1,2,3,4,5,6]</code></div></div>

</QuizQuestion>
  </div>
</div>

<!--
- 配列同士を足したらどうなるか。直感的には連結して [1,2,3,4,5,6] と思うかも
- 実際は toString() されて文字列連結になる。Pythonだと期待通りリスト連結
-->

---
title: Q3. ブロック文の罠
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q3. <span class="text-gray-400 text-xl">ブロック文の罠</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      {} + [<span class="text-yellow-300">1</span>,<span class="text-yellow-300">2</span>]
    </div>

<QuizQuestion :question="3" correct="D" options='"[object Object]1,2" | 0 | "1,2" | NaN'>

文の先頭の `{}` は**空ブロック**として解釈される（オブジェクトリテラルではない！）。

残るのは `+[1,2]` → 単項 `+` で `[1,2]` をNumberに変換 → `Number("1,2")` → `NaN`。

⚠️ `({} + [1,2])` と括弧で囲むと `"[object Object]1,2"`（式コンテキスト）。先頭の `{}` がオブジェクトとして扱われるかブロックとして扱われるかで結果が変わる。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> 構文エラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> 構文エラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> 構文エラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>TypeError</code></div></div>

</QuizQuestion>
  </div>
</div>

<!--
- Q2 の逆パターン。でも結果は全然違う
- 先頭の {} はオブジェクトではなく空ブロックとして解釈される
- 括弧で囲むと結果が変わるという、文脈依存の罠
-->

---
title: Q4. typeof の罠
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q4. <span class="text-gray-400 text-xl">typeof の罠</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      <span class="text-purple-400">typeof</span> <span class="text-red-400">NaN</span>
    </div>

<QuizQuestion :question="4" correct="C" options='"NaN" | "undefined" | "number" | "object"'>

**Not a Number なのに number。** これがJSの闇。

NaN は IEEE 754 浮動小数点の仕様で「数値型だが実数として表現不能な値」。

`typeof NaN === "number"` は仕様通りの正しい挙動。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> <code>double</code>型 / <code>isnan()</code></div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> <code>double</code>型 / <code>isNaN()</code></div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> <code>f64</code>型 / 型で明確</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>float</code>型 / <code>isnan()</code></div></div>

</QuizQuestion>
  </div>
</div>

<!--
- Not a Number なのに typeof は "number"。名前と型が矛盾している
- IEEE 754 の仕様で「数値型だけど実数として表現できない値」
- 他の言語でも NaN は浮動小数点型。JSだけの問題ではないが名前が紛らわしい
-->

---
title: Q5. 20年越しのバグ
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q5. <span class="text-gray-400 text-xl">20年越しのバグ</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      <span class="text-purple-400">typeof</span> <span class="text-purple-400">null</span>
    </div>

<QuizQuestion :question="5" correct="D" options='"null" | "undefined" | "number" | "object"'>

JavaScript初期実装のバグが仕様になった有名な例。

値の型タグで `null` の内部表現が `0`（objectと同じ）だったため。

TC39で修正提案もあったが、既存コードへの影響が大きすぎて却下された。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> <code>(void*)0</code></div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> NPEの元</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> nullなし / <code>Option&lt;T&gt;</code></div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>NoneType</code>（専用型）</div></div>

</QuizQuestion>
  </div>
</div>

<!--
- JS初期実装のバグがそのまま仕様になった有名な例
- TC39で修正しようとしたけど、既存コードが壊れるから却下された
- Rustはそもそも null がなくて Option で扱う。根本的に設計が違う
-->

---
title: Q6. == の特殊ルール
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q6. <span class="text-gray-400 text-xl">== の特殊ルール</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      <span class="text-purple-400">null</span> == <span class="text-purple-400">undefined</span>
    </div>

<QuizQuestion :question="6" correct="A" options="true | false | TypeError | undefined">

ECMAScript仕様で `null == undefined` は `true` と**明示的に定義**されている。

ただし `null === undefined` は `false`（型が異なるため）。

`null` と `undefined` は `==` で互いにのみ等しく、他の値とは等しくならない。

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> undefined概念なし</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> <code>null</code>のみ</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> <code>Option::None</code>で統一</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>None</code>のみ</div></div>

</QuizQuestion>
  </div>
</div>

<!--
- ECMAScript仕様で明示的に true と定義されている
- === だと false。== の暗黙変換のルールを知らないとハマる
- 他の言語にはそもそも undefined という概念がない
-->

---
title: Q7. truthy の矛盾
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q7. <span class="text-gray-400 text-xl">truthy の矛盾</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      [] == ![]
    </div>

<QuizQuestion :question="7" correct="A" options="true | false | TypeError | undefined">

1. `![]` → `!true` → `false`（配列はtruthyなので）
2. `[] == false` → 両辺をNumberに変換
3. `Number([])` → `Number("")` → `0`
4. `Number(false)` → `0`
5. `0 == 0` → `true`

**空配列は truthy なのに、自身の否定と等しい。**

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> 型が合わない</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>False</code>（暗黙変換なし）</div></div>

</QuizQuestion>
  </div>
</div>

<!--
- 空配列が自身の否定と等しい。これが一番驚く人が多い
- truthyなのに == で比較するとNumber変換が走って0同士になる
- 他の言語ではコンパイルエラーか False
-->

---
title: Q8. NaN 錬成術
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> Q8. <span class="text-gray-400 text-xl">NaN 錬成術</span>
    </h1>
    <div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="bg-gray-900 border border-yellow-800/50 rounded p-4 font-mono text-lg mb-2">
      (<span class="text-yellow-300">"b"</span> + <span class="text-yellow-300">"a"</span> + + <span class="text-yellow-300">"a"</span> + <span class="text-yellow-300">"a"</span>).toLowerCase()
    </div>

<QuizQuestion :question="8" correct="B" options='"baaa" | "banana" | "baNaNa" | "ba a"'>

1. `"b" + "a"` → `"ba"`
2. `+ "a"` → `NaN`（単項+で文字列"a"をNumber変換 → 失敗）
3. `"ba" + NaN` → `"baNaN"`
4. `"baNaN" + "a"` → `"baNaNa"`
5. `.toLowerCase()` → `"banana"`

**JSで果物が生成できる。**

<div class="grid grid-cols-4 gap-2 mt-3 text-xs"><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-blue-400 font-bold">C:</span> NaN生成されない</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-orange-400 font-bold">Java:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-red-400 font-bold">Rust:</span> コンパイルエラー</div><div class="p-2 bg-gray-800/40 rounded-lg"><span class="text-yellow-400 font-bold">Python:</span> <code>TypeError</code></div></div>

</QuizQuestion>
  </div>
</div>

<!--
- JSで果物が生成できるという有名なネタ
- 単項 + が文字列 "a" を Number に変換しようとして NaN になるのがポイント
- 他の言語では単項 + が文字列に使えないのでそもそも成立しない
-->

---
title: クイズ結果
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl text-center">
    <h1 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> おつかれさまでした！
    </h1>

<QuizResult />

<div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 500 }"
     class="mt-6 text-sm text-gray-500">
  → まだ続きます
</div>
  </div>
</div>

<!--
- スコアを確認してもらう。まだ続きがあります
-->

---
title: 暗黙の型変換
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-4 font-mono">
      <span class="text-gray-500">//</span> 暗黙の型変換 <span class="text-gray-400 text-xl">— まだまだある</span>
    </h1>

<div class="grid grid-cols-2 gap-4 text-sm">

<div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
<div class="text-gray-500 font-mono text-xs mb-2">// 文字列への変換</div>

| 式 | 結果 | 型 |
|---|---|---|
| `"" + 0` | `"0"` | string |
| `"" + false` | `"false"` | string |
| `"" + null` | `"null"` | string |
| `"" + undefined` | `"undefined"` | string |
| `"" + []` | `""` | string |
| `"" + {}` | `"[object Object]"` | string |

</div>

<div v-click v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
<div class="text-gray-500 font-mono text-xs mb-2">// 数値への変換</div>

| 式 | 結果 | 型 |
|---|---|---|
| `+""` | `0` | number |
| `+false` | `0` | number |
| `+true` | `1` | number |
| `+null` | `0` | number |
| `+undefined` | `NaN` | number |
| `+[]` | `0` | number |
| `+{}` | `NaN` | number |

</div>

</div>

<div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
     class="mt-3 text-center text-gray-500 text-xs">
  クイズで出たのは氷山の一角。
</div>
  </div>
</div>

<!--
- クイズで出たのは氷山の一角。こんなにたくさんある
- 左が文字列への変換、右が数値への変換
- 全部覚える必要はないけど、こういうルールがあると知っておくことが大事
-->

---
title: + と - で世界が変わる
hideInToc: true
---

<div class="h-full flex items-center justify-center px-8">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-6 font-mono">
      <span class="text-gray-500">//</span> <code>+</code> と <code>-</code> で世界が変わる
    </h1>

<div class="grid grid-cols-2 gap-4 text-sm">
<div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
<div class="text-gray-500 font-mono text-xs mb-2">// + は文字列連結を優先</div>

| 式 | 結果 | 型 |
|---|---|---|
| `"5" + 3` | `"53"` | string |
| `"5" + true` | `"5true"` | string |
| `"5" + null` | `"5null"` | string |
| `"5" + []` | `"5"` | string |

</div>

<div v-click v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }" class="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
<div class="text-gray-500 font-mono text-xs mb-2">// - は数値変換を強制</div>

| 式 | 結果 | 型 |
|---|---|---|
| `"5" - 3` | `2` | number |
| `"5" - true` | `4` | number |
| `"5" - null` | `5` | number |
| `"5" - []` | `5` | number |

</div>
</div>

<div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
     class="mt-6 p-4 bg-red-950/20 border border-red-500/30 rounded-lg text-center text-sm">
  <span class="text-red-400 font-bold">`+`</span> は片方が string なら文字列連結、
  <span class="text-green-400 font-bold">`-`</span> は常に数値演算 — 演算子で型が変わる
</div>
  </div>
</div>

<!--
- 同じ値でも演算子で型が変わる
- + は片方が string なら文字列連結、- は常に数値演算
- これがバグの温床になる
-->

---
title: まとめ（クイズ）
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-4xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> まとめ
    </h1>
    <div class="flex gap-6">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex-1 border-l-2 border-yellow-500 pl-4 py-3">
        <div class="text-yellow-400 text-xs font-mono mb-1">// COERCION</div>
        <div class="text-lg font-bold text-white mb-1">暗黙の型変換</div>
        <div class="text-gray-500 text-sm">全てを覚える必要はない。「この言語にはクセがある」と知っておくことが大事。</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 200 }"
           class="flex-1 border-l-2 border-green-500 pl-4 py-3">
        <div class="text-green-400 text-xs font-mono mb-1">// TYPESCRIPT</div>
        <div class="text-lg font-bold text-white mb-1">型の秩序</div>
        <div class="text-gray-500 text-sm">TSにするだけでコンパイル時にエラーを検出できる。</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0, delay: 400 }"
           class="flex-1 border-l-2 border-cyan-500 pl-4 py-3">
        <div class="text-cyan-400 text-xs font-mono mb-1">// LINTER</div>
        <div class="text-lg font-bold text-white mb-1">自動検出</div>
        <div class="text-gray-500 text-sm">危険なコードを記述時に制限してくれる。</div>
      </div>
    </div>
  </div>
</div>

<!--
- 全部覚える必要はない。クセがあると知っておくだけでいい
-->

---
title: 実務でよくみるエラー
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl text-center">
    <h1 v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> 実務でよくみるエラー
    </h1>
    <div v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, delay: 300 }" class="text-gray-500 text-sm font-mono mb-6">ここからは実務の話</div>
  </div>
</div>

<!--
- クイズは極端な例だけど、実務でも似たような罠がある
-->

---
title: あるある 1
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> あるある 1
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-4">コンソールに出力される悪夢</div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="text-red-400 font-mono text-lg mb-4">
      Uncaught TypeError: Cannot read properties of undefined (reading 'name')
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="bg-gray-900 border border-red-800/50 rounded p-4 font-mono text-sm leading-relaxed mb-4">
      <div><span class="text-purple-400">const</span> <span class="text-cyan-300">user</span> = getUser() <span class="text-gray-600">// たまに undefined を返す</span></div>
      <div>console.log(user.<span class="text-red-400">name</span>) <span class="text-red-400">// 💥</span></div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
      <div class="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
        <div class="text-xs text-green-500 font-mono mb-2">// TSなら</div>
        <div class="bg-gray-900 border border-green-800/50 rounded p-3 font-mono text-sm leading-relaxed">
          <div><span class="text-purple-400">function</span> <span class="text-yellow-300">getUser</span>(): <span class="text-cyan-300">User</span> | <span class="text-purple-400">undefined</span> { ... }</div>
          <div class="mt-2"><span class="text-purple-400">const</span> <span class="text-cyan-300">user</span> = getUser()</div>
          <div>console.log(user.<span class="text-red-400">name</span>)</div>
          <div class="text-red-400">// ~~~~ ❌ Object is possibly 'undefined'.</div>
        </div>
        <div class="mt-2 text-sm text-gray-300">コンパイル時に止まる。<code>.name</code> にアクセスする前にチェックを強制される。</div>
      </div>
    </div>
  </div>
</div>

<!--
- 全員見たことあるエラー。getUser が undefined 返すケース
- TSなら User | undefined でコンパイル時に止まる
-->

---
title: あるある 2
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <h1 class="text-3xl font-bold mb-2 font-mono">
      <span class="text-gray-500">//</span> あるある 2
    </h1>
    <div class="text-gray-500 text-sm font-mono mb-4">TSを書いてると毎日見るやつ</div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="text-red-400 font-mono text-lg mb-4">
      Type 'string' is not assignable to type 'number'.
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="bg-gray-900 border border-red-800/50 rounded p-4 font-mono text-sm leading-relaxed mb-4">
      <div><span class="text-purple-400">function</span> <span class="text-yellow-300">calcPrice</span>(price: <span class="text-cyan-300">number</span>, tax: <span class="text-cyan-300">number</span>): <span class="text-cyan-300">number</span> {</div>
      <div class="pl-4"><span class="text-purple-400">return</span> price * (<span class="text-yellow-300">1</span> + tax)</div>
      <div>}</div>
      <div class="mt-2"><span class="text-gray-600">// jsのapiをしようしてdomから数値を取得しても文字として扱われますそれをそのまま渡した想定</span></div>
      <div>calcPrice(<span class="text-red-400">"100"</span>, <span class="text-yellow-300">0.1</span>)</div>
      <div class="text-red-400">// ~~~~~ ❌ string を number に渡すな</div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
      <div class="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
        <div class="text-xs text-green-500 font-mono mb-1">// JSの闇</div>
        <div class="text-sm text-gray-300">JSだと <code>input.value</code> は <code>string</code> なのに暗黙変換で<strong>なんとなく動く</strong>。</div>
        <div class="text-sm text-gray-300 mt-1">でも <code>"100" * 1.1</code> → <code>110</code> なのに <code>"100" + 10</code> → <code>"10010"</code> になる。</div>
        <div class="text-sm text-gray-300 mt-2 font-bold">TSは「なんとなく動く」を許さない。</div>
      </div>
    </div>
  </div>
</div>

<!--
- input.value は string。暗黙変換でなんとなく動くけど + で壊れる
- TSは「なんとなく動く」を許さない
-->

---
title: 対策
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-3xl">
    <h1 class="text-3xl font-bold mb-6 font-mono text-center">
      <span class="text-gray-500">//</span> 対策
    </h1>
    <div class="grid grid-cols-3 gap-4 text-center">
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
           class="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
        <div class="text-xs text-green-500 font-mono mb-2">// 生活習慣の改善</div>
        <div class="text-4xl mb-2">🏃</div>
        <div class="text-sm text-gray-400 mb-3">毎日の運動や食事のように</div>
        <code>===</code> など<br>
        型を意識して書く
      </div>
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 200 }"
           class="p-4 bg-blue-950/20 border border-blue-500/30 rounded-lg">
        <div class="text-xs text-blue-500 font-mono mb-2">// ワクチン接種</div>
        <div class="text-4xl mb-2">💉</div>
        <div class="text-sm text-gray-400 mb-3">かかる前に打っておく</div>
        TypeScript で<br>
        型安全を手に入れる
      </div>
      <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, delay: 400 }"
           class="p-4 bg-purple-950/20 border border-purple-500/30 rounded-lg">
        <div class="text-xs text-purple-500 font-mono mb-2">// 治療薬</div>
        <div class="text-4xl mb-2">💊</div>
        <div class="text-sm text-gray-400 mb-3">発症しても薬で治せる</div>
        Linter で<br>
        危険なコードを自動検出
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-6 p-3 bg-yellow-950/20 border border-yellow-500/30 rounded text-center text-sm">
      <span class="text-yellow-400 font-bold">少しでも知っていれば、対策していれば、バグを未然に防げるかもしれません。</span>
    </div>
  </div>
</div>

<!--
- 3つの対策を健康メタファーで紹介
- 生活習慣: === を使う。ワクチン: TypeScript。治療薬: Linter
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-3xl">
    <div class="grid grid-cols-2 gap-4">
      <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
        <div class="text-xs text-green-500 font-mono mb-1">// TypeScript</div>
        <div class="text-base text-gray-300">さっきの闇を<span class="text-green-400 font-bold">全部ではないけど</span>コンパイル時にエラーにしてくれる。</div>
      </div>
      <div v-motion :initial="{ opacity: 0, x: 20 }" :enter="{ opacity: 1, x: 0 }"
           class="p-4 bg-purple-950/20 border border-purple-500/30 rounded-lg">
        <div class="text-xs text-purple-500 font-mono mb-1">// Linter</div>
        <div class="text-base text-gray-300">コンパイルでエラーにはならない記述を<span class="text-purple-400 font-bold">コーディング時に弾いてくれる</span>。</div>
      </div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-6 p-4 bg-red-950/20 border border-red-500/30 rounded-lg text-center">
      <div class="text-base text-gray-300">JS で書くということは、これらの <span class="text-red-400 font-bold">開発DX を捨てる</span>ということ。</div>
      <div class="text-sm text-gray-400 mt-1">記述時に気をつけるのも、コードレビューで指摘するのも、<span class="text-red-400">限界</span>があります。</div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }"
         class="mt-6 text-center text-base text-gray-300">
        だからこそ Microsoft は、大規模開発で限界を迎えた JavaScript に<br>
      <span class="text-blue-400 font-bold text-xl">TypeScript</span> という型の秩序をもたらしました。
    </div>
  </div>
</div>

<!--
- TSにすればさっきの闇を意識しなくてもコンパイルでエラーにしてくれる
- Linterは記述時に制限を設けてくれる
- JSで書くということはDXを捨てて自分で制御するということ
- 記述時に気をつけるのもコードレビューで指摘するのも限界がある
- だからこそMicrosoftはTypeScriptという型の秩序をもたらした
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <div class="space-y-6">
      <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-gray-500 text-xs font-mono mb-1">// 過去</div>
        <div class="text-lg text-gray-300">C や C# でコードを書いていた頃、<span class="text-gray-500">型がめんどくさいと思ってました。</span></div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-gray-500 text-xs font-mono mb-1">// JSを知って</div>
        <div class="text-lg text-gray-300">JS を初めて学んだとき、<span class="text-green-400 font-bold">型を書かなくていいのが最高に楽</span>だと思いました。</div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }">
        <div class="text-gray-500 text-xs font-mono mb-1">// 転機</div>
        <div class="text-lg text-gray-300">個人開発や Web 系への転職で本物のコードを書き始めたとき</div>
        <div class="text-2xl font-bold text-cyan-400 mt-2">型の恩恵を再認識しました。</div>
      </div>
    </div>
  </div>
</div>

<!--
- もともとCやC#で書いてた頃、型めんどくさいと思ってた
- JSを学んだとき型を書かなくていいのが楽だと感じた
- でも個人開発やWeb系転職で本物のコードを書き始めて型の恩恵を再認識した
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="text-gray-500 font-mono text-xs mb-6">// いま、伝えたいこと</div>
    <div v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" class="text-lg text-gray-400">いまの私たちのプロジェクトのコードは JS です。</div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="mt-6 p-4 bg-green-950/20 border border-green-500/30 rounded-lg">
      <div class="text-xs text-green-500 font-mono mb-1">// 提案</div>
      <div class="text-2xl font-bold text-green-400">TS にするだけでも、<br>みなさんの認知負荷を大きく下げられる</div>
    </div>
    <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
         class="mt-8 text-3xl font-black tracking-tight">と思っています。</div>
  </div>
</div>

<!--
- いまのPJのコードはJS
- TSにするだけでもみなさんの認知負荷を大きく下げられると思っている
- みなさんともっとよりよいサービスにしていきたい
-->

---
hideInToc: true
---

<div class="h-full flex items-center justify-center px-12">
  <div class="w-full max-w-2xl">
    <h1 class="text-3xl font-bold mb-8 font-mono">
      <span class="text-gray-500">//</span> Credits
    </h1>
    <div class="space-y-4">
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="flex-1">
          <div class="font-bold text-white text-lg">jsisweird.com</div>
          <div class="text-xs text-gray-500">元ネタ — JavaScript の奇妙な挙動をクイズ形式で学べるサイト</div>
        </div>
      </div>
      <div v-click v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }"
           class="flex items-center gap-4 p-3 bg-gray-900/50 border border-gray-700 rounded">
        <div class="flex-1">
          <div class="font-bold text-white text-lg">wtfjs</div>
          <div class="text-xs text-gray-500">もっと知りたい人向け — GitHub で JS の闇をまとめたリポジトリ</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
- jsisweird.com と wtfjs を紹介。興味ある人はぜひ
-->

---
layout: center
hideInToc: true
---

<h1 class="font-mono"><span class="text-gray-500">//</span> END</h1>

<!--
- ご清聴ありがとうございました
-->
