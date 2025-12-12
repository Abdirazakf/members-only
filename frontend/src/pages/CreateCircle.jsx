import { MoveRight } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"

export default function CreateCircle(){
    const [loading, setLoading] = useState(false)
    const [nameCount, setNameCount] = useState(0)
    const [descCount, setDescCount] = useState(0)
    const [passCount, setPassCount] = useState(0)
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        const formData = new FormData(event.target)

        const data = {
            circle_name: formData.get('circle_name'),
            desc: formData.get('desc'),
            passcode: formData.get('passcode')
        }

        try {
            const response = await fetch('/api/circle/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (!response.ok){
                if (result.errors) {
                    result.errors.forEach(error => {
                        toast.error(error.msg)
                    })
                } else {
                    toast.error('Failed to Create Circle')
                }
            } else {
                toast.success('Circle created successfully')
                setTimeout(() => navigate('/'), 500)
            }
        } catch(err) {
            console.err('Failed to Create Circle:', err)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-6 px-4 py-16 @[480]:gap-8">
            <div className="w-full max-w-lg">
                <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">
                    Create New Circle
                </h1>
                <p className="text-slate-400 text-sm font-normal leading-normal">
                    Start a new community for anonymous sharing.
                </p>
            </div>
            <div className="w-full max-w-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl p-6 sm:p-8">
                {/* Fake fields to trick Chrome autocomplete */}
                <input type="text" name="fake_username" autoComplete="username" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex="-1" />
                <input type="password" name="fake_password" autoComplete="new-password" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }} tabIndex="-1" />
                
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="circle_name" className="text-white text-sm font-semibold leading-normal">
                                Circle Name
                            </label>
                            <span className="text-white text-xs font-semibold leading-normal">{`${nameCount}/100`}</span>
                        </div>
                        <input 
                            type="text" 
                            name="circle_name" 
                            id="circle_name"
                            autoComplete="off"
                            onChange={(e) => setNameCount(e.target.value.length)}
                            maxLength={100}
                            placeholder="e.g., The Breakfast Club" 
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 bg-[#101622] h-12 
                                placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-colors focus:border-primary"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="desc" className="text-white text-sm font-semibold leading-normal">
                                Description
                            </label>
                            <span className="text-white text-xs font-semibold leading-normal">{`${descCount}/255`}</span>
                        </div>
                        <textarea 
                            name="desc" 
                            id="desc" 
                            onChange={(e) => setDescCount(e.target.value.length)}
                            maxLength={255}
                            autoComplete="off"
                            className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 
                            focus:ring-primary/50 border border-white/20 dark:border-[#3b4354] bg-[#101622] dark:bg-[#111318] focus:border-primary 
                            min-h-[120px] text-white placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-all"
                            placeholder="Briefly describe who this circle is for..."
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="passcode" className="text-white text-sm font-semibold leading-normal">
                                Secret Passcode
                            </label>
                            <span className="text-white text-xs font-semibold leading-normal">{`${passCount}/30`}</span>
                        </div>
                        <div className="relative flex w-full flex-1 items-stretch">
                            <input 
                                type={visible ? "text" : "password"} 
                                name="passcode" 
                                id="passcode"
                                autoComplete="new-password"
                                data-lpignore="true"
                                data-form-type="other"
                                onChange={(e) => setPassCount(e.target.value.length)}
                                maxLength={30}
                                placeholder="Create a secret passcode" 
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                    rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 bg-[#101622] h-12 
                                    placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-colors focus:border-primary"
                                required
                            />
                            <button type="button" className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 
                            hover:text-white transition-colors" onClick={() => setVisible(!visible)}>
                                {visible ? <EyeOff className='w-5 h-5'/> : <Eye className='w-5 h-5' />}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-4 border-t border-slate-800">
                        <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        text-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium">
                            Cancel
                        </Link>
                        <button type="submit" disabled={loading} className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a4df7] px-4 text-sm font-bold text-white hover:bg-[#2d3ec7] transition-colors">
                            <span className="hidden sm:inline">Create New</span>
                            <span className="sm:hidden">Create</span>
                            <MoveRight className='w-4 h-4'/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}