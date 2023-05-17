import ProtectedPage from "../components/ProtectedPage"
import HeadBar from "../components/HeadBar"
import BottomBar from "../components/BottomBar"
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
