import SignUpInput from "./SignUpInput"
import Link from "next/link"

export default function TeachersSignUp() {
	return (
		<div className="w-5/6 flex flex-col items-center justify-center">
			<div className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-lg w-full">
				<div className="m-4 text-xl font-bold">회원가입</div>
				<SignUpInput />
			</div>
			<Link
				href={"/teachers/auth/signin"}
				className="mt-8 text-orange-400 hover:text-orange-500 transition duration-200 font-semibold"
			>
				로그인
			</Link>
		</div>
	)
}
