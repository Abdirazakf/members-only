import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

export default function App() {
    return(
        <div className="min-h-screen bg-slate-950 scheme-dark">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/sign-up" element={<SignUp/>} />
            </Routes>

            <Toaster />
        </div>
    )
}