import React from "react";
import { RecordsProvider } from "./context/RecordsContext";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Report from "./pages/Report";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoMatch from "./pages/NoMatch";

function App() {
    return (
        <RecordsProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AppLayout />}>
                        <Route index element={<Home />} />
                        <Route path="report" element={<Report />} />
                        <Route path="*" element={<NoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </RecordsProvider>
    );
}

export default App;
