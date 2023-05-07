import Input from "./Input"

export default function CreateClass() {
	return (
		<div className="w-full min-h-screen bg-orange-50/50 p-4 pt-16 flex flex-col">
			<div className="text-xl font-bold mb-4">수업 생성</div>
			<Input />
		</div>
	)
}
