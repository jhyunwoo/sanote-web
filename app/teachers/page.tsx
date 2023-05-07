import Link from "next/link"
import TeachersProtectedPage from "../components/TeachersProtectedPage"
import NoteList from "./NoteList"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline"

export default function Teachers() {
	return (
		<div className="w-full min-h-screen bg-orange-50/50 p-4 flex flex-col pt-20">
			<TeachersProtectedPage />

			<NoteList />
			<Link
				href={"/teachers/send-note"}
				className="fixed bottom-16 right-4 bg-orange-400 hover:bg-orange-300 transition duration-200 p-3 rounded-full"
			>
				<PaperAirplaneIcon className="w-6 h-6 text-white" />
			</Link>
		</div>
	)
}
