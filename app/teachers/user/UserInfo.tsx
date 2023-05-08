"use client"

import pb from "@/lib/pocketbase"
import { userInfo } from "@/lib/recoil"
import { useRouter } from "next/navigation"
import { useRecoilState } from "recoil"

export default function UserInfo() {
	const [user, setUser] = useRecoilState(userInfo)
	const router = useRouter()
	function logOut() {
		pb.authStore.clear()
		setUser({
			id: null,
			username: null,
			email: null,
			name: null,
			avatar: null,
			type: null,
			studentId: null,
			year: null,
			class: null,
			department: null,
			valid: null,
		})
		router.replace("/teachers/signin")
	}

	return (
		<div className="flex flex-col">
			<div className="w-full bg-white shadow-lg hover:shadow-xl rounded-md p-4 flex flex-col transition duration-200">
				<div className="text-xl font-semibold mb-2">{user?.name} 선생님</div>
				<div className="ml-auto text-base">{user?.department}</div>
				<div className="ml-auto text-base">{user?.email}</div>
			</div>
			<button
				onClick={() => router.push("/teachers/user/change-password")}
				className="text-orange-400 mt-8 p-1 rounded-full font-semibold hover:text-orange-500 transition duration-200"
			>
				비밀번호 변경
			</button>
			<button
				onClick={logOut}
				className="bg-orange-400  p-1 rounded-full my-2 text-white font-semibold hover:bg-orange-500 transition duration-200"
			>
				로그아웃
			</button>
		</div>
	)
}
