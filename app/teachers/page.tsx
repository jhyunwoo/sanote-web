import Link from "next/link"
import TeachersProtectedPage from "../components/TeachersProtectedPage"
import Push from "../components/Push"

export default function Teachers() {
	return (
		<div>
			<TeachersProtectedPage />
			<div>Teachers Page</div>
			<Link href="/teachers/send-note">Send Note</Link>
			<Link href="/teachers/classes">Classes</Link>
			<Push />
		</div>
	)
}
