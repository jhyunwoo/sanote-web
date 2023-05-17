import Link from "next/link"
import ClassList from "./ClassList"

export default async function Classes() {
	return (
		<div className="flex flex-col">
			<Link
				href={"/teachers/classes/create-class"}
				className="bg-orange-400 hover:0 transition duration-200 p-2 rounded-md text-white font-semibold text-center my-1"
			>
				반 생성
			</Link>
			<ClassList />
		</div>
	)
}
