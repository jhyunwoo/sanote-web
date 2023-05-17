import ProtectedPage from "@/app/components/ProtectedPage"
import UserInfo from "./UserInfo"

export default function Profile() {
	return (
		<div>
			<ProtectedPage />
			<UserInfo />
		</div>
	)
}
