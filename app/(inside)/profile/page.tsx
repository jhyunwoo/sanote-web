import ProtectedPage from "../components/ProtectedPage"
import UserInfo from "./UserInfo"

export default function Profile() {
	return (
		<div>
			<ProtectedPage />
			<UserInfo />
		</div>
	)
}
