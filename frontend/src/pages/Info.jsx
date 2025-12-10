import { Link } from 'react-router-dom'
import { Eye, Theater, Users } from 'lucide-react'
import { useState } from 'react'

export default function LearnMore() {
    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <HeroSection />
                <WhyBecomeAMember />
                <HowItWorks />
                <End />
            </main>
            <Footer />
        </div>
    )
}

function HeroSection() {
    return (
        <div className="py-10 md:py-16">
            <div 
                className="min-h-[480px] flex flex-col gap-6 items-center justify-center p-8 sm:p-12 rounded-xl"
                style={{
                    backgroundImage: `linear-gradient(rgba(15, 19, 35, 0.6) 0%, rgba(15, 19, 35, 0.9) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA5Py9PLf7TDAqNjMONaSbddTiLGCX_psZM4_xH2VznLApsm7gc8Q4vUpBE1Evl_6fsF2Gv5h01AUxlzbtEQnLKuEIYnwUM5sQmdTe0JiqpRVEsaOlN7wrX0BmPfz1GF77NXW___wsNAIXEPwjZgMU0O8FV6_3yeh-1Zx2VA8Ho0k6ADiPm_4EjRCZWeRoEQdogo-D3OkpJSixismtk04niX2rJfS_nWV-yyY9Si-75_YKmlQRxNRfmrTGUauiW6wR_lCLU1IKnSnk")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="flex flex-col gap-4 text-center max-w-2xl">
                    <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                        Speak Freely, Connect Genuinely.
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base">
                        An anonymous messaging platform where verified members can see who's behind the post.
                    </p>
                </div>
                <Link to="/sign-up">
                    <button className="px-6 h-12 bg-[#3a4df7] text-white text-base font-bold rounded-lg hover:bg-[#2d3ec7] transition-colors">
                        Get Started Now
                    </button>
                </Link>
            </div>
        </div>
    )
}

function WhyBecomeAMember() {
    return (
        <section id="features" className="py-10">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">
                Why Become a Member?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FeatureCard
                    icon={<Eye className="w-8 h-8 text-[#3a4df7]" />}
                    title="Reveal Authors"
                    description="See the real name behind every post. Only for members."
                />
                <FeatureCard
                    icon={<Theater className="w-8 h-8 text-[#3a4df7]" />}
                    title="Post Anonymously"
                    description="Share your thoughts without revealing your identity to the public."
                />
                <FeatureCard
                    icon={<Users className="w-8 h-8 text-[#3a4df7]" />}
                    title="Exclusive Community"
                    description="Join a trusted, private community of verified members."
                />
            </div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="flex flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800/30 p-6 hover:border-slate-600 transition-colors">
            <div>{icon}</div>
            <div className="flex flex-col gap-2">
                <h3 className="text-white text-lg font-bold">{title}</h3>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>
        </div>
    )
}

function HowItWorks() {
    const [openIndex, setOpenIndex] = useState(0)

    const sections = [
        {
            title: "The Public View",
            content: "Anyone can read posts, but all authors appear as 'Anonymous'. This ensures a space for open dialogue without immediate personal judgment, encouraging honest conversations."
        },
        {
            title: "The Member View",
            content: "Log in as a member to see the author's name attached to every post. Membership grants you access to the true identity behind the curtain, fostering a community of trust and accountability."
        },
        {
            title: "Your Privacy",
            content: "Your identity is only revealed to other logged-in members, never to the public. You control your voice, sharing freely with the public while maintaining accountability within the trusted circle."
        }
    ]

    return (
        <section id="how-it-works" className="py-10">
            <h2 className="text-white text-2xl sm:text-3xl font-bold mb-6">
                How It Works
            </h2>
            
            <div className="flex flex-col gap-3">
                {sections.map((section, index) => (
                    <Accordion
                        key={index}
                        title={section.title}
                        content={section.content}
                        isOpen={openIndex === index}
                        onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                    />
                ))}
            </div>
        </section>
    )
}

function Accordion({ title, content, isOpen, onToggle }) {
    return (
        <div className="rounded-lg bg-slate-800/30 border border-slate-700">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <h3 className="text-base font-bold text-white">{title}</h3>
                <svg
                    className={`w-6 h-6 text-[#3a4df7] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="px-4 pb-4">
                    <p className="text-slate-400 text-sm">{content}</p>
                </div>
            )}
        </div>
    )
}

function End() {
    return (
        <div className="my-16 rounded-xl bg-slate-800/30 border border-slate-700 p-8 sm:p-12 text-center flex flex-col items-center gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Join the Conversation?
            </h2>
            <p className="text-slate-400 max-w-md">
                Become part of an exclusive community where genuine connection is prioritized and your voice matters.
            </p>
            <Link to="/sign-up">
                <button className="px-6 h-12 bg-[#3a4df7] text-white text-base font-bold rounded-lg hover:bg-[#2d3ec7] transition-colors">
                    Sign Up for Free
                </button>
            </Link>
        </div>
    )
}

function Footer() {
    return (
        <footer className="mt-auto border-t border-slate-800 px-4 py-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://www.github.com/Abdirazakf" target='_blank' className="text-sm text-slate-400">
                    Created By Abdirazak Farah
                </a>
            </div>
        </footer>
    )
}