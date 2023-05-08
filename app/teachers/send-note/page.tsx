import TeachersBottomBar from "@/app/components/TeachersBottomBar"
import Input from "./Input"
import HeadBar from "@/app/components/HeadBar"

export default function SendNote() {
	return (
		<div className="w-full min-h-screen  p-4 pt-16 flex flex-col">
			<div className="text-lg font-semibold mb-2">쪽지 전송</div>
			<Input />
		</div>
	)
}
