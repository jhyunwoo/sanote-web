import Link from "next/link"

export default function ConfirmPasswordSuccess() {
	return (
		<div className="w-full h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
			<div className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
				<div className="text-lg font-semibold">이메일 인증 완료</div>
				<div>웹으로 돌아가 로그인을 진행해주세요.</div>
				<Link
					href={"/auth/signin"}
					className="mt-4 p-1 rounded-full bg-orange-400 hover:bg-orange-500 transition duration-200 px-4 text-white font-semibold text-center"
				>
					로그인 페이지
				</Link>
			</div>
		</div>
	)
}
