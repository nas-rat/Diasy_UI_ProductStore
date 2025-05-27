import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import useProductStore from '../store/Products';


const CreatePage = () => {

    const { createProduct } = useProductStore();

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        imageUrl: ""
    });


    const handleAddNewProduct = async () => {
        const { success, message } = await createProduct(newProduct);
        if (success) {
            toast.success(message);
            setNewProduct({ name: "", price: "", imageUrl: "" });
        } else {
            toast.error(message);
        }
    }

    return (
        <>
            <div className='max-w-md mx-auto p-6'>
                <Toaster position="top-center" reverseOrder={false} />
                <h1 className='text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-pink-500 mb-6'>Create a new Product</h1>
                <div className='bg-base-100 dark:bg-neutral shadow-lg rounded-lg p-6'>
                    <div className='form-control mb-4'>
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="input input-bordered w-full"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />

                    </div>

                    <div className='form-control mb-4'>
                        <input
                            type="text"
                            placeholder="Product Price"
                            className="input input-bordered w-full"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />

                    </div>

                    <div className='form-control mb-4'>
                        <input
                            type="text"
                            placeholder="Product ImageUrl"
                            className="input input-bordered w-full"
                            value={newProduct.imageUrl}
                            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                        />

                    </div>

                    <button className='btn btn-primary w-full' onClick={handleAddNewProduct}>
                        Create Product
                    </button>


                </div>
            </div>
        </>
    )
}

export default CreatePage