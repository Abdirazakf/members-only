import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Eye, EyeOff} from 'lucide-react'
import { ThreeDot } from 'react-loading-indicators'
import toast from 'react-hot-toast'

export default function SignUp(){
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)
        
        const data = {
            first_name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            email: formData.get('email'),
            pass: formData.get('pass'),
            confirm:formData.get('confirm')
        }

        try {
            const response = await fetch('/api/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok){
                result.errors.forEach(error => {
                    toast.error(error.msg)
                })
            } else {
                toast.success('Account created successfully!')
                setTimeout(() => navigate('/login'), 500)
            }
        } catch {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return(
        <main className="flex flex-1 justify-center items-center py-12 px-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="text-slate-400 text-base font-normal leading-normal">
                        Start sharing and connecting with your community
                    </p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className="grid grid-cols-2 gap-4">
                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="first_name" className="text-white text-sm font-medium leading-normal">First Name</label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="Enter your first name"
                                className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                                    border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                                    placeholder:text-slate-500 transition-colors focus:border-primary"
                                required
                            />       
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="last_name" className="text-white text-sm font-medium leading-normal">Last Name</label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Enter your last name"
                                className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                                    border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                                    placeholder:text-slate-500 transition-colors focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="email" className='text-white text-sm font-medium leading-normal'>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                                border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                                placeholder:text-slate-500 transition-colors focus:border-primary"
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="pass" className='text-white text-sm font-medium leading-normal'>Password</label>
                        <div className='relative'>
                            <input
                                type={showPass ? "text" : "password"}
                                id="pass"
                                name="pass"
                                placeholder="Enter your password"
                                className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                                    border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                                    placeholder:text-slate-500 transition-colors focus:border-primary"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'    
                            >
                                {showPass ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label htmlFor="confirm" className='text-white text-sm font-medium leading-normal'>Confirm Password</label>
                        <div className="relative">
                            <input 
                                type={showPass ? "text" : "password"} 
                                id='confirm'
                                name='confirm'
                                placeholder='Retype Password'
                                className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                                    border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                                    placeholder:text-slate-500 transition-colors focus:border-primary"
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors'
                            >
                                {showPass ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className='inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none 
                        focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 w-full 
                        text-white bg-[#3a4df7] hover:bg-primary/90 rounded-lg text-base font-semibold'>
                            {loading ? 
                                <ThreeDot color="white" size="small" />
                                : <span>Create Account</span>
                            }
                    </button>

                    <div className="mt-8 text-center flex justify-center gap-2">
                        <p className="text-sm text-slate-400">Already have an account?</p>
                        <Link to={'/login'} className='text-sm text-[#3a4df7] hover:underline'>Login</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}