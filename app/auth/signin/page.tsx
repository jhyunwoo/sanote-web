import Link from "next/link"
import SignInInputArea from "./InputArea"

export default function SignIn() {
  return (
    <div>
      <div>Sign In</div>
      <SignInInputArea />
      <Link href={"/auth/signup"}>Sign Up</Link>
    </div>
  )
}
