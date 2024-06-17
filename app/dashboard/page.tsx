import { auth } from "@/auth";
import { SignIn, SignOut } from "@/components/auth-components";

export default async function Page() {
  let session = await auth();
  let user = session?.user?.email;

  return (
    <section>
      <h1>Home</h1>
      <div className="flex">Test {session?.user?.name}</div>
      <div>{user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn />}</div>
    </section>
  );
}