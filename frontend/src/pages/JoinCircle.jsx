import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { ThreeDot } from 'react-loading-indicators'
import toast from "react-hot-toast"

export default function Circle(){
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async(event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)

        const data = {
            circle_name: formData.get('circle_name'),
            passcode: formData.get('passcode')
        }

        try {
            const response = await fetch('/api/circle/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok){
                if (result.message){
                    toast.error(result.message)
                } else {
                    toast.error('Failed to Join Circle')
                }
            } else {
                toast.success(result.message || 'Successfully joined circle!')
                setTimeout(() => navigate('/'), 500)
            }
        } catch(err){
            console.error('Failed to Join Circle:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center gap-6 px-4 py-16 @[480]:gap-8">
            <div className="w-full max-w-md space-y-6">
                <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
                            Join an Inner Circle
                        </h1>
                        <h2 className="font-display text-base font-normal leading-normal text-slate-600 dark:text-slate-400 @[480px]:text-lg">
                            Enter the circle name and secret passcode below to become a member and see who wrote each post.
                        </h2>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Fake fields to trick Chrome autocomplete */}
                    <input type="text" name="fake_username" autoComplete="username" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex="-1" />
                    <input type="password" name="fake_password" autoComplete="new-password" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex="-1" />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="circle_name" className="text-left text-white text-md font-large leading-normal">
                            Circle Name
                        </label>
                        <input type="text" name="circle_name" id="circle_name" 
                        placeholder="Enter Circle's Name"
                        className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                        border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                        placeholder:text-slate-500 transition-colors focus:border-primary"
                        required
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="passcode" className="text-left text-white text-md font-large leading-normal">
                            Secret Password
                        </label>
                        <input type="password" name="passcode" id="passcode" 
                        placeholder="••••••••"
                        className="flex w-full rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 
                        border border-slate-600 bg-slate-700/50 h-12 px-4 text-base font-normal leading-normal 
                        placeholder:text-slate-500 transition-colors focus:border-primary"
                        required
                        />
                    </div>
                    <button disabled={loading} type="submit" className='inline-flex items-center justify-center whitespace-nowrap 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 w-full 
                    text-white bg-[#3a4df7] hover:bg-primary/90 rounded-lg text-base font-semibold'>
                        {loading ? 
                            <ThreeDot color="white" size="small" />
                            : <span>Join Circle</span>
                        }
                    </button>
                        <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap 
                    ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-6 w-full 
                    text-white bg-slate-800 hover:bg-white/10 rounded-lg text-base font-semibold">
                            Cancel
                        </Link>
                </form>
            </div>
        </div>
    )
}