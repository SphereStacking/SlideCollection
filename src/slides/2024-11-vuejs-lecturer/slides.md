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
- スライドをすっきり見せるために、省略しているコードがあります。

<div class="flex justify-center h-1/2 items-center translate-y-1/4 ">
<logos-vue class="size-40" />
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
layout: cover
---

# ディレクティブ

---

## ディレクティブとは

<Col2 class="text-left">
<template #left>


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
  <img v-bind:src="imageSrc" v-bind:alt="imageAlt">

  <!-- 省略形 -->
  <img :src="imageSrc" :alt="imageAlt">
</template>

<script setup>
const imageSrc = ref('https://example.com/image.png');
const imageAlt = ref('サンプル画像');
</script>
```

- `:src="imageSrc"` は `imageSrc` の値を `src` 属性にバインドします。
- `:alt="imageAlt"` は `imageAlt` の値を `alt` 属性にバインドします。

---

# v-bind の様々なバインディング方法

<Col2 leftWidth="" rightWidth="">
<template #left>

```vue
<template>
  <!-- オブジェクト構文 -->
  <div :class="{activeClass: isActive,errorClass: isError}">
    コンテンツ
  </div>

  <!-- 配列構文 -->
  <div :class="[activeClass, errorClass]">
    コンテンツ
  </div>

  <!-- 組み合わせ -->
  <div :class="[
    { activeClass: isActive }, 
    errorClass
  ]">コンテンツ</div>
</template>

<script setup>
const isActive = ref(true);
const isError = ref(true);
const activeClass = 'text-green';
const errorClass = 'text-red';
</script>
```

</template>
<template #right>

## 様々なバインディングが可能
  - オブジェクト構文 (`true` のときに適用)
  - 配列構文
  - オブジェクト構文と配列構文を組み合わせ

</template>
</Col2>
---

# ここでクイズ！

<Col2>
<template #left>

## Problem

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

baseStyle と dynamicStyle を同じ div に適用すると、<br>
最終的にどうなるでしょうか？

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

### インラインハンドラー
  - 簡単なロジックや単純な状態変更に適しています。<br>
    <Alert type="note">
      複数の処理をインラインで記述すると、可読性が低下します！<br>
      テンプレート内にロジックを直接記述するのは避け<br>
      メソッドハンドラーを使用することをお勧めします。
    </Alert>

### メソッドハンドラー
  - コンポーネント内で定義された関数を呼び出します。
  - ネイティブの DOM イベントオブジェクトにアクセスできます。


### インラインハンドラー内でのメソッド呼び出し
  - 引数を渡すことで、柔軟なイベント処理が可能になります。

</template>
</Col2>

---

# イベント修飾子

 [event.preventDefault()](https://developer.mozilla.org/ja/docs/Web/API/Event/preventDefault) や [event.stopPropagation()](https://developer.mozilla.org/ja/docs/Web/API/Event/stopPropagation) のシンタックスシュガー

<Col2>
<template #left>

```vue {1-8|8}
<!-- イベントの伝搬を停止 -->
<a @click.stop="doThis">リンク</a>

<!-- ページリロードを防止 -->
<form @submit.prevent="onSubmit"></form>

<!-- 複数の修飾子を組み合せ -->
<a @click.stop.prevent="doThat">リンク</a>

<!-- 👇あんまり使わないので割愛 -->

<!-- イベントの伝搬を「親 -> 子」に変更   -->
<!-- 通常: 子 -> 親 の順で発火            -->
<div @click.capture="doThis">...</div>

<!-- クリックイベントは 1 度だけ呼ばれる -->
<a @click.once="doThis"></a>

<!-- スクロールの即時実行を可能に -->
<!-- イベントの処理を待たずに画面をスムーズにスクロール -->
<div @scroll.passive="onScroll">...</div>
```


</template>
<template #right>

## 主な修飾子
- `.stop` : イベントの伝搬を停止します。
- `.prevent` : イベントのデフォルト動作を防ぎます。
- `.self` : イベントが要素自体からのみ発火します。
- `.capture` : イベントをキャプチャフェーズで処理します。
- `.once` : イベントは1回だけ発火します。
- `.passive` : イベントのデフォルト動作を防ぎます。

<EventModifierExample class="mt-4" />

</template>
</Col2>

<Alert type="note" v-click=1 class="absolute top-10 right-2">

- イベント修飾子は、`.`で繋げて使用することも可能
- 複数の修飾子を組み合わせる場合は、順番に注意が必要
</Alert>

---

# キー修飾子

キーボードイベントを特定のキーに限定して処理します。

<Col2>
<template #left>

```vue
<!-- Enterキーが押されたときにsubmitメソッドを実行 -->
<input @keyup.enter="submit" />

<!-- Ctrl+Enterキーが押されたときにsubmitメソッドを実行 -->
<input @keyup.ctrl.enter="submit" />
```

<KeyModifierExample class="mt-4" />

</template>
<template #right>

## 主なキー修飾子
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

# システム修飾子

システムキー（Ctrl、Alt、Shift、Meta）と組み合わせてイベントを制御します。

<Col2 leftWidth="" rightWidth="">
<template #left>

```vue
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>

<!-- Alt + Enter -->
<button @keyup.alt.enter="doSomething">Do something</button>
```

<SystemModifierExample class="mt-4" />

</template>
<template #right>

## 主なシステム修飾子
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

<Alert type="note" class="mt-4">
MacとWindowsでのメタキーの違いに注意が必要です。
</Alert>

</template>
</Col2>

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
```

<MouseButtonModifierExample class="mt-4" />

</template>
<template #right>

## 主なマウスボタン修飾子
- `.left`
- `.right`
- `.middle`

<Alert type="note" class="mt-4">
修飾子は主に左利き用マウスに依存せず、「メイン」、「セカンダリ」、「補助」のボタンを示します。
</Alert>

</template>
</Col2>

---

# ここでクイズ！

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
layout: center
---
# イベントハンドリングのまとめ

- `v-on` と `@` を使用してDOMイベントを購読・処理する。
- インラインハンドラーはシンプルな操作に適し、メソッドハンドラーは複雑なロジックに適しています。
- イベント修飾子を活用することで、イベントのデフォルト動作や伝搬を簡単に制御できます。
- キー修飾子やシステム修飾子を使用して、特定のキーやシステムキーとの組み合わせでイベントを処理できます。
- マウスボタン修飾子を使用して、特定のマウスボタンに対するイベントを処理できます。



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

# 基本的な使い方

<Col2>
<template #left>

```vue
<template>
  <input v-model="message">
  <p>入力されたメッセージ: {{ message }}</p>
</template>

<script setup>
const message = ref('example');
</script>
```

- `v-model` を使用すると、入力フィールドとリアクティブな変数を同期できます。

</template>
<template #right>



<div class="flex flex-row justify-center items-center gap-4 mt-10">

<VModelExample />

</div>
</template>
</Col2>


---

# 内部的な仕組み

v-modelは実際には2つの操作を組み合わせた「シンタックスシュガー」です

- 値のバインディング（`:value`）
- 入力イベントのハンドリング（`@input`）

```vue
<template>
  <!-- v-model を使用した場合 -->
  <input v-model="message">

  <!-- 上記は内部的には以下と同じ -->
  <input
    :value="message"
    @input="message = $event.target.value"
  >
</template>
```

---


# 異なる入力タイプでの v-model の振る舞い

入力タイプによって、v-modelの内部的な変換が異なります

<div class="grid grid-cols-2 gap-4">

<div>

### テキスト入力とテキストエリア

```vue
<template>
  <input v-model="text">
  <input
    :value="text"
    @input="text = $event.target.value"
  >
</template>
```

</div>

<div>

### チェックボックス

```vue
<template>
  <input type="checkbox" v-model="checked">
  <input
    type="checkbox"
    :checked="checked"
    @change="checked = $event.target.checked"
  >
</template>
```
</div>

<div>

### ラジオボタン

```vue
<template>
  <input type="radio" v-model="picked" value="A">
  <input
    type="radio"
    :checked="picked === 'A'"
    @change="picked = $event.target.value"
  >
</template>
```
</div>

<div>

### セレクト

```vue
<template>
  <select v-model="selected">
  <select
    :value="selected"
    @change="selected = $event.target.value"
  >
</template>
```
</div>
</div>

---

# [組み込みの修飾子](https://ja.vuejs.org/guide/essentials/forms.html#modifiers)


### .lazy

<Col2>
<template #left>

<Alert type="default">
入力イベントではなく、`change` イベントで値を更新します。

```vue
<input v-model.lazy="message">
```
</Alert>

</template>
<template #right>

<VModelExampleModifierLazy class="mx-4"/>
</template>
</Col2>

### .number

<Col2>
<template #left>
<Alert type="default">
入力値を自動的に数値に変換します。

```vue
<input v-model.number="age" type="number">
```
</Alert>
</template>
<template #right>

<VModelExampleModifierNumber class="mx-4"/>
</template>
</Col2>

### .trim
<Col2>
<template #left>

<Alert type="default">
入力値の前後の空白を自動的に削除します。

```vue
<input v-model.trim="username">
```

</Alert>
</template>
<template #right>
<VModelExampleModifierTrim class="mx-4"/>
</template>
</Col2>

[カスタム修飾子](https://ja.vuejs.org/guide/components/v-model#handling-v-model-modifiers)を作成することも可能ですが、今回のスライドでは割愛します。



---

# コンポーネントでの v-model

- カスタムコンポーネントでも `v-model` を使用できます。
- コンポーネント側で `modelValue` と `update:modelValue` をハンドリングします。

<Col2 class="mt-10">
<template #left>

## 親コンポーネント

```vue
<template>
  <MyInput v-model="searchText" />
</template>

<script setup>
const searchText = ref('');
</script>
```

</template>
<template #right>

## 子コンポーネント (MyInput.vue)

```vue
<template>
  <input 
    :value="modelValue" 
    @input="handleInput"
  >
</template>

<script setup>
const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
```

</template>
</Col2>

---

# 複数の v-model バインディング

- 複数のプロパティをバインドする場合、`v-model:propName` を使用します。

<Col2>
<template #left>

## 親コンポーネント

```vue
<template>
  <MyComponent
    :title.sync="pageTitle"
    :content.sync="pageContent"
  />
</template>
```

</template>
<template #right>

## 子コンポーネント
```vue
<template>
  <div>
    <input 
      :value="title" 
      @input="handleTitleChange" 
    />
    <textarea 
      :value="content" 
      @input="handleContentChange"
    ></textarea>
  </div>
</template>
<script setup>
const handleTitleChange = (event) => {
  emit('update:title', event.target.value);
};
const handleContentChange = (event) => {
  emit('update:content', event.target.value);
};
</script>
```

</template>
</Col2>
---
layout: center
---

# まとめ

- `v-model` は双方向バインディングを簡潔に実現するためのディレクティブです。

- 修飾子を使って入力値を加工できます。

- カスタムコンポーネントでも `v-model` を活用できます。



---
layout: center
section: v-if_v-show
---

# v-if
# v-show

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

# ここでクイズ！

<Col2>
<template #left>

## Problem


```vue
<template>
  <div v-if="case === 1">case 1</div>
  <div v-else-if="case === 2">case 2</div>
  <div v-else>case 3</div>
</template>
```

- `v-if` の場合 (case=2) DOMはどうなる？

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

## Problem


```vue
<template>
  <div v-show="case === 1">case 1</div>
  <div v-show="case === 2">case 2</div>
  <div v-show="case === 3">case 3</div>
</template>
```

- `v-show` の場合 (case=3) DOMはどうなる？

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
layout: center
---

# v-ifとは?

- 条件に応じて要素をレンダリングするためのディレクティブです。

---

# 基本的な使い方

条件が `true` のときだけ要素が DOM に追加され、`false` のときは、要素は DOM から削除されます。


<Col2 class="mb-10">
<template #left>

```vue
<template>
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else-if="type === 'C'">C</div>
  <div v-else>Not A/B/C</div>
</template>

<script setup>
const type = ref('A');
</script>
```

</template>
<template #right>

### 描画結果

```html
<div>A</div>
<!---->
<!---->
<!---->
```


</template>
</Col2>

<Alert type="tip">

- `false` の時は、イベントリスナや子コンポーネントも一緒に破棄される
- 再度条件が `true` になったときに再作成されます。
</Alert>
---
layout: center
---

# v-showとは?

- 条件に応じて要素を表示/非表示するためのディレクティブです。

---

# 基本的な使い方

要素の `display` CSS プロパティを切り替え `true` のときだけ要素を表示し、`false` のときは非表示にする。


<Col2 class="mb-10">
<template #left>

```vue
<template>
  <div v-show="type === 'A'">A</div>
  <div v-show="type === 'B'">B</div>
  <div v-show="type === 'C'">C</div>
</template>

<script setup>
const type = ref('A');
</script>
```

</template>
<template #right>

### 描画結果

```html
<div style="display: block;">A</div>
<div style="display: none;">B</div>
<div style="display: none;">C</div>
```
</template>
</Col2>

<Alert type="tip">

- 要素の `display` CSS プロパティを切り替えます。
- 要素は常にレンダリングされて DOM に残るということです。
- `<template>` 要素をサポートしない
- `v-else` とは連動しない
</Alert>

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
  <span v-click=5>created や mounted などのライフサイクルフックが呼び出される。</span>
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

<Col2 class="mx-auto text-left mt-10">
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
layout: section
---

# v-for

参考 : 公式ドキュメント [リストレンダリング](https://ja.vuejs.org/guide/essentials/list)

---
layout: center
--- 

# v-for とは？

- 配列に基づいて項目のリストをレンダリングするためのディレクティブです。
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

# ここでクイズ！

<Col2>
<template #left>

## Problem

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
layout: cover
---

# 組み込み関数

---

# 組み込み関数とは？

<Col2>
<template #left>

- Vue によって提供される関数です。
- データを操作やライフサイクルフック時に特定の処理を実行するための関数です。

</template>
<template #right>

## 組み込み関数一覧

<div class="flex flex-wrap gap-2 font-700">
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">ref</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">reactive</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">computed</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">watch</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">watchEffect</Link>

  下記、ライフサイクルフックに関するものは次のセクションで解説します。
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onMounted</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onUnmounted</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onUpdated</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onBeforeMount</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onBeforeUnmount</Link>
  <Link class="bg-teal-400 text-black px-2 py-1 rounded-md">onBeforeUpdate</Link>
</div>
</template>
</Col2>

---
layout: section
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

</template>
</Col2>
<div class="mt-10" v-click>

## 大雑把にはデータにアクセスする際に `.value` をつけるかどうかの違い


</div>
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

# ここでクイズ！
## Problem

`reactive`を使用した下記コードを実行した際に、`name` の値はどうなるでしょうか？

```vue
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

   <div>
   両方とも`ジョン`
   </div>

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

# ここでクイズ！
## Problem

<div>
ではこの時どうやったら`name` の値はリアクティブになるでしょうか？
</div>

```vue
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
layout: section
---

# computed (算出プロパティ)

---
layout: center
---

# computed (算出プロパティ)


参考 : 公式ドキュメント [算出プロパティ](https://ja.vuejs.org/guide/essentials/computed)


---
layout: center
---

# 算出プロパティとは？

##### 算出プロパティとは、あるデータや別の算出プロパティから算出される新たなデータのことです。

<transform scale="5" v-click>
🤔
</transform>

---

# 算出プロパティの例

<Col2>
<template #header>

このようなデータがあったときに、平均年齢を算出したいとします。

```js
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
<span v-click=6>ボタンのクリックなどのユーザーアクションに応じて処理を行う場合に使用します。</span>
</li>
</ul>

</template>
</VS>

---

# ここでクイズ！
## Problem

<Col2>
<template #left>
<div>
 1~3は、1秒ごとにどうなるでしょうか？
</div>
```html
<div class="card">
  <div class="counter">
    count: {{ count }}
  </div>
  <div class="timestamp">
    <!-- 1. computed -->
    <div>{{ timestamp1 }}</div>
  </div>
  <div class="timestamp">
    <!-- 2. method -->
    <div>{{ timestamp2() }}</div>
  </div>
  <div class="timestamp">
    <!-- 3. ref computed -->
    <div>{{ timestamp3 }}</div>
  </div>
</div>
```
</template>
<template #right>


```js
const count = ref(0);
let timer;

//1.リアクティブな依存はない
const timestamp1 = computed(() => {
  return `Computed: ${Date.now()}`;
});
//2.リアクティブな依存はない
const timestamp2 = () => {
  return `Method: ${Date.now()}`;
};
//3.リアクティブな依存がある
const timestamp3 = computed(() => {
  return `Computed (${count.value}): ${Date.now()}`;
});
onMounted(() => { // 1sごとにcountをインクリメント
  timer = setInterval(() => {
    count.value++;
  }, 1000);
});
```

</template>
</Col2>

---


<Col2>
<template #left>

## Answer

<div v-click>

<ComputedVsMethodAnswer />
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
layout: section
---

# Watch

---
layout: center
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

# ここでクイズ

<Col2>
<template #left>

## Problem

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


</template>
<template #right>

<div v-click>

## Answer

immediate: false の場合のログの出力順序<br>
`A` -> `C` -> `E` -> `B` -> `D`

</div>

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

# ここでクイズ

<Col2>
<template #left>

## Problem

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


</template>
<template #right>

<div v-click>

## Answer

immediate: true の場合のログの出力順序<br>
`A` -> `B` -> `C` -> `E` -> `B` -> `D`

</div>

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
layout: section
---

# WatchEffect

---
layout: center
---

# WatchEffectとは

- リアクティブな依存関係を自動的に追跡し、依存関係が変更されるたびにコールバックを再実行する。
- 依存関係のリストを手動で管理する必要がないため、コードが簡潔になります。
- ただし、`fetch`の失敗は依存関係の変更ではないため、`watchEffect`の再実行には影響しません。

<div v-click class="text-center text-[100px]">
🤔
</div>

---

# ここでクイズ

<Col2>
<template #left>

## Problem

<div>
<code>item</code>,<code>id</code>,<code>data</code>,<code>error</code>,<code>fetch</code>のどれが変更されたときに<code>watchEffect</code>が発火するでしょうか？
</div>

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

# まとめ

- リアクティブデータの変化を監視し、副作用のある処理を実行する。
- `immediate` や `deep` オプションでウォッチャーの挙動を制御。

# 注意点

- 不要なウォッチを避ける
- パフォーマンスに影響する可能性があります。
- コールバック内のエラーはキャッチされないため、適切に処理すること。


---

# ここでクイズ

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
layout: section
---

# ライフサイクル

---
layout: center
---

# ライフサイクルとは
 
<br>
Vueインスタンスが生成されてから破棄されるまでの一連のプロセスを指します。<br>
<br>
各ライフサイクルステージで特定のフックが呼び出され、<br>
開発者はこれらのフックを利用して、コンポーネントの状態を管理したり、<br>
特定の処理を実行したりすることができます。


---
clicks: 4
---

# Vue ライフサイクル

<div class="w-4/12">
<div v-if="$clicks === 0">

  #### **setup** (Vue 3 のみ)

  <Alert type="note">
  <code>beforeCreate</code>や<code>created</code>フックの前に実行され、これらのフックを置き換えることができる。
  </Alert>


  #### **beforeCreate**

  <Alert type="caution">
    <strong>初期化</strong>される直前に呼び出される。<br>
    <strong>データ・メソッド</strong>などはまだ用意されてない
  </Alert>

  #### **Init Options API**

  <Alert type="tip">
  Options APIを使用しているコンポーネントを初期化する。
  </Alert>

  #### **created**

  <Alert type="caution">
    <strong>初期化</strong>された後に呼び出される。<br>
    <strong>DOM はまだ生成されていない</strong>。
  </Alert>

</div>

<div v-if="$clicks === 1">

  #### **Has pre-compiled template**

  <Alert type="important">
   Vueコンポーネントが事前にコンパイルされたテンプレートを持っているかどうか
  </Alert>

  #### **Compile template**

  <Alert type="tip">
  テンプレートを仮想DOMに変換するためにコンパイルを行います。
  </Alert>

  **開発モード**は**Compile template**は**false**になり、リアルタイムでコンパイルされ。<br>
  **本番モード**では**事前コンパイル**されたテンプレートが使用される。
</div>


<div v-if="$clicks === 2">

  #### **beforeMount**

  <Alert type="caution">
    <strong>仮想DOM</strong>の準備が完了した段階で呼び出される。<br>
    まだ、<strong>DOM</strong>にはマウントされていない。
  </Alert>

  #### **initial render**

  <Alert type="tip">
    <strong>DOM</strong>ノードを作成し、<strong>DOM</strong>に挿入する。
  </Alert>

  #### **mounted**

  <Alert type="caution">
    <strong>DOM</strong>にマウントされた後に呼び出される。<br>
  </Alert>

</div>

<div v-if="$clicks === 3">

  #### **beforeUpdate**

  <Alert type="caution">
    データが変更され、<strong>再描画</strong>が走る直前に呼び出される。<br>
    変更前のデータや DOM 状態を確認できるため、更新前にログを取ったり
    フラグを立てたりする場合に便利。
  </Alert>

  #### **re-render and patch**

  <Alert type="tip">
    変更があった部分だけを<strong>DOM</strong>を更新する。
  </Alert>

  #### **updated**

  <Alert type="caution">
    データの変更によって <strong>再描画</strong>された直後に呼び出される。<br>
    変更後の DOM やデータを使って、<strong>画面の状態を確認</strong>したり、
    再レンダリング後に実行する処理を入れたりできる。
  </Alert>

</div>

<div v-if="$clicks === 4">

  #### **beforeUnmount**

  <Alert type="caution">
    インスタンスが<strong>破棄される直前</strong>に呼び出される。<br>
    イベントリスナーの解除やタイマーのクリアなど、
    <strong>クリーンアップ処理</strong>を行うのに適している。
  </Alert>

  #### **unmounted**

  <Alert type="caution">
    インスタンスが<strong>破棄された後</strong>に呼び出される。<br>
    この段階ではインスタンスは完全に破棄され、
    <strong>再利用が不可能</strong>なので注意。
  </Alert>

</div>
</div>


<img
  class="w-8/12 absolute top-0 right-0 pl-10"
  v-motion
  :enter="final"
  :initial="{ y: 10 }"
  :click-1="{ y: -200 }"
  :click-2="{ y: -400 }"
  :click-3="{ y: -500 }"
  :click-4="{ y: -600 }"
  src="./images/lifecycle.png" alt="lifecycle">

<div
 v-motion
 :enter="final"
 :initial="{ x: 360, y: 80, width: 390, height: 245 }"
 :click-1="{ x: 550, y: 85, width: 350, height: 210 }"
 :click-2="{ x: 360, y: 80, width: 410, height: 300 }"
 :click-3="{ x: 700, y: 70, width: 280, height: 300 }"
 :click-4="{ x: 360, y: 160, width: 420, height: 230 }"
 class="absolute top-0 left-0 border-6 border-yellow-200"/>


<script setup lang="ts">
const final = {
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    mass: 2
  }
}
</script>

---
layout: center
---

# ライフサイクルをどのように使うか

---

# onBeforeMount
コンポーネントがマウントされる直前に呼び出されます。まだ実際の DOM は構築されていません。
<Col2>
<template #left>

## example
```vue
<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  console.log('コンポーネントがマウントされる直前です')
  // まだDOMは存在しないので、document.querySelectorなどはNG
})
</script>

<template>
  <div>onBeforeMount Sample</div>
</template>
```

</template>
<template #right>

## 概要
- コンポーネントの描画準備やログ出力など、軽量な処理。
- DOM にアクセスする処理はできないため注意。

</template>
</Col2>


---

# onMounted
コンポーネントのテンプレートが実際の DOM にマウントされた後に呼び出されます。

<Col2>
<template #left>

## example
```vue
<script setup>
import { ref, onMounted } from 'vue'

const el = ref(null)

onMounted(() => {
  // el.value には <div ref="el"> が代入されている
  console.log('DOMにマウントされました', el.value)
})
</script>

<template>
  <div ref="el">onMounted Sample</div>
</template>

```

</template>
<template #right>

## 概要
- DOM 操作（document.querySelector や el.value へのアクセスなど）が必要な処理。
- サードパーティライブラリの初期化、API呼び出し後のグラフ描画等。

<Alert type="note">
このフックはSSR時には呼び出されません。
</Alert>
</template>
</Col2>

---

# onBeforeUpdate
データの変更によって再レンダリング（DOM 更新）が走る直前に呼び出されます。

<Col2>
<template #left>

## example
```vue
<script setup>
import { ref, onBeforeUpdate } from 'vue'

const count = ref(0)

onBeforeUpdate(() => {
  console.log('再レンダリング前。現在のcountは', count.value)
})

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

</template>
<template #right>

- 更新前のデータや DOM 状態を参照してログを取得したり、フラグを立てたりする。
- 例えば「前回の表示からどう変化したかを比較する」「更新直前にアニメーション開始」など。

</template>
</Col2>


---

# onBeforeUpdate

コンポーネントがリアクティブな状態変更により DOM ツリーを更新しようとする直前に呼び出されるフックを登録します。

<Col2>
<template #left>

## example
```vue
<script setup>
import { ref, onBeforeUpdate } from 'vue'

const count = ref(0)

onBeforeUpdate(() => {
  console.log('再レンダリング前。現在のcountは', count.value)
})

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

</template>
<template #right>

## 概要
- 更新前のデータや DOM 状態を参照してログを取得したり、フラグを立てたりする。
- 例えば「前回の表示からどう変化したかを比較する」「更新直前にアニメーション開始」など。

</template>
</Col2>

---

# onUpdated
データの変更によって DOM が再レンダリングされた直後に呼び出されます。

<Col2>
<template #left>

## example
```vue
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  console.log('再レンダリング後。新しいcountは', count.value)
})

function increment() {
  count.value++
}
</script>

<template>
  <div>
    <p>{{ count }}</p>
    <button @click="increment">+1</button>
  </div>
</template>

```

</template>
<template #right>

## 概要
- 更新後の DOM を操作したい場合（スクロール位置を調整したり、アニメーションの終了タイミングを合わせたり）。
- "変更された後の状態"を使ってログを残したいとき。


</template>
</Col2>


---

# onBeforeUnmount
コンポーネントインスタンスがアンマウント（破棄）される直前に呼び出されます。

<Col2>
<template #left>

## example
```vue
<script setup>
import { onBeforeUnmount } from 'vue'

onBeforeUnmount(() => {
  console.log('コンポーネントが破棄される直前です')
  // イベントリスナーの解除などを実行
})
</script>

<template>
  <div>onBeforeUnmount Sample</div>
</template>
```

</template>
<template #right>

## 概要
- クリーンアップ処理（イベントリスナー解除、WebSocket切断、タイマークリアなど）。
- まだコンポーネントは生きているので、内部データへアクセスして必要な情報を取り出すことも可能。

</template>
</Col2>


---

# onUnmounted
コンポーネントが完全に破棄された後に呼び出されます。

<Col2>
<template #left>

## example
```vue
<script setup>
import { onUnmounted } from 'vue'

onUnmounted(() => {
  console.log('コンポーネントが破棄されました')
  // ここでは既に this は無効
  // 何か最終的なログをとりたい場合など
})
</script>

<template>
  <div>onUnmounted Sample</div>
</template>
```

</template>
<template #right>

## 概要
- 破棄された後なので、Vueインスタンス（this）にはもうアクセスできません。
- 基本的には onBeforeUnmount のタイミングで行う処理が多いですが、破棄直後のフックが欲しい場合に利用。

</template>
</Col2>

---

# onErrorCaptured

子コンポーネントや下位階層で発生したエラーが親コンポーネントまで伝搬する際、途中で捕捉可能。
<Col2>
<template #left>

## example
```vue
<script setup>
import { onErrorCaptured } from 'vue'

onErrorCaptured((err, instance, info) => {
  console.error('捕捉したエラー:', err)
  console.log('エラーが起きたインスタンス:', instance)
  console.log('追加情報:', info)
  // false を返すとエラーがこれ以上親コンポーネントに伝搬しなくなる
  return false
})
</script>

<template>
  <div>onErrorCaptured Sample</div>
</template>

```

</template>
<template #right>

## 概要
- 特定のコンポーネント階層でエラーを補足し、エラーを握りつぶしたり独自処理（ログ送信など）をしたいとき。
- 戻り値を false にすると、それ以上エラーが伝搬しなくなる。
</template>
</Col2>

---

# その他のフック

### onRenderTracked (デバッグ用)
レンダリングの依存追跡をデバッグするためのフック。

### onRenderTriggered (デバッグ用)
レンダリングのトリガーされた原因をデバッグするためのフック。

### onActivated
コンポーネントがアクティブになったときに呼び出される。

### onDeactivated
コンポーネントが非アクティブになったときに呼び出される。

### onServerPrefetch
SSR 環境でのプリフェッチ用フック。サーバーサイドでのデータ取得など。

---
layout: center
---

# まとめ

- マウント前後 (onBeforeMount / onMounted)
- DOM に触れない準備 → 実際に DOM を操作する
- 更新前後 (onBeforeUpdate / onUpdated)
- 変更前の状態を参照 → 変更後の状態に基づく処理
- アンマウント前後 (onBeforeUnmount / onUnmounted)
- 破棄前のクリーンアップ → 破棄直後のフック
- エラー捕捉 (onErrorCaptured)
- 子孫コンポーネントで起きたエラーをキャプチャ
- その他のフック
- レンダリングのデバッグ用 (onRenderTracked / onRenderTriggered)
- SSR専用のデータ取得など (onServerPrefetch)

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

# 組み込みコンポーネント一覧

Vue には以下の組み込みコンポーネントが提供されています。

- Transition
- TransitionGroup
- component
- KeepAlive
- Teleport
- Suspense

---

# Transition
要素やコンポーネントが**表示・非表示**になるタイミングでアニメーションを付与するためのコンポーネントです。

<Col2>
<template #left>

## Example
```vue
<template>
  <transition name="fade">
    <p v-if="show">Hello Transition!</p>
  </transition>

  <button @click="show = !show">Toggle</button>
</template>

<script setup>
const show = ref(false)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
```
</template>
<template #right>

## 概要
- **enter / leave** のタイミングでクラスを付与し、CSSアニメーション・トランジションを適用。
- Vue特有のフックを利用して、JSアニメーションや外部ライブラリとの連携も可能。
- コンテンツの表示切り替え（`v-if`/`v-show` など）時に利用。

<ComponentTransitionExample class="h-1/4" />

</template>
</Col2>

---

# TransitionGroup
**複数要素の並び替えや追加・削除**に対してアニメーションを適用できるコンポーネントです。

<Col2>
<template #left>

## Example
```vue
<template>
  <transition-group name="list">
    <div v-for="item in items" :key="item.id">
      <span>{{ item.text }}</span>
    </div>
  </transition-group>
</template>
<style scoped>
.list-move,.list-enter-active,.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
</style>
```

</template>
<template #right>

## 概要
- 複数要素をラップし、並び替えや追加・削除時に個々の要素をアニメーション可能。
- `tag` 属性でラッパーの要素を指定（デフォルトは `span`）。
- 要素にはユニークな `key` が必須。

<ComponentTransitionGroupExample class="min-h-1/4" />
 
</template>
</Col2>

---

# component
動的コンポーネントや動的な要素をレンダリングするための「メタ・コンポーネント」です。

<Col2>
<template #left>

## Example
```vue
<template>
  <!-- ボタンクリックでコンポーネントを切り替え -->
  <button @click="currentView = 'ViewA'">View A</button>
  <button @click="currentView = 'ViewB'">View B</button>

  <!-- :is で実際にレンダリングするコンポーネントを指定 -->
  <component :is="views[currentView]" />
</template>

<script setup>
import ViewA from './ViewA.vue'
import ViewB from './ViewB.vue'

const currentView = ref('ViewA')

const views = { ViewA, ViewB }
</script>
```

</template>
<template #right>

## 概要
- `:is` プロパティに指定したコンポーネントをレンダリング
- 文字列(コンポーネント名)またはコンポーネント定義を渡し、動的なコンポーネントの切り替えが可能

<ComponentComponentExample class="mt-2" />
</template>
</Col2>

---

# KeepAlive
動的に切り替えるコンポーネントの状態を**キャッシュ**し、再表示を高速化するためのコンポーネントです。

<Col2>
<template #left>

## Example
```vue
<template>
  <!-- ボタンクリックでコンポーネントを切り替え -->
  <button @click="currentView = 'ViewA'">View A</button>
  <button @click="currentView = 'ViewB'">View B</button>

  <!-- KeepAliveでラップしコンポーネントの状態をキャッシュ -->
  <keep-alive>
    <component :is="views[currentView]"></component>
  </keep-alive>
</template>

<script setup>
import ViewA from './ViewA.vue'
import ViewB from './ViewB.vue'

const currentView = ref('ViewA')

const views = { ViewA, ViewB }
</script>
```

</template>
<template #right>

## 概要
- コンポーネントを切り替えても**破棄されず**、状態が保持される
- フォーム入力やタブ切り替えなど、再表示時に以前の状態を残したい場合に有効
- `include` / `exclude` でキャッシュ対象を制御可能

<ComponentKeepAliveExample class="mt-2" />
</template>
</Col2>

---

# Teleport
コンポーネントの一部を**別のDOM要素（通常はルート外の要素）**に挿入できるコンポーネントです。

<Col2>
<template #left>

## Example
```vue
<template>
  <teleport to="#teleport-target">
    <div class="modal">
      モーダルの中身
    </div>
  </teleport>
</template>

<!-- HTML側で #teleport-target を用意しておく -->
<!-- <div id="teleport-target"></div> -->
```

</template>
<template #right>

## 概要
- Vueコンポーネントの**レンダリングロジック**はそのままに、描画先のみを別DOMツリーへ移す。
- モーダルやツールチップなど、レイアウト階層に依存せずに画面最前面や特定領域に表示したい場合に有効。
- `to` 属性で**ターゲット要素**を指定。存在しない場合はDOM要素を自動生成する。

<!-- <ComponentTeleportExample /> -->

</template>
</Col2>

---

# Suspense
**非同期コンポーネントを扱う際の読み込み中表示**などを簡単に扱えるコンポーネントです。

<Col2>
<template #left>

## Example
```vue
<template>
  <Suspense>
    <template #default>
      <!-- 非同期のコンポーネントを読み込んでいる想定 -->
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('./MyComponent.vue'))
    }, 2000)
  })
})
</script>
```

</template>
<template #right>

## 概要
- `Suspense` 内のコンポーネントが**解決されるまで**、`fallback` スロットを表示。
- 複数の非同期コンポーネントをまとめて待ち受けられる。
- 使える環境は Vue 3+ で、SSR 時などにも便利。

<!-- <ComponentSuspenseExample /> -->

</template>
</Col2>

---

## まとめ

- **Transition / TransitionGroup**  
  - 要素の表示・非表示やリスト操作に対してアニメーションを付けるコンポーネント。
- **component**  
  - 動的にコンポーネントを切り替えるコンポーネント。
- **KeepAlive**  
  - 切り替えられ  るコンポーネントをキャッシュし、破棄を防いで再表示を高速化。
- **Teleport**  
  - コンポーネントの一部を別DOM要素へ"テレポート"して描画する。
- **Suspense**  
  - 非同期コンポーネントを扱う際の「待機中のフォールバック表示」をシンプルにする。

---
layout: center
---

# その他の重要な機能

- `nextTick`
- [フォールスルー属性](https://ja.vuejs.org/guide/components/attrs.html)
  カスタムcomponentができたら


---
layout: section
---

# nextTick

---
layout: center
---

# まずは! Vue.js のデータ更新とDOM 更新の関係について

<div v-click class="mt-5">

### データ更新とDOM更新は非同期

- データを更新しても、DOMはすぐには更新されない
- DOMの更新は、**次の更新サイクル**まで待つ必要がある
- 同じメソッド内でデータ更新行いDOMを参照した場合、古いDOMを参照してしまう
</div>

<div v-click class="absolute top-40 right-10">
  <div class="flex flex-col items-center gap-2">
    <span class="text-8xl">🤔</span>
    <span class="text-6xl">？？</span>
  </div>
</div>

<div v-click class="mt-5">   

### 例えると...

データの更新とDOMの更新の関係は以下のようなものです。
1. **「料理の注文（データ更新）」**  
2. **「料理の完成（DOM更新）」**  
3. **「料理を食べる（DOM更新後のアクション）」**  

<Alert type="tip" class="mt-5">
注文をしても、料理はすぐには出来上がらないため、食べることができません。<br>
<code>nextTick</code>は「料理が出来上がるまで待ってください」という指示です
</Alert>


</div>
---

# nextTick とは？
DOMの更新を待ち合わせるための機能

<Col2 >
<template #left>



## 基本的な使い方

`nextTick` を `await` してDOMの更新を待ち合わせする

<div v-click class="mt-10">
  <span class="text-8xl">🤔</span>
  <span class="text-6xl">？？</span>
</div>

<div v-click class="mt-10">
 実際の例を見てみましょう
</div>



</template>
<template #right>

```vue
<script setup>
/** 変数宣言は省略 */

async function increment() {
  count.value++

  // DOM はまだ更新されていない
  console.log(counterRef.value?.textContent) // 0が出力

  await nextTick()

  // ここでは DOM が更新されている
  console.log(counterRef.value?.textContent) // 1が出力
}
</script>

<template>
  <button ref="counterRef" @click="increment">
    {{ count }}
  </button>
</template>
```


</template>
</Col2>

---

# nextTick 使用例１
動的コンテンツの高さ計測

<Col2>
<template #left>
```vue {all|6}
<script setup lang="ts">
/** 変数宣言は省略 */

async function measureHeight() {
  content.value = 'こちらは\n何度計測しても\n同じ結果になります'
  await nextTick() // これがないと古いDOMを参照してしまう
  height.value = boxRef.value.offsetHeight
}

function resetMeasurement() {
  content.value = initialContent
  height.value = initialHeight
}
</script>

<template>
  <div>
    <div ref="boxRef" > {{ content }} </div>
    <div>Height: {{ height }}px</div>
    <button @click="measureHeight">高さ計測</button>
  </div>
</template>

```

</template>
<template #right>

<Alert type="tip" class="mb-5">
DOMの更新が完了した後にDOMを参照することができる。
</Alert>

<div class="flex flex-col gap-2 h-full">
  <div>
    <h4>nextTick あり</h4>
    <DOMMeasurementWithTick />
  </div>
  <div>
    <h4>nextTick なし</h4>
    <DOMMeasurementWithoutTick />
  </div>
</div>
</template>
</Col2>

---

# nextTick 使用例２
フォーカス制御

<Col2>
  <template #left>

```vue {all|6}
<script setup lang="ts">
/** 変数宣言は省略 */

async function showAndFocusInput() {
  isInputVisible.value = true
  await nextTick() // これがないと、inputにfocusされない
  inputRef.value?.focus()
}
</script>

<template>
  <div>
    <template v-if="isInputVisible">
      <input ref="inputRef" type="text" 
        placeholder="フォーカスされます">
    </template>
    <button @click="showAndFocusInput">
      {{ isInputVisible ? 'Hide Input' : 'Show Input' }}
    </button>
  </div>
</template>

```
  </template>
  <template #right>

<Alert type="tip" class="mb-5">
DOMの更新が完了した後にフォーカスを制御することができる。
</Alert>

<div class="flex flex-col gap-2 h-full">
  <div >
    <h4>nextTick あり</h4>
    <FocusControlWithTick />
  </div>
  <div>
    <h4>nextTick なし</h4>
    <FocusControlWithoutTick />
  </div>
</div>
  </template>
</Col2>

---
layout: section
---

# フォールスルー属性

---
layout: center
---

# フォールスルー属性とは？

- 自動的に**ルート要素**へ `$attrs` を転送する仕組み

---

# フォールスルー属性の流れ

<Col2>
<template #left>

<ol>
<li v-click=1>
属性を渡す

```vue
<MyInput id="hoge" type="text" label="テキスト" />
```

</li>
<li v-click=4>

最終的に以下のように属性が反映されます  

```html
<div id="hoge"> <!-- idがルート要素に適用されている -->
  <label>テキスト</label>
  <input type="text" />
</div>
```

<Alert v-click type="tip" class="mt-5">
<code>props</code>に定義していない属性は<br>
自動的にルート要素に転送される
</Alert>

</li>
</ol>

</template>
<template #right>

<div v-click=2 class="bg-gray/10 p-5 rounded-lg">
  <div>

  ### `MyInput` コンポーネントの実装

```vue
<script setup>
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, required: true }
})
</script>
<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" />
  </div>
</template>
```

<Alert type="tip" class="mt-2">
<code>type</code>と<code>label</code>は<code>props</code>として明示的に定義している
</Alert>

<Col2 class="mt-5">
<template #left>

<div v-click=3>

### Problem
<div>
<code>id</code>はどうなるでしょうか？
</div>
</div>

</template>
<template #right>

<div v-click=4>

### Answer
<div>
ルート要素に適用
</div>
</div>
</template>
</Col2>

</div>
</div>

</template>
</Col2>

---
layout: statement
---


# めっちゃ便利！！


---

# ここでクイズ！

<Col2>
<template #left>

## Problem

input要素に<code>placeholder</code>を適用したい場合<br>
どのようにしますか？



``` {monaco}
<!-- MyInput.vue -->
<script setup>
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, required: true }
})
</script>
<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" />
  </div>
</template>
```

<div class="card-example p-2 mt-5">
  <MyInput label="ラベルだよ" placeholder="こうしたい" />
</div>

</template>
<template #right>

## Answer

<v-click>

### 

```vue {5,11}
<script setup>
defineProps({
  type: { type: String, default: 'text' },
  label: { type: String, required: true },
  placeholder: { type: String, required: true }
})
</script>
<template>
  <div>
    <label>{{ label }}</label>
    <input :type="type" :placeholder="placeholder" />
  </div>
</template>
```

</v-click>
</template>
</Col2>


---
layout: statement
---

# 毎回`props`の定義が
# 必要なのはちょっと面倒

---
layout: statement
---

# これを解決するために
# `$attrs` を理解しておきましょう

---
layout: center
---


<Col2 
  leftWidth="w-5/12" 
  rightWidth="w-7/12"
  v-motion
  :enter="{ x: 200 }"
  :click-1="{ x: 200 }"
  :click-2="{ x: 0 }"
>
<template #left>

# `$attrs` とは？

- 親コンポーネントから子コンポーネントに渡された  
  属性やイベントリスナーを含むオブジェクト

  <Alert type="warning">
    注意: <code>props</code> として定義されているものは除く
  </Alert>

<div v-click class="flex flex-row items-center mt-10">
  <span class="text-8xl">🤔</span>
  <span class="text-6xl">？？</span>
</div>

</template>
<template #right>

<div v-click>

## 宅配便で例えると 📦

</div>

<div v-click>

1. 親コンポーネントは宅配業者さん 🚚  
   複数の荷物（属性）を配達してきます

2. 子コンポーネントは受取人 👤  
   - `props`で指定した荷物は自分宛てなので開封 
   - その他の荷物は同居人宛てなので、`$attrs`という箱に保管

</div>


</template>
</Col2>

---

# `$attrs` 

<Col2>
<template #left>

<ol>
<li v-click=1>
属性を渡す例

```vue
<MyInput 
  id="hoge" type="text" label="テキスト" 
  placeholder="こうしたい" />
```

</li>
<li v-click=3>

`$attrs` の内容は以下の通りです

```json
{ id: 'hoge', type: 'text', placeholder: 'こうしたい' }
```

</li>
<li v-click=4>

子コンポーネントで `v-bind="$attrs"` を使用すると

```html
<input v-bind="$attrs" />
```
</li>
<li v-click=5>

最終的に以下のように属性が反映されます

```html
<div>
  <label>テキスト</label>
  <input id="hoge" type="text" />
</div>
```
</li>
</ol>

</template>
<template #right>

<div v-click=2 class="bg-gray/10 p-5 rounded-lg">
  <div>

  ### `MyInput` コンポーネント

```vue {all}
<script setup>
defineProps({
  label: { type: String, required: true },

  // これらは 必要なくなる
  // type: { type: String, default: 'text' },
  // placeholder: { type: String, required: true }
})
</script>
<template>
  <div>
    <label>{{ label }}</label>
    <input v-bind="$attrs" />
  </div>
</template>
```

  <Alert type="tip" class="mt-2">

  - `label` は `props` として定義しているため、  
    `$attrs` には含まれません

  </Alert>
</div>
</div>

</template>
</Col2>

---


# `inheritAttrs: false` を設定した場合

<Col2>
<template #left>

## 基本的な動作

- デフォルトでは、`props`として定義されていない属性は自動的にルート要素に転送される
- `inheritAttrs: false` を設定すると、この自動転送が無効になる
- 属性を手動で制御したい場合に使用する

```vue
<script>
// 自動転送を無効化
export default {
  inheritAttrs: false
}
</script>
```

</template>
<template #right>

## ユースケース

```vue
<script setup>
defineProps({ label: String })
</script>

<template>
  <div class="wrapper">
    <!-- input要素に属性を転送 -->
    <input v-bind="$attrs">
    <!-- label要素にはclassだけ適用 -->
    <label :class="$attrs.class">
      {{ label }}
    </label>
  </div>
</template>
```

<Alert type="tip">
複数の要素に対して、属性を個別に制御したい場合に便利です。
</Alert>

</template>
</Col2>

---
layout: center
---

## まとめ

### フォールスルー属性
- 親から子へ属性を渡す際、`props`定義していない属性は自動的にルート要素へ転送
- `v-bind="$attrs"`で任意の要素に属性を転送可能

### 実践的な使い方
- 必要な属性のみを親から渡す
- 複雑な制御が必要な場合は`inheritAttrs: false`を活用
- ルート要素の構造変更に注意

<Alert type="tip">
フォールスルー属性を活用することで、コード量を削減しつつ柔軟なコンポーネント設計が可能になります。
</Alert>
