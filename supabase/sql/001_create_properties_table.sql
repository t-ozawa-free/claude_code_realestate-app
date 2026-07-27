-- 物件情報を管理するテーブル
-- 物件名・家賃(円)・エリア名・間取りと、登録したユーザーのIDを保存する
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- user_idでの絞り込み(RLSのポリシー評価)を高速化するためのインデックス
create index if not exists properties_user_id_idx on public.properties (user_id);

-- RLS(行単位セキュリティ)を有効化する
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "Select own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 自分のuser_idでのみ物件を登録できる
create policy "Insert own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Update own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Delete own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
