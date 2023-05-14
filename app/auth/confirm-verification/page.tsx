import Link from "next/link"
import ResendVerification from "./ResendVerification"

export default function ConfirmVerification() {
	return (
		<div className="w-full min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
			<div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">
				<div className="text-xl font-semibold m-4">이메일 인증</div>
				<div className="text-sm">회원가입에 사용한 이메일을 확인해주세요.</div>
				<Link
					href={"/auth/signin"}
					className="mt-4 p-1 rounded-full bg-orange-400 hover:bg-orange-500 transition duration-200 px-4 text-white font-semibold"
				>
					로그인 페이지
				</Link>
			</div>
			<ResendVerification />
		</div>
	)
}
