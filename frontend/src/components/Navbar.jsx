import { Link } from "react-router-dom"
import {LockKeyhole} from 'lucide-react'

export default function Navbar() {
    return (
        <div className="mx-auto p-4 scheme-dark whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-4">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center justify-start gap-2">
                    <LockKeyhole className="size-7 text-primary flex-shrink-0" color="#607afb"/>
                    <Link to={'/'}>
                        <h1 className="text-white font-bold leading-tight tracking-[-0.015em]">
                            Member's Only
                        </h1>
                    </Link>
                </div>
                <nav className="flex items-center gap-4">
                    <Link to={'/login'} className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium">
                        Login
                    </Link>
                    <Link to={'/sign-up'} className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium">
                        Sign Up
                    </Link>
                </nav>
            </div>
        </div>
    )
}