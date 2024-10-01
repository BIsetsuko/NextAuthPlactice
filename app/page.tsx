import { auth } from "@/auth";
import CustomLink from "@/components/custom-link";

export default async function Home() {
  // セッション情報を取得
  const session = await auth();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">🚀NextAuth.js Tutorial</h1>
      <div>
        <CustomLink href="/server-example" className="underline">
          サーバー
        </CustomLink>
        と
        <CustomLink href="/client-example" className="underline">
          クライアント
        </CustomLink>
        の例を見て、ページを保護してセッションデータを取得する方法を確認してください。
      </div>
      <div className="flex flex-col rounded-md bg-neutral-100">
        <div className="p-4 font-bold rounded-t-md bg-neutral-200">
          Current Session
        </div>
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {/* サーバコンポーネントでsessionの情報を表示させる。後ろの引数はコード整形するためのもの */}
          {/* これを使って名前やアドレスやアイコンを表示することができる */}
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
