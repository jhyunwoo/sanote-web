import Layout from "@/app/components/Layout"
import HeadBar from "@/app/components/HeadBar"
import BottomBar from "@/app/components/BottomBar"
import TeachersProtectedPage from "@/app/components/TeachersProtectedPage"

export default function InsideLayout({ children }: { children: React.ReactNode }) {
	return (
		<Layout>
			<HeadBar />
			<BottomBar />
			<TeachersProtectedPage />
			{children}
		</Layout>
	)
}
