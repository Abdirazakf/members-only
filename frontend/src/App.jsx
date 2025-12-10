import { useEffect } from "react"
import { useAuthStore } from "./states/useAuthStore"
import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Hompage"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

export default function App() {
    const checkAuth = useAuthStore((state) => state.checkAuth)

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    return(
        <div className="min-h-screen bg-slate-950 scheme-dark">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/sign-up" element={<SignUp/>} />
                <Route path="/" element={<Homepage/>} />
            </Routes>

            <Toaster />
        </div>
    )
}