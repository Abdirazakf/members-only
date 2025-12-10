import { Link } from 'react-router-dom'

export default function GuestHome(){
    return(
        <>
            <div className="flex flex-col gap-6 px-4 py-16 text-center @[480px]:gap-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-white text-4xl font-bold leading-tight tracking-tight">
                        Speak Freely, Connect Anonymously.
                    </h1>
                    <h2 className="font-display text-base font-normal leading-normal text-slate-600 dark:text-slate-400 @[480px]:text-lg">
                        Join our community to see who wrote the posts and engage in authentic conversations.
                    </h2>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg 
                    h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3a4df7] dark:bg-[#282e39] text-white dark:text-white text-sm font-bold 
                    leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] font-display">
                        <Link to={'/sign-up'}>
                            <span className="truncate">Get Started</span>
                        </Link>
                    </button>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 
                    px-4 @[480px]:h-12 @[480px]:px-5 bg-slate-900 dark:bg-[#282e39] text-white dark:text-white text-sm font-bold leading-normal 
                    tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] font-display">
                        <Link to={'/info'}>
                            <span className="truncate">Learn More</span>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                <div className="border-t border-slate-700/30"></div>
            </div>
        </>
    )
}