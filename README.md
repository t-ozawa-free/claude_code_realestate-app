# realestate-app

Supabase認証機能付きの不動産管理Webアプリです。

- 本番URL: https://claude-code-realestate-app-delta.vercel.app

## 主な機能

- メールアドレス＋パスワードによる会員登録・ログイン・ログアウト
- 未ログイン時は自動的にログイン画面にリダイレクト
- 物件の一覧表示・新規登録・編集・削除(自分が登録した物件のみ操作可能)

## 技術スタック

- React + Vite
- Supabase(認証・データベース、Row Level Securityによるアクセス制御)
- react-router-dom

## セットアップ

```bash
npm install
```

プロジェクトルートに`.env`を作成し、SupabaseプロジェクトのURLと公開キーを設定します。

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb-publishable-your-key
```

Supabaseの「SQL Editor」で[supabase/sql/001_create_properties_table.sql](supabase/sql/001_create_properties_table.sql)を実行し、`properties`テーブルとRLSポリシーを作成します。

## 開発

```bash
npm run dev     # 開発サーバーを起動
npm run build   # 本番用ビルド
npm run lint    # Lint実行
```

## デプロイ

Vercelにホスティングしています。SPAとして動作するよう、[vercel.json](vercel.json)で全URLへのアクセスを`index.html`にリライトする設定を行っています。環境変数(`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`)はVercelダッシュボード側で設定してください。
