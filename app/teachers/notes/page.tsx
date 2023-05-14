import HeadBar from "../../components/HeadBar"
import TeachersBottomBar from "../../components/TeachersBottomBar"
import TeachersProtectedPage from "../../components/TeachersProtectedPage"
import NoteList from "./NoteList"

export default function Teachers() {
	return (
		<div className="w-full min-h-screen p-4 flex flex-col pt-20">
			<TeachersBottomBar />
			<HeadBar />
			<TeachersProtectedPage />
			<NoteList />
		</div>
	)
}
