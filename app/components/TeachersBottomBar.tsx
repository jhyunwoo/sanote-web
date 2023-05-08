import { BookOpenIcon, EnvelopeIcon, PaperAirplaneIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function TeachersBottomBar() {
	return (
		<div className="fixed bottom-0 bg-white right-0 left-0 w-full rounded-t-2xl py-3 flex justify-around items-center ">
			<Link href={"/teachers"}>
				<EnvelopeIcon className="w-8 h-8 text-orange-950 hover:bg-orange-300 hover:text-white transition duration-200  p-1 rounded-lg" />
			</Link>
			<Link href={"/teachers/send-note"}>
				<PaperAirplaneIcon className="w-8 h-8 text-orange-950 hover:bg-orange-300 hover:text-white transition duration-200  p-1 rounded-lg" />
			</Link>
			<Link href={"/teachers/classes"}>
				<BookOpenIcon className="w-8 h-8 text-orange-950 hover:bg-orange-300 hover:text-white transition duration-200  p-1 rounded-lg" />
			</Link>
		</div>
	)
}
