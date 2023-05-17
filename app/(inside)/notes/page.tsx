import ProtectedPage from "@/app/components/ProtectedPage"
import HeadBar from "@/app/components/HeadBar"
import BottomBar from "@/app/components/BottomBar"
import NoteList from "./NoteList"

export default function Home() {
	return (
		<div>
			<ProtectedPage />
			<HeadBar />
			<BottomBar />
			<NoteList />
		</div>
	)
}
