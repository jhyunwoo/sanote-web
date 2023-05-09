import VerificationButton from "./VerificatiobButton"

export default function ConfirmVerificationWithToken() {
	return (
		<div className="w-full min-h-screen bg-slate-50 p-4 flex flex-col justify-center items-center">
			<div className="bg-white w-4/5 p-4 rounded-lg shadow-lg flex flex-col justify-center items-center">
				<div className="text-xl font-semibold m-4">이메일 인증</div>
				<VerificationButton />
			</div>
		</div>
	)
}
