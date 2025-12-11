import { Link } from 'react-router-dom'
import Post from '../components/Post'
import AnimatedList from '../components/ui/AnimatedList'
import Footer from '../components/Footer'

export default function GuestHome(){
    const posts = [
        {
            id: 1,
            message: "This is the very first message on the platform. Welcome everyone!",
            time: "Posted 2 days ago",
            title: "First Post!"
        },
        {
            id: 2,
            username: "Jane Doe",
            message: "Here is another example of a message post. The content is clearly separated and easy to read within its own card.",
            time: "Posted 1 day ago",
            title: "Another Message Title"
        },
        {
            id: 3,
            username: "Author's Name",
            message: "The main text content of the post. This is where the full message body would be displayed for the user to read. Message Body continued if necessary.",
            time: "Posted 5 hours ago",
            title: "Message Title"
        },
        {
            id: 4,
            username: "John Smith",
            message: "Just sharing some thoughts on the recent updates. Really enjoying the new features!",
            time: "Posted 3 hours ago",
            title: "Recent Updates"
        },
        {
            id: 5,
            username: "Sarah Johnson",
            message: "Has anyone tried the new features? I'm curious about the performance improvements.",
            time: "Posted 2 hours ago",
            title: "Performance Question"
        },
        {
            id: 6,
            username: "Mike Chen",
            message: "I've been working on a similar project and would love to share some insights with the community.",
            time: "Posted 1 hour ago",
            title: "Project Insights"
        }
    ]

    const postItems = posts.map((post) => (
        <Post 
            message={post.message}
            time={post.time}
        />
    ))

    return(
        <>
            <div className="flex flex-col gap-6 px-4 pt-10 pb-5 text-center @[480px]:gap-8">
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
            <Footer />
        </>
    )
}