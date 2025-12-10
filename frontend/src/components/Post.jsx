export default function Post({username, message, time}){
    return (
        <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 space-y-3 
        hover:border-slate-700/50 transition-colors">
            <h3 className="text-white text-lg font-semibold">
                {username || 'Anonymous Member'}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {message}
            </p>
            <p className="text-slate-500 text-sm">
                {time}
            </p>
        </div>
    )
}