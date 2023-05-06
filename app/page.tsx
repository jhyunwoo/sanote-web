import SignOut from "./SignOut"
import Push from "./components/Push"
import ProtectedPage from "./components/ProtectedPage"

export default function Home() {
	return (
		<div>
			<ProtectedPage />
			<div>Home</div>
			<SignOut />
			<Push />
		</div>
	)
}
