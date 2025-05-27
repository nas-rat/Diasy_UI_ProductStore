import React from 'react'
import Navbar from './app_components/Navbar';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

const App = () => {

    return (
        <>
            <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>
                <Toaster position="top-center" reverseOrder={false} />
            </div>
        </>
    )
}

export default App