import Link from "next/link"
import TeachersProtectedPage from "../components/TeachersProtectedPage"
import NoteList from "./NoteList"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

export default function Teachers() {
	return (
		<div className="w-full min-h-screen  p-4 flex flex-col pt-20">
			<TeachersProtectedPage />
			<NoteList />
		</div>
	)
}
