import React from 'react'
import { IoIosAdd } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from '../hooks/useColorMode';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const { color, toggleColorMode } = useColorMode();


    return (
        <>
            <header className="container mx-auto px-10 py-4 flex justify-between items-center">


                {/* Here goes the navbar */}

                <div className='container mx-auto px-10'>
                    <div className='flex justify-between items-center h-16 flex-col sm:flex-row'>
                        <Link to='/'>
                            <h1 className='text-3xl
                         font-bold text-center 
                         text-transparent 
                         bg-clip-text 
                         bg-gradient-to-r 
                         from-blue-700 to-pink-500'
                            >PRODUCT STORE</h1>
                        </Link>

                        <div className='flex items-center space-x-2'>

                            {/* The button for creating a new product */}

                            <Link to='/create'>
                                <button className='btn btn-primary'>
                                    <IoIosAdd />
                                </button>
                            </Link>

                            {/* The button for changing the color mode */}

                            <button className='btn btn-secondary' onClick={toggleColorMode}>
                                {color === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar