import Link from "next/link"

export default function Home() {
	return (
		<div className="flex justify-center items-center w-full h-screen flex-col p-4 fixed top-0 bottom-0 right-0 left-0">
			<div className="flex flex-col items-start">
				<div className="text-4xl font-bold">Sanote for Teachers</div>
				<div className="text-lg font-medium">충남삼성고등학교 쪽지 시스템</div>
				<Link
					href={"/teachers/notes"}
					className="bg-orange-400 flex justify-start items-center hover:bg-orange-500 transition duration-200 p-2 px-4 rounded-full text-white text-lg font-semibold mt-4"
				>
					시작하기
				</Link>
			</div>
		</div>
	)
}
