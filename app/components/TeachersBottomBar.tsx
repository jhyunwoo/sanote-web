import { EnvelopeIcon, UsersIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function TeachersBottomBar() {
	return (
		<div className="fixed bottom-0 right-0 left-0 w-full px-4 py-2 flex justify-around items-center bg-orange-50/50">
			<Link href={"/teachers"}>
				<EnvelopeIcon className="w-8 h-8 text-orange-900" />
			</Link>
			<Link href={"/teachers/classes"}>
				<UsersIcon className="w-8 h-8 text-orange-900" />
			</Link>
		</div>
	)
}
