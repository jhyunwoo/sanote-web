export default function CenterLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="w-full min-h-screen bg-slate-50 py-16 p-4 flex flex-col justify-center items-center">
			{children}
		</div>
	)
}
