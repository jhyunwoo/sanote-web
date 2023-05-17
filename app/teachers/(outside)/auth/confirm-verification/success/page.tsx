import Link from "next/link"

export default function ConfirmPasswordSuccess() {
	return (
		<div className="bg-white p-4 rounded-lg shadow-lg flex flex-col w-full">
			<div className="text-lg font-semibold">이메일 인증 완료</div>
			<div>웹으로 돌아가 로그인을 진행해주세요.</div>
			<Link
				href={"/teachers/auth/signin"}
				className="mt-4 p-1 rounded-full bg-orange-400 hover:bg-orange-500 transition duration-200 px-4 text-white font-semibold text-center"
			>
				로그인 페이지
			</Link>
		</div>
	)
}
