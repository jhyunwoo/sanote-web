"use client"

import { useState } from "react"
import Push from "../components/Push"

function PushNotification() {
	return (
		<div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
			<div className="text-xl font-bold">Step 2 알림 설정</div>
			<div className="mt-4">
				<strong className="text-orange-600">홈 화면에 추가한 Sanote 웹으로 이동한 후</strong> 알림을 받기위해 알림
				등록을 해주세요.
			</div>
			<div className="my-2 font-semibold">(iOS & iPad OS는 16.4 이상의 버전이 필요합니다.)</div>
			<Push />
		</div>
	)
}

export default function SetUp() {
	const [page, setPage] = useState("addHome")
	return (
		<div className="w-full h-screen p-4 bg-slate-50 flex justify-center items-center">
			{page === "addHome" ? (
				<div className="bg-white p-4 rounded-xl shadow-lg flex flex-col">
					<div className="text-xl font-bold">Step 1 홈 화면에 추가</div>
					<div className="my-2">알림을 받기 위해 Sanote 웹을 홈 화면에 추가해주세요.</div>
					<div className="flex flex-col mt-2">
						<div className="font-semibold">iPhone & iPad</div>
						<div>공유 ➡ 홈 화면에 추가 ➡ 추가</div>
					</div>
					<button
						onClick={() => setPage("pushNotification")}
						className="bg-orange-400 hover:bg-orange-500 p-1 rounded-full transition duration-200 text-white mt-2"
					>
						다음
					</button>
				</div>
			) : (
				<PushNotification />
			)}
		</div>
	)
}
