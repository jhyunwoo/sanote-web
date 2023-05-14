import BottomBar from "../components/BottomBar"
import HeadBar from "../components/HeadBar"
import Layout from "../components/Layout"

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<HeadBar />
			<Layout>{children}</Layout>
			<BottomBar />
		</section>
	)
}
