import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"
import UserInfo from "./UserInfo"

export default function TeachersUser() {
	return (
		<div>
			<UserInfo />
			<TeachersProtectedPage />
		</div>
	)
}
