# sample-app

システム部門研修で作成した TODO アプリです。

## 概要

このアプリでは、TODO の追加・一覧表示・完了切替・削除ができます。
フロントエンドは `public/index.html`、バックエンドは Express、データ保存は SQLite を使っています。

## 主な機能

- TODO 一覧表示
- TODO 追加
- TODO 完了状態の切り替え
- TODO 削除
- SQLite によるデータ永続化
- タイトルのバリデーション
- Vitest による API 結合テスト

## ディレクトリ構成

```text
sample-app/
├── practice/
│   ├── db.ts
│   ├── error-example.ts
│   ├── fetch-example.ts
│   ├── index.ts
│   ├── todo.ts
│   ├── validate.test.ts
│   └── validate.ts
├── public/
│   └── index.html
├── src/
│   ├── application/
│   │   └── todo/
│   │       └── service.ts
│   ├── domain/
│   │   └── todo/
│   │       ├── types.ts
│   │       └── validate.ts
│   ├── infrastructure/
│   │   └── todo/
│   │       └── repository.ts
│   ├── presentation/
│   │   └── server.ts
│   └── api.test.ts
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── package-lock.json
├── package.json
├── practice.db
├── README.md
├── todo.db
└── tsconfig.json
```

## セットアップ

```bash
npm install
```

## サーバー起動

```bash
npx tsx src/presentation/server.ts
```

起動後、ブラウザで次を開きます。

```text
http://localhost:3000
```

## API の動作確認

サーバーを起動したまま、別のターミナルで実行します。

```bash
curl http://localhost:3000/api/todos
```

```bash
curl -X POST -H "Content-Type: application/json" -d '{"title":"APIによるテスト"}' http://localhost:3000/api/todos
```

PUT と DELETE は、POST のレスポンスに表示された `id` に置き換えて実行します。
たとえば POST のレスポンスが `{"id":3,"title":"APIによるテスト","done":false}` なら、次の `1` を `3` に置き換えます。

```bash
curl -X PUT http://localhost:3000/api/todos/3
```

```bash
curl -X DELETE http://localhost:3000/api/todos/3
```

## テスト

API の結合テストは、サーバーを起動した状態で実行します。
まず1つ目のターミナルでサーバーを起動します。

```bash
npx tsx src/presentation/server.ts
```

次に、別のターミナルでテストを実行します。

```bash
npx vitest run
```

## 整形・静的チェック

```bash
npx prettier --write src/ public/
npx eslint src/
```