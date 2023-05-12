import BottomBar from "../components/BottomBar"
import HeadBar from "../components/HeadBar"
import ProtectedPage from "../components/ProtectedPage"
import Layout from "@/app/components/Layout";

export default function NoteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="py-16 p-4 bg-slate-50 w-full min-h-screen flex flex-col">
			<ProtectedPage />
			<HeadBar />
			<BottomBar />
			<Layout>{children}</Layout>
		</div>
	)
}
