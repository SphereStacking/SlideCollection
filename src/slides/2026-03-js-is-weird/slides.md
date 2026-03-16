---
theme: seriph
title: "奇妙なJSの言語仕様"
info: |
  JavaScriptの闇を体感する選択式クイズ
  jsisweird.com にインスパイアされた LT用スライド
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
meta:
  slug: js-is-weird
  date: '2026-03'
  event: 社内LT会
  description: "JavaScriptの闇を体感する選択式クイズ"
  icon: "twemoji:exploding-head"
  published: true
  tags:
    - javascript
    - quiz
    - type-coercion
---

# 奇妙なJSの言語仕様

闇の仕様を体感せよ

<div class="mt-8 text-gray-400">

</div>

<div class="abs-br m-6 text-sm opacity-50">
  ← / → でページ移動
</div>

---
layout: center
---

# ルール

<div class="text-xl mt-4 space-y-4">

🧠 式の **評価結果** を当ててください

🖱️ 選択肢をクリックで **回答**（一度選んだら変更不可）

⚡ 全 12 問 — 最後にスコア発表！

</div>

---
layout: center
---

# Q1. 型変換の入り口

```js
true + false
```

<QuizQuestion :question="1" correct="B" options='"truefalse" | 1 | NaN | SyntaxError'>

`+` 演算子がBoolean→Numberへ暗黙変換。`true` → `1`, `false` → `0`。よって `1 + 0 = 1`。

文字列連結にならないのは、どちらもstringではないから。

</QuizQuestion>

---
layout: center
---

# Q2. 配列の足し算

```js
[1,2,3] + [4,5,6]
```

<QuizQuestion :question="2" correct="B" options='[1,2,3,4,5,6] | "1,2,34,5,6" | 21 | NaN'>

配列に `+` を使うと `ToPrimitive` → `toString()` が呼ばれる。
`[1,2,3].toString()` は `"1,2,3"`、`[4,5,6].toString()` は `"4,5,6"`。

よって `"1,2,3" + "4,5,6"` = `"1,2,34,5,6"`。配列同士の加算は**文字列連結**になる。

</QuizQuestion>

---
layout: center
---

# Q3. 配列とオブジェクト

```js
[1,2] + {}
```

<QuizQuestion :question="3" correct="A" options='"1,2[object Object]" | NaN | undefined | 0'>

Q2と同じく `+` で両辺が `toString()` される。

`[1,2]` → `"1,2"`、`{}` → `"[object Object]"`。

文字列連結されて `"1,2[object Object]"` になる。

</QuizQuestion>

---
layout: center
---

# Q4. 逆にすると...？

```js
{} + [1,2]
```

<QuizQuestion :question="4" correct="D" options='"[object Object]1,2" | 0 | "1,2" | NaN'>

文の先頭の `{}` は**空ブロック**として解釈される（オブジェクトリテラルではない！）。

残るのは `+[1,2]` → 単項 `+` で `[1,2]` をNumberに変換 → `Number("1,2")` → `NaN`。

⚠️ `({} + [1,2])` と括弧で囲むと `"[object Object]1,2"`（式コンテキスト）。先頭の `{}` がオブジェクトとして扱われるかブロックとして扱われるかで結果が変わる。

</QuizQuestion>

---
layout: center
---

# Q5. typeof の罠

```js
typeof NaN
```

<QuizQuestion :question="5" correct="C" options='"NaN" | "undefined" | "number" | "object"'>

**Not a Number なのに number。** これがJSの闇。

NaN は IEEE 754 浮動小数点の仕様で「数値型だが実数として表現不能な値」。

`typeof NaN === "number"` は仕様通りの正しい挙動。

</QuizQuestion>

---
layout: center
---

# Q6. もう一つの typeof の罠

```js
typeof null
```

<QuizQuestion :question="6" correct="D" options='"null" | "undefined" | "number" | "object"'>

JavaScript初期実装のバグが仕様になった有名な例。

値の型タグで `null` の内部表現が `0`（objectと同じ）だったため。

TC39で修正提案もあったが、既存コードへの影響が大きすぎて却下された。

</QuizQuestion>

---
layout: center
---

# Q7. 文字列と数値の演算

```js
"" - - ""
```

<QuizQuestion :question="7" correct="B" options='"" | 0 | NaN | SyntaxError'>

`-` 演算子は常にNumberに変換する（`+` と違って文字列連結にならない）。

`"" - (-"")` → `0 - (-0)` → `0`

`Number("")` が `0` になるのもポイント。

</QuizQuestion>

---
layout: center
---

# Q8. 比較演算のカオス

```js
null == undefined
```

<QuizQuestion :question="8" correct="A" options="true | false | TypeError | undefined">

ECMAScript仕様で `null == undefined` は `true` と**明示的に定義**されている。

ただし `null === undefined` は `false`（型が異なるため）。

`null` と `undefined` は `==` で互いにのみ等しく、他の値とは等しくならない。

</QuizQuestion>

---
layout: center
---

# Q9. 配列の比較

```js
[] == ![]
```

<QuizQuestion :question="9" correct="A" options="true | false | TypeError | undefined">

1. `![]` → `!true` → `false`（配列はtruthyなので）
2. `[] == false` → 両辺をNumberに変換
3. `Number([])` → `Number("")` → `0`
4. `Number(false)` → `0`
5. `0 == 0` → `true`

**空配列は truthy なのに、自身の否定と等しい。** 😱

</QuizQuestion>

---
layout: center
---

# Q10. 文字列の加算

```js
+!![] + +![] + +!![]
```

<QuizQuestion :question="10" correct="A" options='2 | "truefalsetrue" | "101" | NaN'>

- `!![]` → `true`（配列はtruthy） → `+true` → `1`
- `![]` → `false` → `+false` → `0`
- `!![]` → `true` → `+true` → `1`
- `1 + 0 + 1` = `2`

JSFuck はこの仕組みで任意のコードを `[]()!+` だけで書く。

</QuizQuestion>

---
layout: center
---

# Q11. 浮動小数点の罠

```js
0.1 + 0.2 === 0.3
```

<QuizQuestion :question="11" correct="B" options="true | false | SyntaxError | undefined">

`0.1 + 0.2` の結果は `0.30000000000000004`。

IEEE 754 浮動小数点では `0.1` も `0.2` も正確に表現できず、微小な誤差が生まれる。

これはJS固有ではなく、Python・Ruby・Java など多くの言語で同様。

実務では `Math.abs(a - b) < Number.EPSILON` や、整数演算（金額は**セント単位**で扱う等）で回避する。

</QuizQuestion>

---
layout: center
---

# Q12. 最終問題 🍌

```js
("b" + "a" + + "a" + "a").toLowerCase()
```

<QuizQuestion :question="12" correct="B" options='"baaa" | "banana" | "baNaNa" | "ba a"'>

1. `"b" + "a"` → `"ba"`
2. `+ "a"` → `NaN`（単項+で文字列"a"をNumber変換 → 失敗）
3. `"ba" + NaN` → `"baNaN"`
4. `"baNaN" + "a"` → `"baNaNa"`
5. `.toLowerCase()` → `"banana"` 🍌

**JSで果物が生成できる。**

</QuizQuestion>

---
layout: center
class: text-center
---

# おつかれさまでした！🎉

<QuizResult />

<div class="abs-br m-6 text-sm opacity-50">
  → まだ続きます
</div>

---
layout: section
---

<div class="mt-8 text-2xl leading-relaxed text-center">

言語仕様、全てを覚える必要はない。

<p class="mt-6 text-3xl font-bold text-green-400">「この言語にはクセがある」</p>

<p class="mt-6">と知って、対策する意識を持っておくだけでいい。</p>

</div>

---
layout: center
---

# 対策

<div class="mt-6 grid grid-cols-3 gap-6 text-center">

<v-click>

<div class="p-5 bg-green-900/30 rounded-xl">
<div class="text-4xl mb-2">🏃</div>
<div class="text-lg font-bold mb-1">生活習慣の改善</div>
<div class="text-sm text-gray-400 mb-3">毎日の運動や食事のように</div>
<code>===</code> など<br>
型を意識して書く
</div>

</v-click>

<v-click>

<div class="p-5 bg-blue-900/30 rounded-xl">
<div class="text-4xl mb-2">💉</div>
<div class="text-lg font-bold mb-1">ワクチン接種</div>
<div class="text-sm text-gray-400 mb-3">かかる前に打っておく</div>
TypeScript で<br>
型安全を手に入れる
</div>

</v-click>

<v-click>

<div class="p-5 bg-purple-900/30 rounded-xl">
<div class="text-4xl mb-2">💊</div>
<div class="text-lg font-bold mb-1">治療薬</div>
<div class="text-sm text-gray-400 mb-3">発症しても薬で治せる</div>
Linter で<br>
危険なコードを自動検出
</div>

</v-click>

</div>

<v-click>

<div class="mt-8 text-center text-xl font-bold text-green-400">

少しでも知っていれば、対策していれば、バグを未然に防げるかもしれません。

</div>

</v-click>

---
layout: center
---

# Credits

<div class="mt-8 space-y-4 text-lg">

<p>元ネタ: <a href="https://jsisweird.com/" target="_blank">jsisweird.com</a></p>
<p>もっと知りたい人: <a href="https://github.com/denysdovhan/wtfjs" target="_blank">wtfjs</a></p>

</div>

---
layout: center
class: text-center
---

# END
