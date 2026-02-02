---
theme: seriph
title: 職務経歴書
info: |
  職務経歴書
transition: slide-up
layout: intro
hideInToc: true
fonts:
  sans: 'Robot'
  serif: 'Robot Slab'
  mono: 'Fira Code'
themeConfig:
  primary: 'rgb(187, 255, 204, 1)'
meta:
  slug: work-history
  description: 職務経歴書
  icon: hugeicons:work-history
  published: true
  hidden: true
  legacyPath: work-history
seoMeta:
  ogImage: auto
---

<div class="mb-4 absolute bottom-4 left-12">
  <span class="text-6xl text-primary-lighter text-opacity-80" style="font-weight:500;" >
    職務経歴書
  </span>
  <div class="text-9xl text-primary text-opacity-60" style="font-weight:600;" >
    Work History
  </div> 
</div>


---
layout: image-left
image: 'https://cover.sli.dev'
---

# 目次

<Toc maxDepth="1"/>

---

# ナレッジ

<Knowledge />

---
layout: fact
---

# 職務経歴書 詳細

<div class="flex justify-center">
  <div class="flex flex-col gap-2 w-4/6">
    <div class="flex gap-2">
      <div class="text-nowrap w-1/4">2016/04 ～ 2023/08</div>
      <div class="text-nowrap w-3/4"><CompanyName1 /></div>
    </div>
    <div class="flex gap-2">
      <div class="text-nowrap w-1/4">2023/08 ～ 現在</div>
      <div class="text-nowrap w-3/4"><CompanyName2 /></div>
    </div>
  </div>
</div>

---


## メール配信共通基盤開発 (2024/05 ～ 現在)
### <CompanyName2 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2024/03 ～ 現在</p>
    <p>コアシステムに内包されていたメール配信機能のリプレイスに対応。</p>
    <p>設計が完了した段階でプロジェクトに参画しました。<br>特定のシステムに依存していたことや、パフォーマンス面への考慮、拡張性が不足している点を指摘</p>
    <p>
    その後、データベース設計の見直しや、現行の処理件数の数値化、並列処理の導入などを提案し、パフォーマンスの最適化に向けた改善を行っています。
    </p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <img src="https://skillicons.dev/icons?i=laravel" alt="Laravel Logo" width="30" height="30"/>
        <img src="https://cdn.svgporn.com/logos/sendgrid.svg" alt="SendGrid Logo" width="30" height="30"/>
        <img src="https://skillicons.dev/icons?i=aws" alt="AWS Logo" width="30" height="30"/>
        <img src="https://cdn.svgporn.com/logos/aws-sqs.svg" alt="AWS SQS Logo" width="30" height="30"/>
        <img src="https://cdn.svgporn.com/logos/aws-lambda.svg" alt="AWS Lambda Logo" width="30" height="30"/>
        <img src="https://skillicons.dev/icons?i=docker" alt="Docker Logo" width="30" height="30"/>
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>10万件/日</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>4人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>開発 / テスト / パフォーマンスチューニング</td>
    </tr>
  </table>
</div>


---

## リポジトリ内の秘匿情報の移行対応

### <CompanyName2 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2023/09 ～ 2024/04</p>
    <p>リポジトリに直書きされていた秘匿情報をマスクし、環境変数に移行することでセキュリティ強化を実施しました。</p>
    <p>影響範囲の少ない箇所から段階的にリリース計画を策定し、ユーザーへの影響やバグを発生させることなく、すべての秘匿情報の移行を完了させました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="laravel" />
        <SkilIcon skill="aws" />
        <SkilIcon skill="python" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>全体で約900件</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>5人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>作業リーダー</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>開発</td>
    </tr>
  </table>
</div>

---

## 中小企業DX支援プラットフォームの開発

### <CompanyName2 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2023/08 ～ 現在</p>
    <p>ビジネスマッチング、チャット機能、安否確認ホームページ、福利厚生サイトなど、複数の機能追加とバグ修正に携わり、DX推進を支援しています。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="fuelphp" />
        <SkilIcon skill="laravel" />
        <SkilIcon skill="vue" />
        <SkilIcon skill="go" />
        <SkilIcon skill="nuxt" />
        <SkilIcon skill="vuetify" />
        <SkilIcon skill="docker" />
        <SkilIcon skill="aws" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>6万社(22万人)</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>25人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>開発</td>
    </tr>
  </table>
</div>

---

## 企業HPのリニューアル
### <CompanyName1 />


<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2022/10 ～ 2022/11</p>
    <p>既存の企業HPは生のHTMLで作成されており、デザインが非常に古く、不正サイトのような印象を与えていました。</p>
    <p>これにより、企業の信頼性が損なわれていたため、ブランディング強化を目的に、サイトのリニューアルを提案・実施しました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="php" />
        <SkilIcon skill="wordpress" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>小規模</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>2人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発補助</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>技術選定 / 要件ヒアリング / 開発</td>
    </tr>
  </table>
</div>

---

## 民間小型衛星 管制WEBサービス開発
### <CompanyName1 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2022/03 ～ 2022/09</p>
    <p>既存のAPIサーバーを基盤に、フロントエンド開発を担当しました。</p>
    <p>WebSocketを活用し、リアルタイムで受信した衛星の監視データを工学値に変換し、画面上に表示する機能を実装しました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="angular" />
        <SkilIcon skill="docker" />
        <SkilIcon skill="bootstrap" />
        <SkilIcon skill="winui" />
        <SkilIcon skill="wpf" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>中規模</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>1人(+他社4人)</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>要件ヒアリング / 開発</td>
    </tr>
  </table>
</div>

---

## 衛星試験装置の制御SW開発 
### <CompanyName1 />


<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2021/04 ～ 2023/07</p>
    <p>計測装置を事前に設定したパラメータで自動制御するソフトウェアの開発を担当しました。</p>
    <p>通信プロトコルの策定を行い、接点信号を用いた制御と通信制御の双方を実装しました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="windows" />
        <SkilIcon skill="sqlserver" />
        <SkilIcon skill="dotnet" />
        <SkilIcon skill="cs" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td></td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>4人(+他社10人)</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>基本設計 / 詳細設計 / 開発 / テスト仕様書の作成 / テスト実施</td>
    </tr>
  </table>
</div>

---

## 社内業務支援WEBサービスの開発 
### <CompanyName1 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2020/04 ～ 2023/07</p>
    <p>社内環境の整備が不十分で、管理コストが増大していたため、上層部に改善案を提案しました。</p>
    <p>業務フロー全体の見直しを行い従来は紙やExcelで管理されていた申請書、資産管理、文書管理、プロジェクト管理、案件管理などをデジタル化した基幹WEBシステムを開発し、社内工数の大幅な削減を実現しました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="windows" />
        <SkilIcon skill="postgresql" />
        <SkilIcon skill="laravel" />
        <SkilIcon skill="vue" />
        <SkilIcon skill="aws" />
        <SkilIcon skill="docker" />
        <SkilIcon skill="tailwind" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>100人程が使用</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>1人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>プロジェクトリーダー 開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当フェーズ</td>
      <td>要件定義 / プログラミング / システムメンテナンス / 機能追加 / システム改修 / ユーザーからの問い合わせ対応 / 障害対応</td>
    </tr>
  </table>
</div>

---

## ロケット射場設備 民間小型ロケット管制整備
### <CompanyName1 />
<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2020/04 ～ 2023/07</p>
    <p>射場全体の整備を請け負い、開発を行った。SW開発を担当しました。</p>
    <p>SW開発は2社のベンダーとの連携が必要であり、そのための調整やコミュニケーションを行いつつ開発を行いました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="windows" />
        <SkilIcon skill="dotnet" />
        <SkilIcon skill="cs" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>4拠点 請負</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>10人+(2社ベンダー)</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>技術選定 / ベンダーコントロール / 要件定義書の作成 / 基本設計書の作成 / 詳細設計書の作成 / 開発 / テスト仕様書の作成 / テスト実施 / 機能追加 / システム改修</td>
    </tr>
  </table>
</div>

---

## 新規地上局整備に伴う人工衛星追跡 管制ソフト開発
### <CompanyName1 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2019/06 ～ 2021/10</p>
    <p>SW開発の初期段階から参画し、工場試験までを担当する予定でしたが、機能追加や調整作業にも積極的に取り組みました。</p>
    <p>その結果、客先から高く評価され、インテグレーション試験ではSW部門の現場リーダーを任されました。試験手順書の作成、現場対応、そして試験計画の立案から実施までを主導しました。</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="windows" />
        <SkilIcon skill="dotnet" />
        <SkilIcon skill="cs" />
        <SkilIcon skill="cpp" />
        <SkilIcon skill="cs" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>1拠点 請負</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>3人+他社20人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当、インテグレーション試験 SW現場責任者</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>詳細設計 / 開発 / テスト仕様書の作成 / テスト実施 / システムメンテナンス / 機能追加 / ユーザーからの問い合わせ対応 / 障害対応</td>
    </tr>
  </table>
</div>

---

## 人工衛星追跡局 保守/運用/開発/SW・HW更新
### <CompanyName1 />

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2016/05 ～ 2023/07</p>
    <p>30年運用されているシステムのHW更新に伴うSWの更新作業を実施した。監視制御信号を接点からLAN信号への変更に伴う通信プロトコルの変更</p>
    <p>監視衛星追加にともなうシステムアップデート対応</p>
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="linux" />
        <SkilIcon skill="cpp" />
        <SkilIcon skill="cs" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>5拠点 請負</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>2人+他社20人</td>
    </tr>
    <tr>
      <td class="text-nowrap">職務</td>
      <td>開発担当</td>
    </tr>
    <tr>
      <td class="text-nowrap">担当業務</td>
      <td>システムメンテナンス / 機能追加 / システム改修 / テスト仕様書の作成 / テスト実施 / ユーザーからの問い合わせ対応 / 障害対応</td>
    </tr>
  </table>
</div>

---
layout: fact
---

# 業務外活動

---

## VRイベント共有サービス「HollowShelfie」

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2023/11 ～ 現在</p>
    <a href="https://hollowshelfie.com/">HollowShelfie</a>
    <p>ポスターと人を主軸に置いたイベント共有サービス  様々な条件から<span class="text-red-500">AND</span>x<span class="text-red-500">OR</span>x<span class="text-red-500">NOT</span> で検索を行うことができる</p>
    <ul>
      <li>2024/6/9 サービス公開</li>
      <li>2024/7/31 登録ユーザー数100人突破</li>
      <li>2024/8/14 メディアサイト<a href="https://metacul-frontier.com/?p=14478">「メタカル最前線」</a>に掲載</li>
      <li>2024/8/23 所属会社のLTで登壇 <a href="https://spherestacking.github.io/SlideCollection/2024-08-23">スライド</a></li>
    </ul>
    
  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="laravel" />
        <SkilIcon skill="jetstream" />
        <SkilIcon skill="sail" />
        <SkilIcon skill="inertia" />
        <SkilIcon skill="scout" />
        <SkilIcon skill="socialite" />
        <SkilIcon skill="telescope" />
        <SkilIcon skill="pint" />
        <SkilIcon skill="meilisearch" />
        <SkilIcon skill="vue" />
        <SkilIcon skill="tailwind" />
        <SkilIcon skill="tiptap" />
        <SkilIcon skill="swiperjs" />
        <SkilIcon skill="cloudflare" />
        <SkilIcon skill="sentry" />
        <SkilIcon skill="googleanalytics" />
        <SkilIcon skill="googledevelopers" />
        <SkilIcon skill="docker" />
        <SkilIcon skill="digitalocean" />
        <SkilIcon skill="forge" />
        <SkilIcon skill="postgresql" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>個人開発</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>1人</td>
    </tr>
    <tr>
      <td class="text-nowrap">役割</td>
      <td>プロジェクトリーダー</td>
    </tr>
    <tr>
      <td>担当<br>フェーズ</td>
      <td>企画 / 開発 / デザイン / 運用</td>
    </tr>
  </table>
</div>

---

## タスクの依頼管理 Slack App 

<div class="grid grid-cols-2 gap-4">
  <div>
    <p>2023/09 ～ 現在</p>
    <p>タスクの依頼をslackのformから行い自分が依頼したタスク依頼されたタスクを一覧で表示し定期的なリマインドを行うことができるアプリ</p>
    <p>ランニングコストをfreeにするためGASで構築</p>

  </div>
  <table>
    <tr>
      <td class="text-nowrap">技術スタック</td>
      <td class="flex gap-2 flex-wrap">
        <SkilIcon skill="slack" />
        <SkilIcon skill="googledevelopers" />
        <SkilIcon skill="spreadsheet" />
      </td>
    </tr>
    <tr>
      <td class="text-nowrap">規模感</td>
      <td>個人開発</td>
    </tr>
    <tr>
      <td class="text-nowrap">チーム</td>
      <td>1人</td>
    </tr>
    <tr>
      <td class="text-nowrap">役割</td>
      <td>プロジェクトリーダー</td>
    </tr>
    <tr>
      <td>担当<br>フェーズ</td>
      <td>企画 / 開発 / 運用</td>
    </tr>
  </table>
</div>


---

# 意欲・興味

私の強みが最も発揮されるのは、以下のような環境やプロジェクトに取り組んでいるときです。

<div class="grid grid-cols-2 gap-4">
  <div class="flex flex-col gap-2">
    <div>
      <h4 class="text-lg font-black">本質を捉えた開発</h4>
      <p> <span>機能要件の策定段階から積極的に提案し、ユーザー視点で最適なソリューションを提供するとき</span>
      <span>ユーザーのニーズを考え、UI/UXを重視した使いやすいプロダクトの開発に取り組むとき</span></p>
    </div>
    <div>
      <h4 class="text-lg font-black">チームメンバーとのナレッジ共有</h4>
      <p><span>ペアプログラミングやモブプログラミングを通じて技術を共有し、暗黙知を形式知化するプロセスに取り組むとき</span></p>
    </div>
    <div>
      <h4 class="text-lg font-black">開発環境の最適化</h4>
      <p><span>効率的な開発プロセスを構築し、ツールや環境を継続的に改善して生産性向上を図るとき</span></p>
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <div>
      <h4 class="text-lg font-black">技術的挑戦と成長</h4>
      <p><span>新技術の導入や技術負債の解消に積極的に取り組むとき</span>
      <span>最新技術をキャッチアップし、新たな技術領域に挑戦するとき</span></p>
    </div>
    <div>
      <h4 class="text-lg font-black">価値創造とプロダクト開発</h4>
      <p><span>社会に貢献できる意義あるプロダクトの開発に情熱を持って取り組むとき</span>
      <span>設計から実装まで、全工程に裁量をもって手を動かすとき</span></p>
    </div>
    <div>
      <h4 class="text-lg font-black">プリファレンス</h4>
      <p><span>人事やマネジメント業務よりも、技術的な課題解決や実装に集中できるとき</span></p>
    </div>
  </div>
</div>


---

# 自己PR


<div>
私の強みは、実行力と行動力です。

前職では、社内環境の整備不足により管理コストが増大している状況を改善するため、自ら上層部に提案を行いました。業務フロー全体を見直し、申請書や資産管理、プロジェクト管理などを統合した基幹WEBシステムを構築し、大幅な工数削減を実現しました。

また、入社当初はソフトウェアのバージョン管理がExcelで行われており、人為的なミスによるバックデートが発生していました。これを解決するため、セルフホストのGitLabを導入し、バージョン管理の効率化と信頼性向上に貢献しました。

新しい技術や情報に対して常にアンテナを張り、興味を持ったものはすぐに手を動かして習得しています。

現職では、プロジェクトにおいて常に最適な解決策を模索し、データを収集・分析して改善提案を行っています。

</div>


---
layout: image-left
image: 'https://cover.sli.dev'
---

# アウトプット

- [https://github.com/SphereStacking](https://github.com/SphereStacking)
- [https://qiita.com/sphere-stacking](https://qiita.com/sphere-stacking)
- [https://spherestacking.github.io/SlideCollection/](https://spherestacking.github.io/SlideCollection/)

