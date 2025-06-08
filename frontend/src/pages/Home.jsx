import React from 'react'
import { Link } from 'react-router-dom'

const features = [
	{
		icon: (
			<svg
				className="w-8 h-8 text-blue-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M13 16h-1v-4h-1m4 4h1a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v7a2 2 0 002 2h1"
				/>
			</svg>
		),
		title: 'Real-time Chat',
		desc: 'Instant messaging with friends and groups, powered by fast backend.',
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-blue-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 8v8"
				/>
			</svg>
		),
		title: 'Secure & Private',
		desc: 'End-to-end encryption keeps your conversations safe and private.',
	},
	{
		icon: (
			<svg
				className="w-8 h-8 text-blue-400"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M17 20h5v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2h5"
				/>
			</svg>
		),
		title: 'Easy to Use',
		desc: 'Modern, intuitive interface for seamless chatting on any device.',
	},
]

const Home = () => {
	// Scroll to features section
	const handleFeatureClick = () => {
		const featuresSection = document.getElementById('features');
		if (featuresSection) {
			featuresSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-900 font-sans text-white">
			{/* Header */}
			<header className="sticky top-0 z-10 bg-gray-950/90 shadow-md backdrop-blur flex items-center justify-between px-6 py-4">
				<Link
					to="/"
					className="flex items-center gap-2 text-2xl font-bold text-blue-400"
				>
					<span className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-extrabold">
						C
					</span>
					ChatApp
				</Link>
				<nav className="hidden md:flex gap-8 text-lg">
					<Link
						to="/"
						className="hover:text-blue-400 transition-colors"
					>
						Home
					</Link>
					<button type="button" onClick={handleFeatureClick} className="hover:text-blue-400 transition-colors bg-transparent focus:outline-none">
						Features
					</button>
					<Link
						to="/login"
						className="hover:text-blue-400 transition-colors"
					>
						Login
					</Link>
					<Link
						to="/register"
						className="hover:text-blue-400 transition-colors"
					>
						Register
					</Link>
				</nav>
				<button className="md:hidden text-gray-300 hover:text-blue-400 focus:outline-none">
					{/* Mobile menu icon placeholder */}
					<svg
						className="w-7 h-7"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</header>

			{/* Hero Section */}
			<section className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
				<h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
					Connect. Chat. Collaborate.
				</h1>
				<p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
					Experience seamless, secure, and real-time messaging with your friends
					and teams. All in one modern chat platform.
				</p>
				<Link
					to="/register"
					className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 text-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none hover:scale-105 hover:shadow-xl"
				>
					Get Started
				</Link>
			</section>

			{/* Features Section */}
			<section id="features" className="py-12 px-4 bg-gray-800">
				<div className="max-w-5xl mx-auto">
					<h2 className="text-3xl font-bold text-center mb-10">Features</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{features.map((f, i) => (
							<div
								key={i}
								className="bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 hover:bg-gray-800 hover:ring-2 hover:ring-blue-500 cursor-pointer"
							>
								<div className="mb-4">{f.icon}</div>
								<h3 className="text-xl font-semibold mb-2">{f.title}</h3>
								<p className="text-gray-400">{f.desc}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-auto py-6 bg-gray-950 text-center text-gray-400 text-sm">
				&copy; {new Date().getFullYear()} ChatApp. All rights reserved.
			</footer>
		</div>
	)
}

export default Home