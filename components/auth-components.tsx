import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    // formタグを使っているのでserver actionを使うことができる
    <form
      action={async () => {
        "use server";
        // 認証処理を行うsignIn関数を呼び出す
        await signIn(provider);
      }}
    >
      <Button {...props}>サインイン</Button>
    </form>
  );
}

export function SignOut({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form className="w-full">
      <Button variant="ghost" className="w-full p-0" {...props}>
        ログアウト
      </Button>
    </form>
  );
}
