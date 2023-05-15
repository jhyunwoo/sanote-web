"use client"

import { BookOpenIcon, EnvelopeIcon, PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomBar() {
	const pathname = usePathname()
	function isTeacher() {
		if (pathname.slice(1, 9) === "teachers") {
			return true
		} else {
			return false
		}
	}

	return (
		<div className="fixed bottom-0 bg-white right-0 left-0 w-full rounded-t-2xl p-2 pb-4 flex justify-around items-center z-40">
			<Link
				href={isTeacher() ? "/teachers/notes" : "/notes"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<EnvelopeIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
			<Link
				href={isTeacher() ? "/teachers/send-note" : "/send"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<PaperAirplaneIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
			<Link
				href={isTeacher() ? "/teachers/classes" : "/classes"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<BookOpenIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
			<Link
				href={isTeacher() ? "/teachers/profile" : "/profile"}
				className="group w-10 h-10 flex justify-center items-center p-2 rounded-xl hover:bg-orange-300 transition duration-200"
			>
				<UserCircleIcon className="w-8 h-8 text-orange-950 group-hover:text-white transition duration-200" />
			</Link>
		</div>
	)
}
