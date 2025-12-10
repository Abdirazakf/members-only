import { Link } from 'react-router-dom'
import Post from './Post'
import AnimatedList from './ui/AnimatedList'

export default function GuestHome(){
    const posts = [
        {
            id: 1,
            message: "I've been thinking a lot about the future of remote work. It's amazing how much has changed in just a few years.",
            time: "Posted 2 hours ago"
        },
        {
            id: 2,
            message: "Just finished a great book and I need recommendations! What's everyone reading?",
            time: "Posted 5 hours ago"
        },
        {
            id: 3,
            message: "Thinking about starting a new side project with ExpressJS and PostgreSQL. Any cool project ideas to get the inspiration flowing?",
            time: "Posted 8 hours ago"
        },
        {
            id: 4,
            message: "What's the best way to manage state in a complex React application? Looking for opinions beyond the usual Redux vs. Context debate.",
            time: "Posted 1 day ago"
        }
    ]

    const postItems = posts.map((post) => (
        <Post 
            username={post.username}
            message={post.message}
            time={post.time}
        />
    ))

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
                    <Link to={'/sign-up'}>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg 
                        h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#3a4df7] text-white text-sm font-bold 
                        leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                            <span className="truncate">Get Started</span>
                        </button>
                    </Link>
                    <Link to={'/info'}>
                        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 
                        px-4 @[480px]:h-12 @[480px]:px-5 bg-slate-800 text-white text-sm font-bold leading-normal 
                        tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                            <span className="truncate">Learn More</span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 my-8 sm:my-12">
                <div className="max-w-7xl mx-auto">
                    <div className="border-t border-slate-700/20"></div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-16">
                <div className="max-w-7xl mx-auto space-y-6">
                    <h2 className="text-white text-2xl sm:text-3xl font-bold">Recent Posts</h2>

                    <AnimatedList
                    items={postItems}
                    showGradients={true}
                    enableArrowNavigation={false}
                    displayScrollbar={false}
                    className='w-full max-w-none'
                    initialSelectedIndex={-1}
                    />
                </div>
            </div>
        </>
    )
}