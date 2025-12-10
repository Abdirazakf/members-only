import { useAuthStore } from '../states/useAuthStore'
import GuestHome from '../components/GuestHome'
import AuthHome from '../components/AuthHome'
import { ThreeDot } from 'react-loading-indicators'

export default function Homepage(){
    const {auth, loading} = useAuthStore()

    if (loading){
        <div className="flex items-center justify-center min-h-screen">
            <ThreeDot color="white" size="medium" />
        </div>
    }

    return auth ? <AuthHome /> : <GuestHome />
}