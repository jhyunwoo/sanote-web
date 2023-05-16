import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export default function Loading() {
	return (
		<div className="z-40 w-full h-screen bg-slate-50/50 flex justify-center items-center p-4 fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm touch-none">
			<Cog6ToothIcon className="animate-spin w-12 h-12" />
		</div>
	)
}
