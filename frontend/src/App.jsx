import { useEffect } from "react"
import { useAuthStore } from "./states/useAuthStore"
import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import GuestRoute from './components/GuestRoute'
import AuthRoute from './components/AuthRoute'
import Navbar from "./components/Navbar"
import Homepage from "./pages/Hompage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Info from './pages/Info'

export default function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return(
        <div className="min-h-screen bg-slate-950 scheme-dark">
            <Navbar />
            <Routes>
                <Route path="/login" 
                element={
                    <GuestRoute>
                        <Login/>
                    </GuestRoute>
                } />

                <Route path="/sign-up" 
                element={
                    <GuestRoute>
                        <SignUp/>
                    </GuestRoute>
                } />

                <Route path="/info" element={<Info />} />
                
                <Route path="/" element={<Homepage/>} />
            </Routes>

            <Toaster />
        </div>
    )
}