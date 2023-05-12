import Push from "./Push"

export default function HeadBar() {
	return (
		<div className="fixed top-0 right-0 left-0 p-4 flex justify-between items-center bg-slate-50 z-40">
			<div className="text-lg font-semibold">Sanote</div>
			<Push />
		</div>
	)
}
