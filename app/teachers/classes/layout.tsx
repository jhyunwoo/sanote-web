import HeadBar from "../../components/HeadBar"
import BottomBar from "../../components/BottomBar"

export default function TeachersLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="bg-slate-50">
			<HeadBar />
			<BottomBar />
			{children}
		</section>
	)
}
