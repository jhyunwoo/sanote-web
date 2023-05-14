import BottomBar from "../components/BottomBar"
import HeadBar from "../components/HeadBar"
import ProtectedPage from "../components/ProtectedPage"
import Layout from "@/app/components/Layout"

export default function NoteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<ProtectedPage />
			<HeadBar />
			<BottomBar />
			<Layout>{children}</Layout>
		</div>
	)
}
