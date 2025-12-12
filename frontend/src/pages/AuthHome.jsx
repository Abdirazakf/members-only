import { useState, useEffect } from 'react'
import { useAuthStore } from '../states/useAuthStore'
import { Link } from 'react-router'
import {BadgePlus, Users, ChevronDown, PenLine} from 'lucide-react'
import Post from '../components/Post'
import AnimatedList from '../components/ui/AnimatedList'
import Modal from '../components/Modal'
import toast from 'react-hot-toast'

export default function AuthHome(){
    const {user} = useAuthStore()
    const [selected, setSelected] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isModalOpen, setModalOpen] = useState(false)
    const [circles, setCircles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchCircles = async () => {
            try {
                const response = await fetch('/api/circle/list', {
                    credentials: 'include'
                })

                const result = await response.json()

                if (response.ok && result.success) {
                    setCircles(result.circles)
                    if (result.circles.length > 0) {
                        setSelected(result.circles[0])
                    }
                } else {
                    toast.error('Failed to load circles')
                }
            } catch (error) {
                console.error('Error fetching circles:', error)
                toast.error('Failed to load circles')
            } finally {
                setLoading(false)
            }
        }

        fetchCircles()
    }, [])

    const posts = [
        {
            id: 1,
            username: `${user.first_name} ${user.last_name}`,
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
            key={post.id}
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
            <div className="flex justify-center px-4 pt-8 md:px-6">
                <div className="w-full max-w-3xl">
                    <div className="p-6 bg-slate-800/30 rounded-xl shadow-sm border border-slate-700/50 mb-8">
                        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="relative">
                                    {loading ? (
                                        <div className="inline-flex w-full sm:w-auto justify-between items-center gap-2 rounded-lg bg-slate-900/50 px-4 py-2.5 shadow-sm ring-1 ring-inset ring-slate-700/50 min-w-[200px]">
                                            <div className="h-7 w-32 bg-slate-700/50 animate-pulse rounded"></div>
                                            <ChevronDown className="w-5 h-5 text-slate-600" />
                                        </div>
                                    ) : (
                                        <button 
                                            type="button"
                                            onClick={() => setIsOpen(!isOpen)}
                                            disabled={circles.length === 0}
                                            className="inline-flex w-full sm:w-auto justify-between items-center gap-2 rounded-lg bg-slate-900/50 px-4 py-2.5 text-lg font-bold text-white shadow-sm ring-1 ring-inset ring-slate-700/50 hover:bg-slate-900/70 transition-colors min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <span>
                                                {circles.length === 0 ? 'No Circles' :
                                                    selected ? selected.name : 'Select a Circle'}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}

                                    {isOpen && circles.length > 0 && (
                                        <>
                                            <div 
                                                className="fixed inset-0 z-10" 
                                                onClick={() => setIsOpen(false)}
                                            />

                                            <div className="absolute left-0 z-20 mt-2 w-full sm:w-64 origin-top-left rounded-lg bg-slate-900 shadow-lg ring-1 ring-slate-700/50 focus:outline-none max-h-64 overflow-y-auto">
                                                <div className="py-1">
                                                    {circles.map((circle) => (
                                                        <button
                                                            key={circle.id}
                                                            onClick={() => handleCircleSelect(circle)}
                                                            className={`block w-full text-left px-4 py-2 text-sm ${
                                                                selected.id === circle.id
                                                                    ? 'bg-slate-800 text-white font-semibold'
                                                                    : 'text-slate-300 hover:bg-slate-800/50'
                                                            } transition-colors`}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="font-medium">{circle.name}</span>
                                                                {circle.description && (
                                                                    <span className="text-xs text-slate-500 truncate">
                                                                        {circle.description}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {loading ? (
                                    <div className="space-y-2 max-w-md">
                                        <div className="h-4 w-full bg-slate-700/50 animate-pulse rounded"></div>
                                        <div className="h-4 w-3/4 bg-slate-700/50 animate-pulse rounded"></div>
                                    </div>
                                ) : (
                                    <p className="text-sm sm:text-base font-normal leading-relaxed text-slate-400 max-w-md">
                                        {selected 
                                            ? `${selected.description || "See posts from the community. See what's on everyone's mind."}`
                                            : 'Select a circle to view messages'
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <Link to={'/join'} className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700/50 bg-transparent px-4 text-sm font-bold text-white hover:bg-slate-700/30 transition-colors">
                                    <Users className='w-4 h-4'/>
                                    <span className="hidden sm:inline">Join a Circle</span>
                                    <span className="sm:hidden">Join</span>
                                </Link>
                                <Link to={'/create'} className="flex h-10 flex-1 sm:flex-initial cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#3a4df7] px-4 text-sm font-bold text-white hover:bg-[#2d3ec7] transition-colors">
                                    <BadgePlus className='w-4 h-4'/>
                                    <span className="hidden sm:inline">Create New</span>
                                    <span className="sm:hidden">Create</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 pb-16">
                <div className="max-w-7xl mx-auto space-y-6">
                    {circles.length === 0 && !loading ? (
                        <div className="text-center py-12">
                            <p className="text-slate-400 text-lg mb-4">You're not a member of any circles yet</p>
                        </div>
                    ) : (
                        <AnimatedList
                            items={postItems}
                            showGradients={true}
                            enableArrowNavigation={false}
                            displayScrollbar={false}
                            className='w-full max-w-none'
                            initialSelectedIndex={-1}
                        />
                    )}
                </div>
            </div>
            
            <div className="fixed bottom-8 right-8 z-30">
                <button 
                    onClick={() => setModalOpen(true)}
                    disabled={!selected}
                    className="flex h-14 cursor-pointer items-center justify-center gap-3 rounded-full bg-[#3a4df7] pl-5 pr-6 text-white shadow-lg hover:bg-[#2d3ec7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <PenLine className="w-5 h-5" />
                    <span className="truncate text-base font-bold hidden sm:inline">Create New Message</span>
                    <span className="truncate text-base font-bold sm:hidden">Create</span>
                </button>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
    )
}