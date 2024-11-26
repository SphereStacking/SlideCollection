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

<div class="mb-4 absolute bottom-4 left-12">
  <span class="text-6xl text-primary-lighter text-opacity-80" style="font-weight:500;" >
    Hands-on
  </span>
  <div class="text-9xl text-primary text-opacity-60" style="font-weight:600;" >
    Vue.js
  </div> 
</div>


---
layout: image-left
image: 'https://cover.sli.dev'
---

# 目次

<Toc maxDepth="1"/>

---
layout: center
---

# このスライドの概要

- vue.jsを使っているけど、なんとなくで特に意識せずに書いている人が対象です。
- 公式ドキュメントを読んでいても、なんとなくで読み飛ばしてしまったけど著者が重要かなと思ったことをピックアップしています。

---

# 前提
<Col2>
<template #left>

- HTML / CSS / JavaScript の知識がある程度あること
- vue を少しでも触ったことがあること
- docker を使ったことがあること

- import文は省略しています

</template>
<template #right>

### やること
- script setup での書き方
- ディレクティブのちょっとしたtips

### やらないこと

- 基本的な vue 構文について
- options API について
- css について
- docker について
</template>
</Col2>


---
layout: center
---

# リアクティブな変数について

- ref
- reactive 

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

<template #footer>

<div class="text-center" v-click>

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

下記のコードを実行した際に、`name` の値はどうなるでしょうか？

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
  <transform v-click class="" scale="5">
  🤔
  </transform>
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
layout: fact
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

# 条件分岐による表示制御

- v-if
- v-show


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
<transform scale="4" class="w-1/5 -mt-20" v-click>
🤔 
</transform>
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
  <div style="display: none;">case 3</div>
</template>
```

</div>
</template>
</Col2>

---
layout: fact
---

## `v-if` は DOM を操作する

<br>

## `v-show` は style の display を操作する

---

# [v-if vs v-show](https://ja.vuejs.org/guide/essentials/conditional#v-if-vs-v-show)

- `v-if`
  - 初期表示において状態が false の場合、何もしない。  
  - 条件が最初に true になるまでレンダリングされない。
  - より高い切り替えコストを持っている

- `v-show`
  - 要素は初期条件に関わらず常にレンダリングされ、
    シンプルな CSS ベースの切り替え。
  - より高い初期レンダリングコストを持っている


---
layout: fact
---

## まとめ

- とても頻繁に何かを切り替える必要があれば `v-show` を選ぶ
- 条件が実行時に変更することがほとんどない場合は、`v-if` 選ぶ

---
layout: center
---

# リストレンダリング

- v-for

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


</template>
<template #right>

<div v-click>

## Answer

エラーが throw されます。

</div>

<div v-click>

## Why

<transform scale="5">
🤔
</transform>

- `v-for` よりも `v-if` のほうが優先順位が高くなります。

つまり同じノードで処理が開始された場合、`v-if` が先に評価され次に `v-for` が評価されるため、`v-if` で使用している `todo.isComplete` が未定義となりエラーとなります。


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
layout: fact
---

## まとめ

- `v-for` と `v-if` は同時に使わない
- `v-for` では `key` 属性を指定する

---
layout: center
---

# 算出プロパティ

---
layout: center
---

# ウォッチャー


---
layout: center
---

# props と v-bind(:) の仕組み


---
layout: center
---

# event(@) と emit の仕組み


---
layout: center
---

# v-model の仕組み

