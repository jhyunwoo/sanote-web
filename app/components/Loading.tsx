"use client"

import { loading } from "@/lib/recoil"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useRecoilValue } from "recoil"

export default function Loading() {
	const isLoading = useRecoilValue(loading)
	if (isLoading) {
		return (
			<div className="z-40 w-full h-screen bg-slate-50/50 flex justify-center items-center p-4 fixed top-0 bottom-0 right-0 left-0 backdrop-blur-sm touch-none">
				<Cog6ToothIcon className="animate-spin w-12 h-12" />
			</div>
		)
	} else {
		return <div></div>
	}
}
