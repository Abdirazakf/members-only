import { Navigate } from 'react-router'
import {useAuthStore} from '../states/useAuthStore'
import {ThreeDot} from 'react-loading-indicators'

export default function GuestRoute({children}) {
    const {auth, loading} = useAuthStore()

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <ThreeDot color="white" size="medium" />
            </div>
        )
    }

    if (auth){
        return <Navigate to={'/'} replace />
    }

    return children
}