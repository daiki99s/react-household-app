import React from "react";
import { RecordsProvider } from "./context/RecordsContext";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <RecordsProvider>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="report" element={<Report />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </HashRouter>
        </RecordsProvider>
    );
}

export default App;