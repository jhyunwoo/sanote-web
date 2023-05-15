import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Loading() {
	return (
		<div className="w-full h-screen bg-slate-50/50 flex justify-center items-center p-4">
			<Cog6ToothIcon className="animate-spin" />
		</div>
	)
}
