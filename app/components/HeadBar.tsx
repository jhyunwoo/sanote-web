import Push from "./Push"

export default function HeadBar() {
	return (
		<div className="fixed top-0 right-0 left-0 p-4 flex justify-between items-center bg-orange-50/50">
			<div className="text-lg font-semibold">Sanote</div>
			<Push />
		</div>
	)
}
