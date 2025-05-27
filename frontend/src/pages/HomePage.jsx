import React, { useEffect } from 'react'
import ProductCard from '../app_components/ProductCard'
import useProductStore from '../store/Products.js'
import { Link } from 'react-router-dom';

const HomePage = () => {

    const { products, fetchProducts } = useProductStore();

    useEffect(() => { fetchProducts() }, [])
    console.log(products);

    return (
        <div className='max-w-7xl mx-auto py-12 px-4'>
            <h1 className='text-3xl font-bold text-center mb-4'>Current Products</h1>

            {products.length === 0 && (
                <div className='text-center'>
                    <Link to="/create">
                        <p className='text-gray-500'>Want to Add products?</p>
                    </Link>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>

                {products.map((product) =>
                    (<ProductCard key={product._id} product={product} />))
                }

            </div>

        </div>
    )
}

export default HomePage