import { BookOpenIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function BottomBar() {
	return (
		<div className="fixed p-4 flex justify-between bg-slate-50 rounded-t-2xl bottom-0 right-0 left-0 w-full px-8 z-40">
			<Link href={"/"} className={"flex justify-center items-center flex-col"}>
				<ChatBubbleLeftRightIcon className="w-8 h-8 text-orange-950 hover:text-orange-800 transition duration-200" />
			</Link>
			<Link href={"/send"} className={"flex justify-center items-center flex-col"}>
				<PaperAirplaneIcon className="w-8 h-8 text-orange-950 hover:text-orange-800 transition duration-200" />
			</Link>
			<Link href={"/classes"} className={"flex justify-center items-center flex-col"}>
				<BookOpenIcon className="w-8 h-8 text-orange-950 hover:text-orange-800 transition duration-200" />
			</Link>
			<Link href={"/profile"} className={"flex justify-center items-center flex-col"}>
				<UserCircleIcon className="w-8 h-8 text-orange-950 hover:text-orange-800 transition duration-200" />
			</Link>
		</div>
	)
}
