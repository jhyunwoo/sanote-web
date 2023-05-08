"use client"

import { userInfo } from "@/lib/recoil"
import { useRecoilState } from "recoil"

export default function UserInfo() {
	const [user, setUser] = useRecoilState(userInfo)
	return (
		<div className="w-full bg-white shadow-xl rounded-xl p-4 flex flex-col">
			<div>사용자 정보</div>
			<div>{user.name}</div>
			<div>{user.department}</div>
		</div>
	)
}
