import { useState } from "react"
import { useAuthStore } from "../states/useAuthStore"
import { Link, useNavigate } from "react-router"
import {Eye, EyeOff} from 'lucide-react'
import {ThreeDot} from 'react-loading-indicators'
import toast from "react-hot-toast"

export default function Login(){
    const setUser = useAuthStore((state) => state.setUser)
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)
        
        const data = {
            username: formData.get('email'),
            password: formData.get('pass')
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok){
                if (result.message) {
                    toast.error(result.message)
                } else if (result.errors){
                    result.errors.forEach(error => {
                        toast.error(error.msg)
                    })
                } else {
                    toast.error('Login failed. Please try again.')
                }
            } else {
                setUser(result.user)
                toast.success('Login Successful')
                setTimeout(() => navigate('/'), 500)
            }
        } catch(err){
            console.error('Login Error:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return(
        <main className="flex flex-1 justify-center items-center py-12 px-4">
            <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl p-6 sm:p-8">
                <div className="flex flex-col space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">
                            Welcome Back
                        </h1>
                        <p className="text-slate-400 text-sm font-normal leading-normal">
                            Log in to your account to continue.
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
                        
                        <label htmlFor="email" className="flex flex-col space-y-2">
                            <p className="text-white text-sm font-medium leading-normal">Email</p>
                            <div className="relative flex w-full flex-1 items-stretch">
                                <span className="material-symbols-outlined text-slate-300 absolute left-3 top-1/2 -translate-y-1/2">mail</span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Enter your email" 
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                        rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 bg-transparent h-12 
                                        placeholder:text-neutral-500 pl-10 pr-4 text-base font-normal leading-normal transition-colors focus:border-primary"
                                    required
                                />
                            </div>
                        </label>
                        
                        <label htmlFor="pass" className="flex flex-col space-y-2">
                            <p className="text-white text-sm font-medium leading-normal">Password</p>
                            <div className="relative flex w-full flex-1 items-stretch">
                                <span className="material-symbols-outlined text-slate-300 absolute left-3 top-1/2 -translate-y-1/2">lock</span>
                                <input 
                                    type={showPass ? "text" : "password"} 
                                    name="pass" 
                                    id="pass" 
                                    placeholder="Enter your password" 
                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                        rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 bg-transparent h-12 
                                        placeholder:text-neutral-500 pl-10 pr-4 text-base font-normal leading-normal transition-colors focus:border-primary"
                                    required
                                />
                                <button type="button" className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 
                                hover:text-white transition-colors" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5' />}
                                </button>
                            </div>
                        </label>
                        <button type="submit" className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none 
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 w-full 
                        text-white bg-[#3a4df7] hover:bg-primary/90 rounded-lg text-base font-semibold">
                            {loading ? <ThreeDot color="white" size="small" /> : <span>Login</span> }
                        </button>
                        <div className="mt-8 text-center flex justify-center gap-2">
                            <p className="text-sm text-slate-400">
                                Need an account?
                            </p>
                            <Link to={'/sign-up'} className="text-sm text-[#3a4df7] hover:underline">Sign Up</Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}