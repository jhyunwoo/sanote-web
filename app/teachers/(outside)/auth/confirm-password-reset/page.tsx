import Link from "next/link"

export default function ConfirmPasswordReset() {
	return (
		<div className="">
			<div className="p-4 rounded-lg flex flex-col justify-center items-center bg-white shadow-lg">
				<div className="text-xl font-semibold mb-2">비밀번호 초기화</div>
				<div>비밀번호 초기화 메일을 확인해주세요.</div>
				<Link
					href={"/teachers/auth/signin"}
					className="mt-4 p-1 px-4 rounded-full text-white font-semibold bg-orange-400 hover:bg-orange-500 transition duration-200"
				>
					로그인
				</Link>
				<Link
					href={"/teachers/auth/request-password-reset"}
					className=" p-1 px-4 rounded-full text-orange-400 hover:text-orange-500 transition duration-200"
				>
					이메일 재요청
				</Link>
			</div>
		</div>
	)
}
