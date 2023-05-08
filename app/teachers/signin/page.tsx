import Link from "next/link"
import SignInInput from "./SignInInput"

export default function TeachersSignIn() {
	return (
		<div className="bg-slate-50 p-4 pt-16 w-full min-h-screen">
			<SignInInput />
			<Link href="/teachers/signup">회원가입</Link>
		</div>
	)
}
