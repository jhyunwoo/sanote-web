import Link from "next/link"
import ClassList from "./ClassList"
import TeachersBottomBar from "@/app/components/TeachersBottomBar"
import HeadBar from "@/app/components/HeadBar"

export default async function Classes() {
	return (
		<div className="w-full min-h-screen bg-orange-50/50 pt-20 p-4 flex flex-col item">
			<Link
				href={"/teachers/classes/create-class"}
				className="bg-orange-400 hover:bg-orange-500 transition duration-200 p-2 rounded-md text-white font-semibold text-center my-1"
			>
				반 생성
			</Link>
			<ClassList />
		</div>
	)
}
