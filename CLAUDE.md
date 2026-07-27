# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

- プロジェクト名: realestate-app
- 内容: 不動産管理アプリケーション
- GitHubリポジトリ: https://github.com/t-ozawa-free/claude_code_realestate-app.git

## 技術スタック

- React + Vite
- Supabase(メール・パスワード認証、データベース、RLS)
- react-router-dom(ルーティング)

## よく使うコマンド

- `npm run dev`: 開発サーバーを起動
- `npm run build`: 本番用ビルド
- `npm run lint`: oxlintによるLint

## アーキテクチャ

- `src/supabaseClient.js`: Supabaseクライアント。接続情報は`.env`(`VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY`)で管理し、Gitには含めない
- `src/context/AuthContext.jsx`: ログイン状態(セッション)をアプリ全体で共有する認証コンテキスト
- `src/components/ProtectedRoute.jsx`: 未ログイン時に`/login`へリダイレクトするルートガード
- `src/pages/`: `Login.jsx` / `Signup.jsx` / `PropertyList.jsx`(物件一覧・登録・編集・削除)
- `src/components/PropertyForm.jsx` / `PropertyCard.jsx`: 物件の入力フォームとカード表示
- `supabase/sql/`: Supabaseのテーブル定義・RLSポリシーのSQL。スキーマ変更時はここに追記し、Supabase SQL Editorで実行する
- 物件データはSupabaseの`properties`テーブルに保存し、RLSにより自分(`user_id`)が登録した物件のみ操作可能

## デプロイ情報

- 本番URL: https://claude-code-realestate-app-delta.vercel.app
- Supabaseプロジェクト名: realestate-app
- Vercelでホスティングし、`vercel.json`で全URLを`index.html`にリライトするSPA設定を行っている
- 環境変数はVercelダッシュボード側で設定する(vercel.jsonには含めない)

## Git運用ルール

- コードを変更するたびに、変更内容をコミットしGitHubリポジトリにプッシュすること。
- コミットメッセージは日本語で記述すること。
