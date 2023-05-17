import HeadBar from "@/app/components/HeadBar"
import BottomBar from "@/app/components/BottomBar"
import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"
import NoteList from "./NoteList"

export default function Teachers() {
	return (
		<div className="w-full min-h-screen p-4 flex flex-col pt-20">
			<BottomBar />
			<HeadBar />
			<TeachersProtectedPage />
			<NoteList />
		</div>
	)
}
