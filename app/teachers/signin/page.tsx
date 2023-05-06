import Link from "next/link"
import SignInInput from "./SignInInput"

export default function TeachersSignIn() {
	return (
		<div>
			<div>Teachers Sign In</div>
			<SignInInput />
			<Link href="/teachers/signup">회원가입</Link>
		</div>
	)
}
