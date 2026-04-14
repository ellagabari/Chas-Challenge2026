import { ReportList } from '../components/ReportList'

export function HomePage() {
	return (
		<main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
			<section className="mx-auto max-w-4xl text-center">
				<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">LitterHero</h1>
				<p className="mt-3 text-slate-600">Report and track litter in your area.</p>
			</section>

			<section className="mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
				<ReportList />
			</section>
		</main>
	)
}