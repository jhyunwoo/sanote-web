import { BookOpenIcon, ChatBubbleLeftRightIcon, PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function BottomBar() {
	return (
		<div className="fixed p-4 flex justify-between bg-slate-50 rounded-t-2xl bottom-0 right-0 left-0 w-full">
			<Link href={"/"}>
				<ChatBubbleLeftRightIcon className="w-8 h-8" />
			</Link>
			<Link href={"/send"}>
				<PaperAirplaneIcon className="w-8 h-8" />
			</Link>
			<Link href={"/classes"}>
				<BookOpenIcon className="w-8 h-8" />
			</Link>
			<Link href={"/profile"}>
				<UserCircleIcon className="w-8 h-8" />
			</Link>
		</div>
	)
}
