import SignUpInputArea from "./InputArea"

export default function SignUp() {
	return (
		<div className="w-full min-h-screen bg-slate-50 p-4 flex flex-col justify-center items-center ">
			<div className="bg-white w-5/6 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
				<div className="text-xl font-semibold m-4">회원가입</div>
				<SignUpInputArea />
			</div>
		</div>
	)
}
