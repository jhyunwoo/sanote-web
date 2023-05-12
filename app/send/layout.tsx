import BottomBar from "../components/BottomBar"
import HeadBar from "../components/HeadBar"
import Layout from "../components/Layout"
import ProtectedPage from "@/app/components/ProtectedPage";

export default function SendLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<ProtectedPage/>
			<HeadBar />
			<Layout>{children}</Layout>
			<BottomBar />
		</section>
	)
}
