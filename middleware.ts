// リクエストが完了する前の中間処理（ミドルウェア）を設定する

// これでauth.tsのauthorizedの処理を使えるようになる
// この１行だけだと全ページに発火されるので、ページごとに設定する必要がある
export { auth as middleware } from "@/auth";

// ルーティングの制限を設定する
export const config = {
  // matcher: "/profile", // /profileページのみmiddleware適用
  // matcher: "/profile:", // /profile/hogehogeなど動的ページにmiddleware適用
  matcher: [
    // 正規表現で指定することも可能(Nextjs middlewareで検索→公式ドキュメントからmacherを検索すると具体例が出てくる)
    //  api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txtをmiddlewareから除外している
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
