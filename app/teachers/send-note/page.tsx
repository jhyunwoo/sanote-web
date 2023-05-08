import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"
import Input from "./Input"

export default function SendNote() {
	return (
		<div className="w-full min-h-screen  p-4 pt-16 flex flex-col">
			<TeachersProtectedPage />
			<div className="text-lg font-semibold mb-2">쪽지 전송</div>
			<Input />
		</div>
	)
}
