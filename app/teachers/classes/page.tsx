import Link from "next/link"
import ClassList from "./ClassList"

export default async function Classes() {
	return (
		<div>
			<div>Classes</div>
			<Link href={"/teachers/classes/create-class"}>Create Class</Link>
			<ClassList />
		</div>
	)
}
