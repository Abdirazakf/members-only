export default function Post({username, message, time, title}){
    return (
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 space-y-3 
            hover:border-slate-700/50 transition-colors">
            {title && (
                <h2 className="text-white text-xl font-bold">
                    {title}
                </h2>
            )}
            <div className="flex items-center gap-2">
                <h3 className="text-slate-300 text-sm font-semibold">
                    {username || 'Anonymous Member'}
                </h3>
                <span className="text-slate-600">•</span>
                <p className="text-slate-500 text-xs">
                    {time}
                </p>
            </div>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {message}
            </p>
        </div>
    )
}