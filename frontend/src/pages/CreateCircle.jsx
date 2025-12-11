import { MoveRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"

export default function CreateCircle(){
    const [charCount, setCharCount] = useState(0)

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
                <form className="space-y-6">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="circle_name" className="text-white text-sm font-semibold leading-normal">
                            Circle Name
                        </label>
                            <input 
                                type="text" 
                                name="circle_name" 
                                id="circle_name" 
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
                            <span className="text-white text-xs font-semibold leading-normal">{`${charCount}/255`}</span>
                        </div>
                        <textarea name="desc" id="desc" 
                        onChange={(e) => setCharCount(e.target.value.length)}
                        className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 
                        focus:ring-primary/50 border border-white/20 dark:border-[#3b4354] bg-[#101622] dark:bg-[#111318] focus:border-primary 
                        min-h-[120px] text-white placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-all"
                        placeholder="Briefly describe who this circle is for..."
                        />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-4 border-t border-slate-800">
                        <Link to={'/'} className="inline-flex items-center justify-center whitespace-nowrap 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        text-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium">
                            Cancel
                        </Link>
                        <button type="submit" className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a4df7] px-4 text-sm font-bold text-white hover:bg-[#2d3ec7] transition-colors">
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