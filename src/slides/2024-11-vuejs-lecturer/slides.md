---
theme: seriph
title: Vue.js hands-on
info: |
transition: slide-up
layout: intro
hideInToc: true
fonts:
  # basically the text
  sans: 'Robot'
  # use with `font-serif` css class from windicss
  serif: 'Robot Slab'
  # for code blocks, inline code, etc.
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
---

<MouseGlow />
<div class="mb-4 absolute bottom-2 left-5 hover:scale-110 transition-all duration-300">
  <span class="absolute top-0 left-0 text-4xl hover:scale-120 hover:left-7 transition-all duration-300 font-700 z-2" >
    中級者になるために
  </span>
  <img src="https://github.com/vuejs/art/blob/master/logo-uwu.png?raw=true" class="h-50 hover:scale-120 transition-all duration-300 z-1" />
  <span class="absolute -bottom-2 right-10 ml-10 text-4xl font-700 hover:scale-120 transition-all duration-300">で知るべきこと</span> 
</div>

<Profile class="absolute bottom-4 right-12" />

<div class="flex justify-center h-full items-center hover:scale-120 transition-all duration-300">
  <logos-vue class="size-50 hover:size-60 transition-all duration-300" />
</div>

---
src: ../../components/slides/profile_2024.md
hideInToc: true
---

---
hideInToc: true
---

# このスライドの概要
<Col2>
<template #left>

## 前提

- HTML / JavaScript の知識が最低限あること
- vue を少しでも触ったことがあること
- Vue.jsをもっと詳しく知りたい人。
- 問題形式で考え答えてもらいながら進めます。

<div class="flex justify-center h-1/2 items-center translate-y-1/4 ">
<logos-vue class="size-50" />
</div>

</template>
<template #right>

## 話すこと

- Vue.js の tips
- Vue.js で知っておくとハッピーになれる内容。

## 話さないこと

- options API について
- css について
</template>
</Col2>

---
layout: image-left
image: 'https://cover.sli.dev'
hideInToc: true
---

# 目次

<Toc maxDepth="1"/>


---
layout: section
---

# ライフサイクルフック

TODO


---
layout: section
---

# ディレクティブ

<Col2 class="text-left">
<template #left>

## ディレクティブとは

- `v-` という接頭辞を持ち、Vue によって提供される特別な属性です。
- ディレクティブはレンダリングされる DOM に、特別なリアクティブな振る舞いを割り当てます。
- 自身で[カスタムディレクティブ](https://ja.vuejs.org/guide/reusability/custom-directives.html)を作成することも可能<br>
  (今回は割愛)

</template>
<template #right>

## ディレクティブ一覧

<div class="flex flex-wrap gap-2 font-700">
  <Link to="v-bind" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-bind</Link>
  <Link to="v-on" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-on</Link>
  <Link to="v-model" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-model</Link>
  <Link to="v-if_v-show" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-if</Link>
  <Link to="v-if_v-show" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-show</Link>
  <Link to="v-for" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-for</Link>
  <Link to="v-slot" class="bg-teal-400 text-black px-2 py-1 rounded-md">v-slot</Link>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-text<span class=" text-red-500">*</span></span>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-html<span class=" text-red-500">*</span></span>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-pre<span class=" text-red-500">*</span></span>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-cloak<span class=" text-red-500">*</span></span>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-memo<span class=" text-red-500">*</span></span>
  <span class="bg-teal-400 text-black px-2 py-1 rounded-md">v-once<span class=" text-red-500">*</span></span>
</div>

<span class=" text-red-500">*</span> はこのスライドでは扱いません。

</template>
</Col2>





---
layout: section
routeAlias: v-bind
---

# v-bind

---
layout: center
---

# v-bind の基本

HTML 属性に動的にデータをバインドするために使用<br>
省略形として `:` を使用する。

```vue
<template>
  <img :src="imageSrc" :alt="imageAlt">
  <img v-bind:src="imageSrc" v-bind:alt="imageAlt">
</template>

<script setup>
const imageSrc = ref('https://example.com/image.png');
const imageAlt = ref('サンプル画像');
</script>
```

- **例**
  - `:src="imageSrc"` は `imageSrc` の値を `src` 属性にバインドします。
  - `:alt="imageAlt"` は `imageAlt` の値を `alt` 属性にバインドします。

---
layout: center
---

# v-bind の様々なバインディング方法

<Col2>
<template #left>

```vue
<template>
  <!-- オブジェクト構文 -->
  <div :class="{ active: isActive }">コンテンツ</div>

  <!-- 配列構文 -->
  <div :class="[baseClass, errorClass]">コンテンツ</div>

  <!-- オブジェクト構文と配列構文の組み合わせ -->
  <div :class="[
    { active: isActive }, 
    baseClass, 
    errorClass
  ]">コンテンツ</div>
</template>

<script setup>
const isActive = ref(true);
const baseClass = 'base';
const errorClass = ref('error');
</script>
```

</template>
<template #right>

- `v-bind` では下記の様なバインディングが可能
  - オブジェクト構文 (`true` のときに適用)
  - 配列構文
  - オブジェクト構文と配列構文を組み合わせることも可能

</template>
</Col2>
---
layout: center
---

# Problem

<Col2>
<template #left>
baseStyle と dynamicStyle を同じ div に適用すると、<br>
最終的にどうなるでしょうか？

```vue
<template>
  <div :style="[
    baseStyle, 
    isActive ? dynamicStyle : {}
  ]">
    コンテンツ
  </div>
</template>

<script setup>
import { ref } from 'vue';

const baseStyle = {
  padding: '10px',
  backgroundColor: 'lightgray'
};
const dynamicStyle = {
  backgroundColor: 'darkgray',
  border: '1px solid black'
};
const isActive = ref(true);
</script>
```

</template>
<template #right>

## Answer

<v-click>

```css
padding: 10px;
background-color: darkgray;
border: 1px solid black;
```

</v-click>

## why

<v-click>

- `backgroundColor` は `dynamicStyle` によって上書きされます。

</v-click>

</template>
</Col2>

---
layout: center
---

# v-bind まとめ

<div>

- `v-bind` と `:` を使用してHTML属性をバインドする。
- オブジェクト構文と配列構文を使用して、複数の属性をバインドする。
</div> 


---
layout: section
routeAlias: v-on
---

# v-on

---
layout: center
---

# v-on イベントハンドリングの基本

DOM イベントを購読し、イベント発生時に特定の処理を実行するために使用<br>
省略形として `@` を使用することができます。

```vue
<template>
  <button @click="handleClick">クリック</button>
  <button v-on:click="handleClick">クリック</button>
</template>

<script setup>
const handleClick = () => {
  alert('クリックされました');
};
</script>
```

- **例**
  - `@click="handleClick"` は `click` イベントが発生したときに `handleClick` 関数を呼び出します。

---

# v-on の様々なハンドラー

<Col2>
<template #left>

```vue
<template>
  <!-- インラインハンドラー -->
  <button @click="count++">Add 1</button>
  <p>Count is: {{ count }}</p>

  <!-- メソッドハンドラー -->
  <button @click="greet">Greet</button>

  <!-- インラインハンドラー内でのメソッド呼び出し -->
  <button @click="say('hello')">Say hello</button>
</template>

<script setup>
const count = ref(0);

function greet($event) {
  alert($event.target.tagName);
}

function say(message) {
  alert(message);
}
</script>
```
</template>
<template #right>

- **インラインハンドラー**
  - 簡単なロジックや単純な状態変更に適しています。
    - あまり使わない方が良いと考えています。<br>
      Templateにロジックを書くのは避けましょう。

- **メソッドハンドラー**
  - コンポーネント内で定義された関数を呼び出します。
  - ネイティブの DOM イベントオブジェクトにアクセスできます。


- **インラインハンドラー内でのメソッド呼び出し**
  - 引数を渡すことで、柔軟なイベント処理が可能になります。

</template>
</Col2>

---
layout: center
---

# イベント修飾子

イベントハンドラー内での `event.preventDefault()` や `event.stopPropagation()` の必要性を軽減します。

<Col2>
<template #left>
```vue
<template>
  <!-- クリック時にイベントの伝搬を停止 -->
  <a @click.stop="doThis">リンク</a>
  
  <!-- フォームの送信時にページリロードを防止 -->
  <form @submit.prevent="onSubmit"></form>
  
  <!-- 複数の修飾子を組み合わせる -->
  <a @click.stop.prevent="doThat">リンク</a>
</template>
```

</template>
<template #right>

- **主な修飾子**
  - `.stop`: イベントの伝搬を停止します。
  - `.prevent`: イベントのデフォルト動作を防ぎます。
  
- **ポイント**
  - 修飾子はドット（.`.`）を用いて指定します。
  - 修飾子の順序には注意が必要です。

</template>
</Col2>

---
layout: center
---

# キー修飾子

キーボードイベントを特定のキーに限定して処理します。

<Col2>
<template #left>

```vue
<template>
  <!-- Enterキーが押されたときにsubmitメソッドを実行 -->
  <input @keyup.enter="submit" />
  
  <!-- Ctrl+Enterキーが押されたときにsubmitメソッドを実行 -->
  <input @keyup.ctrl.enter="submit" />
</template>

<script setup>
function submit() {
  alert('Form submitted!');
}
</script>
```

</template>
<template #right>

- **主なキー修飾子**
  - `.enter`
  - `.tab`
  - `.delete`
  - `.esc`
  - `.space`
  - `.up`
  - `.down`
  - `.left`
  - `.right`

</template>
</Col2>

---
layout: center
---

# システム修飾子

システムキー（Ctrl、Alt、Shift、Meta）と組み合わせてイベントを制御します。

<Col2>
<template #left>

```vue
<template>
  <!-- Ctrl + Click -->
  <div @click.ctrl="doSomething">Do something</div>
  
  <!-- Alt + Enter -->
  <button @keyup.alt.enter="clear">Clear</button>
</template>

<script setup>
function doSomething() {
  alert('Ctrl + Click detected!');
}

function clear() {
  alert('Alt + Enter detected!');
}
</script>
```

</template>
<template #right>

- **主なシステム修飾子**
  - `.ctrl`
  - `.alt`
  - `.shift`
  - `.meta`

- **ポイント**
  - MacとWindowsでのメタキーの違いに注意が必要です。

</template>
</Col2>

---
layout: center
---

# マウスボタン修飾子

<Col2>
<template #left>

特定のマウスボタンに限定してイベントを処理します。

```vue
<template>
  <!-- 左clickのみを処理 -->
  <button @click.left="leftClick">左click</button>
  
  <!-- 右clickのみを処理 -->
  <button @click.right="rightClick">右click</button>
</template>

<script setup>
function leftClick() {
  alert('左clickされました');
}

function rightClick() {
  alert('右clickされました');
}
</script>
```

</template>
<template #right>

- **主なマウスボタン修飾子**
  - `.left`
  - `.right`
  - `.middle`

- **ポイント**
  - 修飾子は主に左利き用マウスに依存せず、「メイン」、「セカンダリ」、「補助」のボタンを示します。

</template>
</Col2>

---
layout: center
---
# イベントハンドリングのまとめ

- `v-on` と `@` を使用してDOMイベントを購読・処理する。
- インラインハンドラーはシンプルな操作に適し、メソッドハンドラーは複雑なロジックに適しています。
- イベント修飾子を活用することで、イベントのデフォルト動作や伝搬を簡単に制御できます。
- キー修飾子やシステム修飾子を使用して、特定のキーやシステムキーとの組み合わせでイベントを処理できます。
- マウスボタン修飾子を使用して、特定のマウスボタンに対するイベントを処理できます。

---

# 実践問題

<Col2>
<template #left>

## Problem

リンクを右クリックしたときにアラートが表示されるようにしてください。
その際に、デフォルトの右クリックメニューが表示されないようにしてください。

```vue
<template>
  <a 
    href="https://example.com" 
    @click="handleClick">
    Example Link
  </a>
</template>

<script setup>
const handleClick = () => {
  alert('リンクがクリックされました');
};
</script>
```

</template>
<template #right>

## Answer

<v-click>

```vue
<template>
  <a 
    href="https://example.com" 
    @click.right.prevent="handleClick">
    Example Link
  </a>
</template>

<script setup>
const handleClick = () => {
  alert('リンクが右clickされました');
};
</script>
```

- `.right`: 右クリックのみを検出。
- `.prevent`: デフォルトの右クリックメニューを防止。

</v-click>


</template>
</Col2>

---
layout: section
---

# v-model

---
layout: center
---

# v-model とは


- `v-model` ディレクティブは、双方向バインディングを提供します。

- ユーザーの入力とアプリケーションの状態を同期させるのに便利です。

- さまざまなフォーム要素（`input`、`select`、`textarea` など）で使用できます。

---

# v-model について

<Col2>
<template #left>

## 基本的な使い方

```vue
<template>
  <input v-model="message">
  <p>入力されたメッセージ: {{ message }}</p>
</template>

<script setup>
const message = ref('');
</script>
```

- `v-model` を使用すると、入力フィールドとリアクティブな変数を同期できます。


</template>
<template #right>

## 内部的な仕組み

```vue
<input
  :value="message"
  @input="message = $event.target.value"
/>
```

- `v-model` は以下のように展開されます。
- `:value` でプロパティをバインドし、`@input` でイベントをキャッチして値を更新します。

</template>
</Col2>

<div class="flex flex-row justify-center items-center gap-4 mt-10">

<VModelExample />

</div>


---

# 修飾子

## `.lazy`

- 入力イベントではなく、`change` イベントで値を更新します。

```vue
<input v-model.lazy="message">
```

---

## `.number`

- 入力値を自動的に数値に変換します。

```vue
<input v-model.number="age" type="number">
```

---

## `.trim`

- 入力値の前後の空白を自動的に削除します。

```vue
<input v-model.trim="username">
```

---

# コンポーネントでの v-model

- カスタムコンポーネントでも `v-model` を使用できます。

```vue
<MyInput v-model="searchText" />
```

- コンポーネント側で `modelValue` と `update:modelValue` をハンドリングします。

---

# コンポーネントでの実装例

```vue
<!-- 親コンポーネント -->
<template>
  <MyInput v-model="searchText" />
</template>

<script setup>
const searchText = ref('');
</script>
```

```vue
<!-- 子コンポーネント (MyInput.vue) -->
<template>
  <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)">
</template>

<script setup>
const props = defineProps(['modelValue']);
</script>
```

---

# 複数の v-model バインディング

- 複数のプロパティをバインドする場合、`v-model:propName` を使用します。

```vue
<MyComponent
  v-model:title="pageTitle"
  v-model:content="pageContent"
/>
```

---

# Problem

次のコードで、チェックボックスの状態が更新されないのはなぜでしょうか？

```vue
<template>
  <input type="checkbox" v-model="checked">
  <p>チェックボックスは {{ checked ? 'オン' : 'オフ' }}</p>
</template>

<script setup>
const checked = ref(false);
</script>
```

---

# Answer

- `input` 要素の `type` が `checkbox` の場合、`v-model` は `true` または `false` を期待します。

- しかし、`checked` の初期値が文字列や `null` の場合、期待通りに動作しません。

- **解決策**: `checked` の初期値を確実にブール値にします。

---

# 修正後のコード

```vue
<template>
  <input type="checkbox" v-model="checked">
  <p>チェックボックスは {{ checked ? 'オン' : 'オフ' }}</p>
</template>

<script setup>
const checked = ref(false);
</script>
```

- `checked` を確実に `false` で初期化しました。

---

# v-model のカスタマイズ

- コンポーネント内で `modelValue` 以外のプロパティ名を使いたい場合は、`model` オプションを使用します。

```vue
<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  }
}
</script>
```

---
layout: center
---

# まとめ

- `v-model` は双方向バインディングを簡潔に実現するためのディレクティブです。

- 修飾子を使って入力値を加工できます。

- カスタムコンポーネントでも `v-model` を活用できます。

- データの型に注意して正しくバインディングしましょう。

---
layout: center
section: v-if_v-show
---

# v-if v-show

参考 : 公式ドキュメント [条件付きレンダリング](https://ja.vuejs.org/guide/essentials/conditional)


---

# 条件分岐による表示制御

<div />

条件分岐で表示/非表示を制御するには
`v-if` と `v-show` があります。

- `v-if` の場合

```vue
<template>
  <div v-if="case === 1">case 1</div>
  <div v-else-if="case === 2">case 2</div>
  <div v-else>case 3</div>
</template>
```

- `v-show` の場合

```vue
<template>
  <div v-show="case === 1">case 1</div>
  <div v-show="case === 2">case 2</div>
  <div v-show="case === 3">case 3</div>
</template>
```


<div class="flex flex-row justify-center items-center gap-4 h-25">
<div v-click class="text-center text-[100px]">
🤔 
</div>
<div v-click class="w-4/5">
  <div >

  得られる結果は両方とも同じですよね。
 
  </div>
  <div>

  ### みなさんはどう使い分けていますか？

  </div>
</div>
</div>


---


# Problem

<Col2>
<template #left>

- `v-if` の場合 (case=2) DOMはどうなる？

```vue
<template>
  <div v-if="case === 1">case 1</div>
  <div v-else-if="case === 2">case 2</div>
  <div v-else>case 3</div>
</template>
```
</template>
<template #right>

<div v-click>

## Answer

```html
<template>
  <!---->
  <div>case 2</div>
  <!---->
</template>
```

</div>
</template>
</Col2>

<Col2>
<template #left>

- `v-show` の場合 (case=3) DOMはどうなる？

```vue
<template>
  <div v-show="case === 1">case 1</div>
  <div v-show="case === 2">case 2</div>
  <div v-show="case === 3">case 3</div>
</template>
```
</template>
<template #right>
<div v-click>

## Answer

```html
<template>
  <div style="display: none;">case 1</div>
  <div style="display: none;">case 2</div>
  <div style="display: block;">case 3</div>
</template>
```

</div>
</template>
</Col2>



---

# [v-if vs v-show](https://ja.vuejs.org/guide/essentials/conditional#v-if-vs-v-show)

<VS>
<template #left-header>

v-if

</template>
<template #left>

<ul>
<li>
  <strong>表示制御</strong>:<br>
  <span v-click=1> <code>true</code> のときのみ要素が DOM に存在し、<code>false</code> のときは削除される。</span>
</li>
<li>
  <strong>レンダリング</strong>:<br>
  <span v-click=3> <code>false</code>/<code>true</code> が変更されたときに毎回レンダリングされる。</span>
</li>
<li>
  <strong>ライフサイクルフック</strong>:<br>
  <span v-click=5>v-if でレンダリングされたコンポーネントは、created や mounted などのライフサイクルフックが呼び出される。</span>
</li>
</ul>
</template>
<template #right-header>

v-show

</template>
<template #right>
<ul>
<li>
  <strong>表示制御</strong>:<br>
  <span v-click=2>要素は常に DOM に存在し、style の <code>display: none</code> で非表示にする。</span>
</li>
<li>
  <strong>レンダリング</strong>:<br>
  <span v-click=4>初回レンダリング時に要素が必ずレンダリングされます。</span>
</li>
<li>
  <strong>ライフサイクルフック</strong>:<br>
  <span v-click=6>要素のライフサイクルフックは呼び出されない。</span>
</li>
</ul>
</template>
</VS>


---
layout: center
---

# まとめ

<Col2 class="mx-auto w-4/6 text-left mt-10">
<template #left>

## `v-if` 
### `DOM` を操作する
### 変更することが少ない場合


</template>
<template #right>

## `v-show` 
### `style` を操作する
### 頻繁に切り替える場合

</template>
</Col2>




---
layout: center
---

# v-for

参考 : 公式ドキュメント [リストレンダリング](https://ja.vuejs.org/guide/essentials/list)

---

# リストレンダリングの基本

`v-for` ディレクティブを使って、配列に基づいて項目のリストをレンダリングします。

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </ul>
</template>

<script setup>
const items = ref([
  { id: 1, message: 'Foo' },
  { id: 2, message: 'Bar' }
]);
</script>
```

---

# v-for とオブジェクト

オブジェクトの各プロパティを反復処理することもできます。

```vue
<template>
  <ul>
    <li v-for="(value, key) in myObject" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup>
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
});
</script>
```

---

# Problem

<Col2>
<template #left>

下記はどうなるでしょうか？

```vue
<template>
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li>
</template>

<script setup>
const todos = ref([
  { id: 1, name: 'Task 1', isComplete: false },
  { id: 2, name: 'Task 2', isComplete: true }
]);
</script>
```

<div v-click>

## Answer

エラーが throw されます。

</div>

</template>
<template #right>

<div v-click class="mb-10">
  <span class="text-8xl">🤔</span> <span class="text-6xl">？？</span>
</div>

<div v-click>

## Why

同じノードで処理が開始された場合の優先順位
1. `v-if` が評価される
2. `v-for` が評価される


`v-for` よりも `v-if` のほうが先に評価されるため、  
`v-if` で使用している `todo.isComplete` が未定義となりエラーとなる

</div>
</template>
</Col2>

---

# v-for と v-if の組み合わせ

`v-for` と `v-if` を同じ要素に使うのは推奨されません。`v-if` を `<template>` タグに移動することで解決できます。

```vue
<template>
  <ul>
    <template v-for="todo in todos">
      <li v-if="!todo.isComplete" :key="todo.id">
        {{ todo.name }}
      </li>
    </template>
  </ul>
</template>

<script setup>
const todos = ref([
  { id: 1, name: 'Task 1', isComplete: false },
  { id: 2, name: 'Task 2', isComplete: true }
]);
</script>
```



---

# v-for の key 属性

<Col2>
<template #left>

`v-for` でレンダリングされた要素には 可能な限り `key` 属性を指定することが推奨されます。

これにより、Vue は要素を効率的に追跡し、更新できます。

描画要素の順番が変化したり、要素が削除されたりする場合は `key` 属性を指定しましょう。

<!--
echo :
単純なケース(componentやv-if以外など)やパフォーマンスに向上等で意図的であれば指定しなくてもよい。

基本的に `linter`で警告が出るので指定しましょう。
-->

</template>
<template #right>

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.message }}
    </li>
  </ul>
</template>
```

</template>
</Col2>

---

# 配列の変更の検出

<Col2>
<template #left>

## ミューテーションメソッドを検出

ミューテーションメソッドを検出し、必要な更新をトリガーします。

`push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`

```vue
<script setup>
const items = ref([{ message: 'Foo' }, { message: 'Bar' }]);

// 配列の変更
items.value.push({ message: 'Baz' });
</script>
```

</template>
<template #right>

## フィルタリング/並べ替えの結果を表示

算出プロパティを使って、フィルタリングや並べ替えを適用した配列を表示できます。

```vue
<template>
  <ul>
    <li v-for="n in evenNumbers" :key="n">{{ n }}</li>
  </ul>
</template>

<script setup>
const numbers = ref([1, 2, 3, 4, 5]);

const evenNumbers = computed(() => {
  return numbers.value.filter(n => n % 2 === 0);
});
</script>
```

</template>
</Col2>

---
layout: center
---

# まとめ

- `v-for` と `v-if` は同時に使わない
- `v-for` では `key` 属性を指定する


---

# 組み込み関数

<Col2>
<template #left>

## 組み込み関数とは

- Vue によって提供される関数です。
- データを操作するための関数です。

</template>
<template #right>

## 組み込み関数一覧

- `ref`
- `reactive`
- `computed`
- `watch`
- `watchEffect`
- `onMounted`
- `onUnmounted`
- `onUpdated`
- `onBeforeMount`
- `onBeforeUnmount`
- `onBeforeUpdate`

</template>
</Col2>

---
layout: center
---

# ref
# reactive

参考 : 公式ドキュメント [リアクティビティーの基礎](https://ja.vuejs.org/guide/essentials/reactivity-fundamentals.html)

---

# リアクティブな変数について
リアクティブな変数には2種類あります

<Col2>
<template #left>

- `ref` の場合

    ```vue
    <script setup>
    const person = ref({ name: 'John', age: 25 });

    console.log(person.value.name); // 'John'
    console.log(person.value.age);  // 25
    </script>
    <template>
      <p>{{ person.name }}</p>
      <p>{{ person.age }}</p>
    </template>
    ```

<div v-click>

## Problem

どこが違うでしょうか？
</div>
</template>
<template #right>

- `reactive` の場合

    ```vue
    <script setup>
    const person = reactive({ name: 'John', age: 25 });

    console.log(person.name); // 'John'
    console.log(person.age);  // 25
    </script>
    <template>
      <p>{{ person.name }}</p>
      <p>{{ person.age }}</p>
    </template>
    ```

<div class="" v-click>

## Answer

大雑把にはデータにアクセスする際に `.value` をつけるかどうかの違いです。


</div>
</template>
</Col2>

<!--

echo :
二種類のリアクティブな変数の宣言方法がありますが意識して使ったことはありますか？
うまく使い分けていますか？
値が連動せずあれ？と思ったことはありませんか？

それぞれの違いを見ていくと

act: 誰かにあてる

act: click

-->

---

# Problem

`reactive`を使用した下記コードを実行した際に、`name` の値はどうなるでしょうか？

```vue {monaco}
<script setup>
const person = reactive({ name: 'ジョン', age: 25 });
const { name } = person;

name = 'ジョージ';
</script>
<template>
  <p>{{ name }} {{ person.name }}</p>
</template>
```

<div class="flex flex-row gap-4">
  <div class="w-1/5">

  <div v-click>

  ## Answer

  両方とも`ジョン`

  </div>
  <div v-click class="text-center text-[100px]">
  🤔
  </div>
  </div>
  <div v-click class="w-4/5 text-sm">

  ## Why

  - `reactive` で作った `person` から `name` を取り出すと、リアクティブではなく普通の文字列になる。
  - そのため、`name` に `ジョージ` を代入しても、`person` の `name` は変わりません。
  - 結果として、テンプレートで表示される `name` は `ジョン` のままになるんです。

  </div>
</div>


---

# Problem

ではこの時どうやったら`name` の値はリアクティブになるでしょうか？

```vue {monaco}
<script setup>
const person = reactive({ name: 'ジョン', age: 25 });
const { name } = person;
name = 'ジョージ';
</script>

<template>
  <p>{{ name }}</p>
</template>
```

<Col2>
<template #left>
  <div v-click>

## Answer
```vue
<script setup>
const person = reactive({ name: 'ジョン', age: 25 });
const { name } = toRefs(person);
name.value = 'ジョージ';
</script>

<template>
  <p>{{ name }}</p>
</template>
```

</div>

</template>
<template #right>
<div v-click class="w-4/5 text-sm">

## Why

- `toRefs` を使って取り出した変数はリアクティブな変数になる。
- そして `.value` をつけてデータにアクセスすることで書き換えができる。

</div>
</template>
</Col2>


---

# ref vs reactive

それぞれのメリット・デメリットは下記の記事がとても参考になります。

- [【Vue.js】ref と reactive どっちを使う？](https://zenn.dev/azukiazusa/articles/ref-vs-reactive)

また、作者である Evan You さんは `ref` を推奨しています。(vueFes 2023にて)

## 私自身も下記の理由から `ref` を推奨しています。

- reactive において分割代入をするとリアクティブ性が失われる
- computed(後述) も同様に `.value` でデータにアクセスする
- toRefs で reactive を解決するなら最初から ref をつかおうよ
- script部分にて`.value`をつけることでリアクティブな値を触るのを明示できる(諸説あり。面倒と思う人もいる)


---
layout: center
---

# まとめ

- `reactive` は分割代入をするとリアクティブ性が失われる
- `computed` も `.value` でデータにアクセスする
- `toRefs` で `reactive` を解決するなら最初から `ref` を使おう

## これらを踏まえると

- 基本的に `ref` を使うことを推奨する。

---
layout: center
---

# computed (算出プロパティ)


参考 : 公式ドキュメント [算出プロパティ](https://ja.vuejs.org/guide/essentials/computed)


---

# 算出プロパティってなんぞ

算出プロパティとは、あるデータや別の算出プロパティから算出される新たなデータのことです。

<transform scale="5" v-click>
🤔
</transform>

---

# 算出プロパティの例

<Col2>
<template #header>

このようなデータがあったときに、平均年齢を算出したいとします。

```vue
const users = ref([
  { second_name: 'hoge林', first_name: 'hoge郎' ,age: 24},
  { second_name: 'fuga田', first_name: 'fuga麿' ,age: 37},
  { second_name: 'piyo山', first_name: 'piyo美' ,age: 27},
]);
```

</template>
<template #left>

### 算出プロパティを使った場合

```vue {2}
<script setup>
const averageAge = computed(() => {
  let totalAge = 0;
  for (const user of users.value) {
    totalAge += user.age;
  }
  return totalAge / users.value.length;
});
</script>
<template>
  <p>{{ averageAge }}</p>
</template>
```

</template>
<template #right>

### 算出プロパティを使わない場合

```vue {2}
<script setup>
const averageAge = () => {  
  let totalAge = 0;
  for (const user of users.value) {
    totalAge += user.age;
  }
  return totalAge / users.value.length;
}
</script>
<template>
  <p>{{ averageAge }}</p>
</template>
```

</template>
</Col2>

---
layout: fact
---

# 一行しか変わらない



---

# computed(算出プロパティ) vs method(関数)

<VS>
<template #left-header>
computed
</template>
<template #left>

<ul>
<li>
<strong>キャッシュ機能</strong>:<br>
<span v-click=1>同じ依存データに対して複数回アクセスしても、一度計算された結果がキャッシュされる。</span>
</li>
<li >
<strong>リアクティブ</strong>:<br>
<span v-click=3>依存しているデータが変更されると、自動的に再計算されます。</span>
</li>
<li>
<strong>テンプレート内での使用</strong>:<br>
<span v-click=5>データの表示ロジックをテンプレートに直接組み込む際に便利です。</span>
</li>
</ul>

</template>
<template #right-header>
method
</template>
<template #right>

<ul>
<li>
<strong>毎回実行</strong>:<br>
<span v-click=2>呼び出されるたびに関数が実行されるため、計算結果が常に最新の状態になります。</span>
</li>
<li>
<strong>柔軟性</strong>:<br>
<span v-click=4>データの操作や複雑なロジックを実装する際に適しています。</span>
</li>
<li>
<strong>イベントハンドリング</strong>:<br>
<span v-click>ボタンのクリックなどのユーザーアクションに応じて処理を行う場合に使用します。</span>
</li>
</ul>

</template>
</VS>

---

# Problem

<Col2>
<template #left>
<div v-click>

1~3は、それぞれどうなるでしょうか？
```vue
<template>
  <div class="card">
    <div class="counter">
      count: {{ count }}
    </div>
    <div class="timestamp">
      <!-- 1 -->
      <h3>1. computed</h3>
      <div>{{ computedTimestamp }}</div>
    </div>
    <div class="timestamp">
      <!-- 2 -->
      <h3>2. method</h3>
      <div>{{ methodTimestamp() }}</div>
    </div>
    <div class="timestamp">
      <!-- 3 -->
      <h3>3. ref computed</h3>
      <div>{{ computedRefTimestamp }}</div>
    </div>
  </div>
</template>
```
</div>
</template>
<template #right>

<div v-click>

```vue
<script setup>
const count = ref(0);
const computedTimestamp = computed(() => {
  //1.リアクティブな依存はない
  return `Computed: ${Date.now()}`;
});
const methodTimestamp = () => {
  //2.リアクティブな依存はない
  return `Method: ${Date.now()}`;
};
const computedRefTimestamp = computed(() => {
  //3.リアクティブな依存がある
  return `Computed (${count.value}): ${Date.now()}`;
});

let timer;
onMounted(() => {
  // 1sごとにcountをインクリメント
  timer = setInterval(() => {
    count.value++;
  }, 1000);
});
</script>
```

</div>
</template>
</Col2>

---


<Col2>
<template #left>

## Answer

<div v-click>

<ComputedVsMethod />
</div>

  <div v-click class="text-center text-[100px]">
  🤔
  </div>
</template>
<template #right>

<div v-click>

## Why

1. リアクティブな依存がないため、一度計算された結果がキャッシュされ移行は更新がかからない。
2. 関数のため、DOM の更新時に毎回再計算される。
3. リアクティブな依存があるため、DOM の更新時に毎回再計算される。


### NGコード
```vue
<template>
  <!-- NG: 関数の戻りをそのまま描画 -->
  <div>{{ isHoge() }}</div>
  <!-- NG: 関数の戻りを使用して条件分岐 -->
  <div v-if="getValue() === 'Hoge'">Hoge</div>
  <!-- NG: 関数の戻りを使用してクラス指定 -->
  <div :class="getClass()">Class</div>
  <!-- NG: 関数の戻りを使用して条件分岐 -->
  <div :class="isHoge() ? 'red' : 'blue'">Class</div>
</template>
```
</div>
</template>
</Col2>

---

# 算出プロテティを使うときの注意点 1

<Col2>
<template #left>

### 副作用のないようにすることが重要
 
- 算出プロパティの getter の内部で他のステートを変更
- 非同期リクエストを実行したり
- DOM を変更したりしないようにしましょう！ 

- 算出プロパティは他の値に基づいて計算する方法を宣言的に記述していると考えてください。

</template>
<template #right>

### NGコード
```vue
<script setup>
const el = document.getElementById('document-title');

// NG: 算出プロパティの中で副作用を持つ例
const computedWithSideEffect = computed(() => {
  // 他のステートを変更する
  count.value++;

  // 非同期リクエストを実行する
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));

  // DOM を変更する
  el.textContent = `Count is ${count.value}`;

  return count.value;
});
</script>
```
</template>
</Col2>

---

# 算出プロテティを使うときの注意点 2

<Col2>
<template #left>

### 算出した値の変更を避ける​
 
- 算出プロパティから返る値は、一時的なスナップショット
- ソースの状態が変わるたびに、新しいスナップショットが作成される。
- 計算された結果は読み取り専用として扱い、変更しないようにします。

<div v-click>

### Problem

この場合どこを変更したらいいでしょうか？

</div>
<div v-click>

### Answer

```js
function modifyComputedValue(num) {
  numbers.value.push(num);
}
```
</div>

</template>
<template #right>

```vue {monaco}
<script setup>
import { ref, computed } from 'vue';

const numbers = ref([1, 2, 3, 4, 5]);

// 算出プロパティ
const evenNumbers = computed(() => {
  return numbers.value.filter(n => n % 2 === 0);
});

// NG: 算出プロパティの値を変更しようとする例
function modifyComputedValue(num) {
  evenNumbers.value.push(num);
}
</script>

<template>
  <div>
    <p>偶数 : {{ evenNumbers }}</p>
    <button @click="modifyComputedValue(6)">push</button>
  </div>
</template>
```
</template>
</Col2>



---
layout: center
---

# まとめ

<div class="flex flex-col justify-center items-center text-2xl">

- 副作用のないようにする
- 読み取り専用として扱う
- template 内ではデータを `computed` で使用する
</div>


## おまけ

`getter` と `setter` を持っていて関数のようにも扱えます。<br>
下記を参考にしてください。<br>
[書き込み可能な 算出関数](https://ja.vuejs.org/guide/essentials/computed#writable-computed)

---
layout: center
---

# Watch

---

# Watchとは

- リアクティブなデータの変化を監視し、変更があったときに特定の処理を実行します。

- **Watch**は副作用のある処理を実行する際に使います。

---


# 基本的な使い方


<Col2>
<template #left>

## 単体のデータを監視する

```vue
<script setup>
const count = ref(0);

// 引数を省略しない
watch(count, (new, old) => { // newだけでも可
  console.log(`${old}から${new}に変化`);
});

// 引数を省略
watch(count, () => {
  console.log(`${count.value}に変化`);
});

</script>
```

- `watch(監視対象, コールバック関数)` の形式で使用
- コールバック関数は、`新しい値`と`古い値`が引数
- 監視対象には、リアクティブなデータを指定
- 引数は省略可能

</template>
<template #right>

## 複数のデータを監視する

```vue
<script setup>

const firstName = ref('太郎');
const lastName = ref('山田');

watch(
  [firstName, lastName],
  ([newFirst, newLast], [oldFirst, oldLast]) => {
    console.log(`${oldFirst}${oldLast}から`);
    console.log(`${newFirst}${newLast}に変化`);
  }
);
</script>
```

- 複数のリアクティブなデータを同時に監視できます。
- 配列で監視対象を渡し、コールバック関数でも配列として新旧の値を受け取ります。


<div v-click>

### あんまりやらないかも。
</div>
</template>
</Col2>

---

<Col2>
<template #left>

# Problem

ログが出力されるタイミングはどうなるでしょうか？


```vue
<script setup>
const count = ref(0);
console.log('A');

watch(count, () => {
  console.log('B');
});

console.log('C');

onMounted(() => {
  console.log('D');
});
count.value++;
console.log('E');
</script>
```

<div v-click>

## Answer

immediate: false の場合のログの出力順序<br>
`A` -> `C` -> `E` -> `B` -> `D`

</div>
</template>
<template #right>

<div v-click>

## Why

1. `A` - vueがsetupされた時点で最初に実行
2. `C` - ウォッチャーの登録後、次の行で実行
3. `E` - `count.value++` の後に実行
4. `B` - `count.value` が変更されたため、ウォッチャーのコールバックが実行
5. `D` - `onMounted` フックは、レンダリングが完了した後に実行
</div>
</template>
</Col2>


---

# immediate オプション

watch にはオプションがあり、コールバック関数の実行タイミングを制御できます。

<Col2>
<template #left>

```vue { 6 }
<script setup>
const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log('初期値:', newValue);
}, { immediate: true });
</script>
```

- ウォッチャーを登録した直後にコールバック関数を即時実行します。

- つまりこのvueのコードが実行された時点で、`console.log('初期値:', newValue);` が実行されます。


</template>
<template #right>

<div v-click>

## Sample
<WatchImmediate />

</div>
</template>
</Col2>

---

<Col2>
<template #left>

# Problem

immediateがtrueの場合、ログが出力されるタイミングはどうなるでしょうか？


```vue
<script setup>
const count = ref(0);
console.log('A');

watch(count, () => {
  console.log('B');
}, { immediate: true });

console.log('C');
onMounted(() => {
  console.log('D');
});
count.value++;
console.log('E');
</script>
```

<div v-click>

## Answer

immediate: true の場合のログの出力順序<br>
`A` -> `B` -> `C` -> `E` -> `B` -> `D`

</div>
</template>
<template #right>

<div v-click>

## Why

1. `A` - vueがsetupされた時点で最初に実行
2. `B` - immediate: true により、ウォッチャーのコールバックが登録直後に実行
3. `C` - ウォッチャーの登録後、次の行で実行
4. `E` - count.value++ の後に実行
5. `B` - count.value の変更により、ウォッチャーのコールバックが再度実行
6. `D` - onMounted フックが最後に実行
</div>
</template>
</Col2>



---


# deep オプション

ネストしたプロパティの変更を検知するために使用します。

<Col2>
<template #left>


```vue
<script setup>
const user = ref({
  name: '太郎',
  address: {
    city: '東京'
  }
});

watch(user, (newVal, oldVal) => {
  console.log('userオブジェクトが更新されました');
}, { deep: true });

user.value.address.city = '大阪';
</script>
```

- リアクティブなオブジェクトで、`watch()`関数を呼び出すとき、暗黙的に`deep: true`で生成される。


</template>
<template #right>

<Alert type="warning">
パフォーマンスへの影響に注意<br>
監視対象のオブジェクトのネストされた全てのプロパティをトラバースするため<br>
大きなデータ構造で使用するときにはコストが高い
</Alert>


</template>
</Col2>

---
layout: center
---

# WatchEffect

---

# WatchEffectとは

- リアクティブな依存関係を自動的に追跡し、依存関係が変更されるたびにコールバックを再実行する。
- 依存関係のリストを手動で管理する必要がないため、コードが簡潔になります。
- ただし、`fetch`の失敗は依存関係の変更ではないため、`watchEffect`の再実行には影響しません。

<div v-click class="text-center text-[100px]">
🤔
</div>

---

# Problem
<Col2>
<template #left>

発火するのは`id`/`data`/`error`/`fetch`の<br>
どれが変更されたときに発火するでしょうか？

```vue
<script setup>
const item = ref('todos');
const id = ref(1);
const data = ref(null);
const error = ref(null);
watchEffect(async () => {
  try {
    const response = await fetch(
      `https://hoge.com/${item.value}?q=${id.value}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data.value = await response.json();
  } catch (err) {
    error.value = err.message;
  }
});
</script>
```

</template>
<template #right>

<div v-click>

## Answer

1. `item`が変更されたとき
2. `id`が変更されたとき

</div>

<div v-click>

## Why

- リアクティブな依存関係を自動的に追跡し、依存関係が変更されるたびにコールバックを再実行する。
- 依存関係のリストを手動で管理する必要がないため、コードが簡潔になる

</div>
</template>
</Col2>


---

# Watch vs WatchEffect

<VS>
<template #left-header>
Watch
</template>
<template #left>

<ul>
<li>
<strong>依存関係の管理</strong>:<br>
<span v-click=1>明示的に指定されたソースのみを監視</span>
</li>
<li>
<strong>実行タイミング</strong>:<br>
<span v-click=3>コールバックはソースが実際に変更されたときにのみ実行</span>
</li>
<li>
<strong>コードの構造</strong>:<br>
<span v-click=5>依存関係の追跡と副作用を分離して管理</span>
</li>
</ul>

</template>
<template #right-header>
WatchEffect
</template>
<template #right>

<ul>
<li>
<strong>依存関係の管理</strong>:<br>
<span v-click=2>method内にあるすべてのリアクティブプロパティを自動的に追跡</span>
</li>
<li>
<strong>実行タイミング</strong>:<br>
<span v-click=4>コールバックは即時実行され、その後依存関係が変更されるたびに実行</span>
</li>
<li>
<strong>コードの構造</strong>:<br>
<span v-click=5>依存関係の追跡と副作用が一体化されたシンプルな構造</span>
</li>
</ul>
</template>
</VS>

---
layout: center
---


<div class="flex flex-col justify-center items-center text-2xl">

# まとめ

### リアクティブデータの変化を監視し、副作用のある処理を実行する。
### `immediate` や `deep` オプションでウォッチャーの挙動を制御。

# 注意点

### 不要なウォッチを避ける
### パフォーマンスに影響する可能性があります。

### エラーハンドリング
### コールバック内のエラーはキャッチされないため、適切に処理すること。

</div>


---

# 練習問題

## Problem

以下のコードで `fullName` が更新されないのはなぜでしょうか？

```vue
<script setup>
import { ref, watch } from 'vue';

const firstName = ref('太郎');
const lastName = ref('山田');
const fullName = ref('');

watch(() => [firstName.value, lastName.value], () => {
  fullName.value = `${firstName.value} ${lastName.value}`;
});
</script>

<template>
  <p>{{ fullName }}</p>
  <button @click="firstName.value = '次郎'">名前を変更</button>
</template>
```

## Answer

- ウォッチャーで配列を監視する場合、デフォルトでは新旧の値の比較が浅い比較になるため、変更を検知できない。

- **解決策**: 配列を監視する場合は、`deep: true` オプションを追加する。

```vue
watch(() => [firstName.value, lastName.value], () => {
  fullName.value = `${firstName.value} ${lastName.value}`;
}, { deep: true });
```

---
layout: center
---

# まとめ

- ウォッチャーはリアクティブデータの変化を監視して副作用のある処理を実行するための機能です。
- ウォッチャーは強力な機能ですが、使いすぎるとコードが複雑になる可能性があります。

- まずは **算出プロパティ** や **メソッド** で対応できないか検討し、それでも難しい場合にウォッチャーを使用することをおすすめします。


---
layout: center
---

# 組み込みコンポーネント

<Col2>
<template #left>

## 組み込みコンポーネントとは

- Vue によって提供されるコンポーネントです。
- データを操作するためのコンポーネントです。



</template>
<template #right>

## 組み込みコンポーネント一覧

- `Transition`
- `TransitionGroup`
- `KeepAlive`
- `Teleport`
- `Suspense`

</template>
</Col2>


---
layout: center
---

# other

- `nextTick`
- `component`
- [フォールスルー属性](https://ja.vuejs.org/guide/components/attrs.html)
  カスタムcomponentができたら
