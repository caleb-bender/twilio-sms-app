/**
 * App.tsx
 * Description: The main component of the react application that renders all other components.
 * Use Cases: It is injected first into the DOM
 */

import React, { useState } from "react";
import { BrowserRouter, Route, Routes, HashRouter } from "react-router-dom";
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
        <Toggle size="lg" checkedChildren="Dark" unCheckedChildren="Light" onChange={toggleTheme} style={{ position: "relative", top: "1rem", left: "1rem", zIndex: "100000" }}/>
        <CustomProvider theme={darkTheme ? "dark" : "light"}>
            <HashRouter basename="/">
                <Routes>
                    <Route path="/" element={<LoginPage darkTheme={darkTheme} />}/>
                    <Route path="/home" element={<HomePage darkTheme={darkTheme} />}/>
                </Routes>
            </HashRouter>
        </CustomProvider>
    </>;
}

export default App;