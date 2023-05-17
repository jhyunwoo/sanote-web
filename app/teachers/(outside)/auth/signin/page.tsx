import Link from "next/link"
import SignInInput from "./SignInInput"

export default function TeachersSignIn() {
	return (
		<div className="flex flex-col justify-center items-center w-5/6">
			<SignInInput />
			<Link
				href="/teachers/auth/signup"
				className="mt-8 text-orange-400 hover:text-orange-500 transition duration-200 font-semibold"
			>
				회원가입
			</Link>
		</div>
	)
}
