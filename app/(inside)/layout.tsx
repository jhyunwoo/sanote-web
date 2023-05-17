import Layout from "@/app/components/Layout"
import HeadBar from "@/app/components/HeadBar"
import BottomBar from "@/app/components/BottomBar"
import ProtectedPage from "@/app/components/ProtectedPage"

export default function InsideLayout({ children }: { children: React.ReactNode }) {
	return (
		<Layout>
			<HeadBar />
			<BottomBar />
			<ProtectedPage />
			{children}
		</Layout>
	)
}
