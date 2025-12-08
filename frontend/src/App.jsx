import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"

export default function App() {
    return(
        <div className="min-h-screen bg-base-200">
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/sign-up" element={<SignUp/>} />
            </Routes>

            <Toaster />
        </div>
    )
}