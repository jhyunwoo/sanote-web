import ProtectedPage from "./components/ProtectedPage"
import HeadBar from "./components/HeadBar"
import BottomBar from "./components/BottomBar"
import NoteList from "./NoteList"

export default function Home() {
	return (
		<div className="w-full min-h-screen p-4 bg-slate-50 flex flex-col py-16">
			<ProtectedPage />
			<HeadBar />
			<BottomBar />
			<NoteList />
		</div>
	)
}
