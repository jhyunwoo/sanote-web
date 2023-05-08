export default function ConfirmPasswordReset() {
	return (
		<div className="w-full min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
			<div className="p-4 rounded-lg flex flex-col justify-center items-center bg-white shadow-lg">
				<div className="text-xl font-semibold mb-2">비밀번호 초기화</div>
				<div>비밀번호 초기화 메일을 확인해주세요.</div>
				{/* <button className="mt-4 p-1 px-4 rounded-full text-orange-400 hover:text-orange-500 transition duration-200">
					이메일 재요청
				</button> */}
			</div>
		</div>
	)
}
