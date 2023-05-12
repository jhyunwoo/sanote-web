import BottomBar from "../components/BottomBar"
import HeadBar from "../components/HeadBar"
import ProtectedPage from "../components/ProtectedPage"

export default function NoteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="py-16 p-4 bg-slate-50 w-full min-h-screen flex flex-col">
			<ProtectedPage />
			<HeadBar />
			<BottomBar />
			{children}
		</div>
	)
}
