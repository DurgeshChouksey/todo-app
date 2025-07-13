import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import CreateTodo from "./pages/CreateTodo";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path={"/login"} element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create" element={<CreateTodo />} />
                <Route path="/create/:id" element={<CreateTodo />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
