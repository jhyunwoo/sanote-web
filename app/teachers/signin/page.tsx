import Link from "next/link"
import SignInInput from "./SignInInput"

export default function TeachersSignIn() {
	return (
		<div className="bg-slate-50 p-4 pt-16 w-full min-h-screen flex justify-center items-center">
			<div className="flex flex-col justify-center items-center w-full">
				<SignInInput />
				<Link
					href="/teachers/signup"
					className="mt-8 text-orange-400 hover:text-orange-500 transition duration-200 font-semibold"
				>
					회원가입
				</Link>
			</div>
		</div>
	)
}
