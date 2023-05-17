import ClassList from "./ClassList"
import Link from "next/link"

export default function Classes() {
	return (
		<div className={"flex flex-col"}>
			<Link
				href={"/classes/add-class"}
				className={
					"bg-orange-400 p-2 px-4 rounded-xl text-white text-center hover:bg-orange-500 transition duration-200 my-2"
				}
			>
				반 추가하기
			</Link>
			<ClassList />
		</div>
	)
}
