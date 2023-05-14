import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"
import HeadBar from "../../components/HeadBar"
import TeachersBottomBar from "../../components/TeachersBottomBar"

export default function TeachersLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="bg-slate-50">
			<HeadBar />
			<TeachersBottomBar />
			<TeachersProtectedPage />
			{children}
		</section>
	)
}
