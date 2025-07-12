# ut.code(); Learn準拠サンプルプロジェクト

ut.code(); Learnに準拠したサンプルプロジェクトです。

# 要点

開発環境と本番環境での差異を意識する必要があります。

- フロントエンド
  - 開発環境：Viteの開発用サーバー
  - 本番環境：Viteにより出力されたHTML・CSS・JavaScriptファイル群
- バックエンド
  - 開発環境：今回は`ts-node`を使用（トランスパイルをしつつ実行できる）
  - 本番環境：TypeScriptのトランスパイラ（`tsc`）により出力されたJavaScriptファイル群

# このリポジトリを作成した手順

1. 次のとおりに実行する

   ```shell
   $ npm create vite@latest

   > npx
   > create-vite

   │
   ◇  Project name:
   │  frontend
   │
   ◇  Select a framework:
   │  React
   │
   ◇  Select a variant:
   │  TypeScript
   │
   ◇  Scaffolding project in /home/user/projects/utcode-learn-template/frontend...
   │
   └  Done. Now run:

     cd frontend
     npm install
     npm run dev

   $ cd frontend
   $ npm install
   $ cd ..
   $ mkdir backend
   $ cd backend
   $ npm init
   $ npm install express cors
   $ npm install -D typescript ts-node @types/express @types/cors
   $ npx tsc --init
   $ npx prisma init
   ```

1. `/frontend/.env`を作成して、`VITE_API_ENDPOINT`を`http://localhost:3000`に設定する
1. `/backend/.env`で`WEB_ORIGIN`を`http://localhost:5173`に設定し、`DATABASE_URL`も設定する
1. `/backend/prisma/schema.prisma`の内容をデータベースに反映させるために`npx prisma db push`を実行する
1. `/backend/tsconfig.json`の`outDir`オプションを`./dist`にしてトランスパイル結果が`/backend/dist`に入るようにする
1. `/backend/tsconfig.json`の`allowJs`オプションを`true`にしてPrismaが生成したJavaScriptファイルをトランスパイル結果に含めるようにする
1. `/backend/dist`を`/backend/.gitignore`に追加する
1. `/backend/package.json`を変更して次のコマンドが使えるようにする
   - `npm run dev`：`ts-node`を使ってトランスパイル前のTypeScriptを直接実行する（開発環境用）
   - `npm run build`：`tsc`を使ってTypeScriptをJavaScriptにトランスパイルする
   - `npm start`：`tsc`によって出力されたJavaScriptを実行する（本番環境用）

# 使い方

- Expressの起動：`cd backend && npm run dev`
- Viteの開発用サーバーの起動：`cd frontend && npm run dev`
