import { BookOpenIcon, EnvelopeIcon, PaperAirplaneIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function TeachersBottomBar() {
	return (
		<div className="fixed bottom-0 bg-white right-0 left-0 w-full rounded-t-2xl p-2 pb-4 flex justify-around items-center ">
			<Link
				href={"/teachers"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<EnvelopeIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
			<Link
				href={"/teachers/send-note"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<PaperAirplaneIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
			<Link
				href={"/teachers/classes"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<BookOpenIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
		</div>
	)
}
