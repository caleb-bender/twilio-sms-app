/**
 * App.tsx
 * Description: The main component of the react application that renders all other components.
 * Use Cases: It is injected first into the DOM
 */

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomProvider, Toggle } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {

    const [darkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(!darkTheme);
    };

    return <>
        <Toggle size="lg" checkedChildren="Light" unCheckedChildren="Dark" onChange={toggleTheme} style={{ position: "fixed", top: "1rem", left: "1rem" }}/>
        <CustomProvider theme={darkTheme ? "dark" : "light"}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                </Routes>
            </BrowserRouter>
        </CustomProvider>
    </>;
}

export default App;