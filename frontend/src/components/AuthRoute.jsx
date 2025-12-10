import {Navigate} from 'react-router-dom'
import { useAuthStore } from '../states/useAuthStore'
import { ThreeDot } from 'react-loading-indicators'

export default function AuthRoute({ children }){
    const { auth, loading } = useAuthStore()

    if (loading){
        <div className="flex items-center justify-center min-h-screen">
            <ThreeDot color="white" size="medium" />
        </div>
    }

    if (!auth){
        return <Navigate to={"/login"} replace />
    }

    return children
}