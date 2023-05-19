import Link from "next/link"
import SignInInputArea from "./InputArea"

export default function SignIn() {
	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="bg-white p-4 w-5/6 rounded-lg flex flex-col justify-center items-center">
				<div className="text-xl font-semibold m-4">로그인</div>
				<SignInInputArea />
			</div>
			<Link
				href={"/auth/request-password-reset"}
				className="mt-4 text-orange-400 hover:text-orange-500 transition duration-200"
			>
				비밀번호 초기화
			</Link>
			<Link href="/auth/signup" className="mt-2 text-orange-400 hover:text-orange-500 transition duration-200">
				회원가입
			</Link>
		</div>
	)
}
