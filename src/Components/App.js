import { BrowserRouter, Routes, Route} from "react-router-dom"
import { useState } from "react";

import Login from "./Login";
import Sign_up from "./Sign-up";
import UserContext from "./UserContext";

function App () {
    const  [loginDataReceived, setLoginDataReceived] = useState();
    


    return (
        <>
        <BrowserRouter>
            <UserContext.Provider value={{
                                            loginDataReceived, 
                                            setLoginDataReceived
                                        }}>
                <Routes>
                    <Route path="/" element={<Login />}/>
                    <Route path="/sign-up" element={<Sign_up />}/>
                    <Route path="/subscriptions" />
                    <Route path="/subscriptions/ID_DO_PLANO" />
                    <Route path="/home" />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
        
        </>
    )
}

export default App;