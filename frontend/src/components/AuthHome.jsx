import { useState } from 'react'
import { useAuthStore } from '../states/useAuthStore'
import {BadgePlus, Users, ChevronDown, PenLine} from 'lucide-react'
import Footer from '../components/Footer'
import Post from './Post'
import AnimatedList from './ui/AnimatedList'

export default function AuthHome(){
    const {user} = useAuthStore()
    const [selected, setSelected] = useState('Select a Circle')
    const [isOpen, setIsOpen] = useState(false)

    // Sample circles
    const circles = [
        'Select a Circle',
        'Tech Discussion',
        'Book Club',
        'Gaming Community',
        'Photography'
    ]

    // Sample posts
    const posts = [
        {
            id: 1,
            username: `${user?.first_name} ${user?.last_name}`,
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
        }
    ]

    const postItems = posts.map((post) => (
        <Post 
            username={post.username}
            message={post.message}
            time={post.time}
        />
    ))

    const handleCircleSelect = (circle) => {
        setSelected(circle)
        setIsOpen(false)
    }

    return (
        <>
            <main className="flex w-full flex-1 justify-center px-4 py-8 md:px-6">
                <div className="w-full max-w-3xl">
                    <div className="p-6 bg-slate-800/30 dark:bg-slate-800/30 rounded-xl shadow-sm border border-slate-700/50 dark:border-slate-700/50 mb-8">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="relative">
                                    <button 
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="inline-flex w-full sm:w-auto justify-between items-center gap-2 rounded-lg bg-slate-900/50 dark:bg-slate-900/50 px-4 py-2.5 text-lg font-bold text-white shadow-sm ring-1 ring-inset ring-slate-700/50 hover:bg-slate-900/70 transition-colors min-w-[200px]"
                                    >
                                        <span>{selected}</span>
                                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                            
                                    {isOpen && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setIsOpen(false)}
                                            />
                        
                                            <div className="absolute left-0 z-20 mt-2 w-full sm:w-56 origin-top-left rounded-lg bg-slate-900 shadow-lg ring-1 ring-slate-700/50 focus:outline-none">
                                                <div className="py-1">
                                                    {circles.map((circle, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleCircleSelect(circle)}
                                                            className={`block w-full text-left px-4 py-2 text-sm ${
                                                                selected === circle
                                                                    ? 'bg-slate-800 text-white font-semibold'
                                                                    : 'text-slate-300 hover:bg-slate-800/50'
                                                            } transition-colors`}
                                                        >
                                                            {circle}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-400 dark:text-slate-400 max-w-md">
                                    Recent posts from the community. See what's on everyone's mind.
                                </p>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700/50 dark:border-slate-700/50 bg-transparent px-4 text-sm font-bold text-white dark:text-white hover:bg-slate-700/30 transition-colors">
                                    <Users className='w-4 h-4'/>
                                    <span className="hidden sm:inline">Join a Circle</span>
                                    <span className="sm:hidden">Join</span>
                                </button>
                                <button className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a4df7] px-4 text-sm font-bold text-white hover:bg-[#2d3ec7] transition-colors">
                                    <BadgePlus className='w-4 h-4'/>
                                    <span className="hidden sm:inline">Create New</span>
                                    <span className="sm:hidden">Create</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <AnimatedList
                    items={postItems}
                    showGradients={false}
                    enableArrowNavigation={false}
                    displayScrollbar={false}
                    initialSelectedIndex={-1}
                    className='w-full'
                    />

                </div>
            </main>
            
            <div className="fixed bottom-8 right-8">
                <button className="flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#3a4df7] pl-5 pr-6 text-white shadow-lg hover:bg-[#2d3ec7] transition-colors">
                    <PenLine className="w-5 h-5" />
                    <span className="truncate text-base font-bold hidden sm:inline">Create New Message</span>
                    <span className="truncate text-base font-bold sm:hidden">Create</span>
                </button>
            </div>

            <Footer/>
        </>
    )
}