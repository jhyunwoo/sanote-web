import Link from "next/link"

export default function Teachers() {
  return (
    <div>
      <div>Teacher Page</div>
      <Link href={"/teachers/create-class"}>Create Class</Link>
    </div>
  )
}
