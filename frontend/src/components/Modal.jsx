import { useEffect, useState } from "react"

export default function Modal({ isOpen, onClose }){
    const [titleCount, setTitleCount] = useState(0)
    const [textCount, setTextCount] = useState(0)

    useEffect(() => {
        const dialog = document.getElementById('message-modal')

        if (isOpen){
            dialog.showModal()
        } else {
            dialog.close()
        }
    }, [isOpen])

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log('New Message Submitted')
        onClose()
    }

    const handleClose = () => {
        setTitleCount(0)
        setTextCount(0)
        onClose()
    }

    return (
        <dialog id="message-modal" className="backdrop:bg-black/70 bg-transparent rounded-xl p-0 max-w-2xl w-full"
        onClose={handleClose}>
            <div className="bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-white text-2xl font-bold">Create New Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="title" className="text-white text-sm font-semibold leading-normal">
                                Title
                            </label>
                            <span className="text-white text-xs font-semibold leading-normal">{`${titleCount}/100`}</span>
                        </div>
                        <input 
                            type="text" 
                            name="title" 
                            id="title"
                            onChange={(e) => setTitleCount(e.target.value.length)}
                            maxLength={100}
                            placeholder="Enter your message title" 
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden 
                                rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border border-white/20 bg-[#101622] h-12 
                                placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-colors focus:border-primary"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-baseline">
                            <label htmlFor="message" className="text-white text-sm font-semibold leading-normal">
                                Message
                            </label>
                            <span className="text-white text-xs font-semibold leading-normal">{`${textCount}/255`}</span>
                        </div>
                        <textarea 
                            name="message" 
                            id="message" 
                            onChange={(e) => setTextCount(e.target.value.length)}
                            maxLength={255}
                            autoComplete="off"
                            className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 
                            focus:ring-primary/50 border border-white/20 dark:border-[#3b4354] bg-[#101622] dark:bg-[#111318] focus:border-primary 
                            min-h-[120px] text-white placeholder:text-neutral-500 p-2 text-base font-normal leading-normal transition-all"
                            placeholder="What's on your mind?"
                        />
                    </div>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 mt-4 pt-4 border-t border-slate-800">
                        <button type="submit" className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a4df7] px-4 text-sm font-bold text-white hover:bg-[#2d3ec7] transition-colors">
                            <span className="hidden sm:inline">Post Message</span>
                            <span className="sm:hidden">Post</span>
                        </button>
                        <button
                        onClick={handleClose}
                        className="inline-flex items-center justify-center whitespace-nowrap 
                        ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                        text-white hover:bg-white/10 h-10 px-4 py-2 rounded-lg text-sm font-medium"
                        type="button"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}