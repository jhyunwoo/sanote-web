import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"
import UserInfo from "./UserInfo"

export default function TeachersUser() {
	return (
		<div className="w-full min-h-screen p-4 pt-16 bg-slate-50">
			<UserInfo />
			<TeachersProtectedPage />
		</div>
	)
}
