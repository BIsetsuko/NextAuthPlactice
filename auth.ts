import NextAuth, { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

// どのようなプロバイダでAuth認証ををしていくかを設定する
export const config: NextAuthConfig = {
  providers: [Github({clientId: process.env.AUTH_GITHUB_ID, clientSecret: process.env.AUTH_GITHUB_SECRET})],
  basePath: "/api/auth", // あとで作るAPIのエンドポイントを指定
  callbacks: {
    // 認証完了後の処置を記述
    authorized({ request, auth }) {
      //認証しているかどうかを確認してページを表示するかどうかを判断する（ミドルウェア的な）
      try {
        // 認証済みの場合のみ表示させるページ（認証していない場合は、認証ページにリダイレクトという方法もありそう）
        const { pathname } = request.nextUrl;
        // !!で強制的に真偽値のtrueかfalseを返す ＝ authの中に値があるかどうかで判断
        // 機能させるにはmiddlewareを設定する → ./middleware.ts
        if (pathname === "/protected-page") return !!auth;
        // trueを返しているので他のページは認証なしで表示できる
        return true;
      } catch (err) {
        console.log(err);
      }
    },
    jwt({ token, trigger, session }) {
      // ユーザーが更新された場合の処理
      if (trigger === "update") {
        // Tokenの名前を更新する
        token.name = session.user.name;
      }
      // 最新のTokenを返す
      return token;
    },
  },
};

// NextAuthに引数でconfigを渡すと下記が使えるようになる
// handlers あとでAPIを作る際に使う
// auth サーバサイドでのsession(認証情報)を取得するため必要
// signIn サインイン用の関数
// signOut サインアウト用の関数
export const { handlers, auth, signIn, signOut } = NextAuth(config);

// 今回は７行目でbasePathを/api/authに設定しているので、app/api/auth/[...nextauth]にファイルを作成する
// スプレッド構文の[...nextauth]は、エンドポイントの拡張みたいなもので、api/auth/以下の全てのファイルが対象になる（catch-all segmentsのところ）
// api/auth/hogehogeのようなAPIを裏で叩けて、「こういうAPIは全部NextAuthに任せて」という意味になる

// 今回はGithubの認証を使っているので、SECRET_KEYやCLIENT_IDなどの情報を環境変数に入れる必要がある

// 6行目のGithubでClient IDとClient Secretを取得する

// envファイルのAUTH_SECRETとAUTH_URLを設定

// HederのUserButtonコンポーネントでログイン認証を実装する

// app/page.tsxでsession情報を表示させる（サーバサイド）

// Headerコンポーネントでアバターを表示させり、ユーザー情報を表示させる
// ログアウトボタンを押すとログアウトできるようにする

// app/client-example/page.tsxでsession情報を取得し表示させる（クライアントサイド）