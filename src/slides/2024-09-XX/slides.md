---
theme: seriph
background: https://cover.sli.dev
title: Sentryでの非推奨イベント起因のエラーについての調査
info: |
  Sentryへ通知された非推奨イベントのエラー解決に苦労した話
class: text-center
drawings:
  persist: false
transition: fade-out
mdc: true
meta:
  slug: sentry-deprecation
  date: '2024-09'
  event: TechSync
  description: Sentryへ通知された非推奨イベントのエラー解決に苦労した話
  icon: simple-icons:sentry
  published: false
  legacyPath: 2024-09-XX
---

# Sentryへ通知された非推奨イベントのエラー解決に苦労した話

所属会社 TechSync用スライド

2024/09/08

@SphereStacking

---
src: ../../components/slides/profile_2024.md
transition: slide-up
---

---
transition: slide-up
---

# 今回共有すること

Chromeのsupport終了する非推奨のイベントリスナーの使用に関して
調査した際の手順や結果を共有します。

---
transition: slide-up
---

# 非推奨のイベントリスナーについて

|  | 1日 | 30日 |
| ---------------- | -------- | -------- |
| unload           | 10K  | 300K |
| DOM Mutation Events | 1K | 17K |


## 修正が必要な理由

それぞれのイベントが非推奨で今後ブラウザの機能として削除されるため<br>
特に mutation イベントは 2024/07/23 に削除される

- 参考
  - [Chrome からミューテーション イベントが削除されます](https://developer.chrome.com/blog/mutation-events-deprecation?hl=ja)
  - [アンロード イベントの非推奨](https://developer.chrome.com/docs/web-platform/deprecating-unload?hl=ja)



---
transition: slide-up
---

# Unloadイベント

## 発生原因

[pendo](https://jp.pendo.io/)というツールの設定により、ページのunloadイベントが発火する


## 特定に至るまでの経過

1. ブラウザのデバッグツールで読み込んでいるスクリプトの全体検索
  -> その中に`unload`イベントがあることを確認
3. pendoのスクリプトを読み込んでいる箇所を特定
4. 該当スクリプトの読み込み箇所を削除して検証
  -> エラーが発生しなくなることを確認（原因の特定！）
5. pendo社のサポートに問い合わせ
  -> 回答を受けて設定変更
7. 実施検証
  -> エラーが発生しなくなることを確認

---
transition: slide-up
---

# Mutationイベント

## 発生原因

ブラウザ拡張機能起因によりエラーが発生していた。

## 特定に至るまでの経過

1. ブラウザのデバッグツールで読み込んでいるスクリプトの全体検索
  ->見つからない



---
transition: slide-up
---

# 原因の特定まで時間をかけた要因

## 

拡張機能起因のstacktraceが「Discarded invalid value」と表示されエラーの発生源につながる情報が欠落していた

---
transition: slide-up
---

# 通知内容が「Discarded invalid value」となる問題
拡張機能起因のstacktraceが欠落する

非推奨エラーがSentryに送付されて出てきてたけど

別PJのSentryへは「Discarded invalid value」とならずに正常に情報が送付されていることが発覚

Sentryのバージョンが古いことが原因？ということでバージョン間での挙動の違いを検証した

---
transition: slide-up
---


# 基準環境

<div class="flex flex-row gap-4 mt-2">

  <div class="w-1/2">
  

  - Nuxt 2.15.8
  
  </div>
  <div class="w-1/2 ">
    <blockquote>
      <p>
        <a href="https://github.com/SphereStacking/SentryDeprecationCheckVersionComparison">
          SphereStacking/SentryDeprecationCheckVersionComparison
        </a>
      </p>
    </blockquote>
  </div>
</div>


<div class="flex flex-row gap-4 mt-2">

<div class="w-1/2">

# 検証環境 1

- Nuxt 2.15.2
- @nuxtjs/sentry 5.1.5
- @sentry/tracing 6.15.0

</div>

<div class="w-1/2">

# 検証環境 2

- Nuxt 2.15.8
- @nuxtjs/sentry ^5.1.5
- @sentry/tracing ^6.15.0

^ つけると次のメジャーバージョン未満の最新バージョンにアップデートされる。


</div>


</div>

---
transition: slide-up
---

# 検証手順

<div class="flex flex-row gap-4 text-sm">
  <div class="w-1/2">
    <ol>
      <li>各ページにエラーを送信するボタンを配置</li>
      <li>ボタンを押してエラーを送信</li>
      <li>拡張機能を使用してエラーを再現</li>
    </ol>

  </div>
  <div class="w-1/2">
    Unloadイベントが登録される拡張機能をインストール(2024/05/18時点)
    <div class="flex flex-row gap-4 bg-gray-300 p-1 rounded-md items-center justify-center">
      <img src="https://lh3.googleusercontent.com/gv45XN4Rmea0bEKcHwMQoprLIDAgF2COzgaLoOmkIuu8FHjyM9ndhhxLTN9IQJUfmi35NEuAb5ShxIKKPSauwwEG=s60"alt="Google Chromeのスーパードラッグ のアイテムロゴ画像">
      <a class="text-black" href="https://chromewebstore.google.com/detail/google-chrome%E3%81%AE%E3%82%B9%E3%83%BC%E3%83%91%E3%83%BC%E3%83%89%E3%83%A9%E3%83%83%E3%82%B0/dlknjglebgomjjfaijjnebecgjbfjihk?hl=ja">Chrome拡張機能スーパードラッグ</a>
    </div>
  </div>
</div>

<div class="flex flex-row gap-4 mt-2 bg-gray-700 p-2 rounded-md justify-center">
  <div class="w-1/2">
    <p>検証コード 非推奨イベントを登録するコード</p>

  ```vue
  <template>
    <div>
      1
      <button @click="handleClick">
        Test Error Capture Exception
      </button>
      <button @click="addEventListenerUnload">
        Test Unload
      </button>
      <a href="/">
        Test Error Capture Exception
      </a>
    </div>
  </template>
  ```


  </div>
  <div class="w-1/2">

  ```vue
  <script>
  export default {
    methods: {
      handleClick() {
        console.log('handleClick')
        this.$sentry.captureException(
          new Error('Sentry test error')
        );
      },
      addEventListenerUnload() {
        window.addEventListener('unload', () => {
          console.log('unload')
        })
      }
    }
  }
  </script>
  ```

  </div>
</div>





