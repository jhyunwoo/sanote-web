import HeadBar from "../../components/HeadBar"
import TeachersBottomBar from "../../components/TeachersBottomBar"

export default function TeachersLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="kr">
			<body className="bg-slate-50">
				<HeadBar />
				<TeachersBottomBar />
				{children}
			</body>
		</html>
	)
}
