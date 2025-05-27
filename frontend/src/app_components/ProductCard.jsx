import React, { useState } from 'react'
import tree from '../Images/tree.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useProductStore from '../store/Products';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
    const { deleteProduct, updateProduct } = useProductStore();

    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: Number(product.price),
        imageUrl: product.imageUrl,
    });

    const handleUpdate = async () => {
        const { success, message } = await updateProduct(product._id, updatedProduct);

        if (success) {
            toast.success(message);

            const modal = document.getElementById(`update_modal_${product._id}`);
            if (modal) modal.close();
        } else {
            toast.error(message);
        }

    }

    const handleDelete = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (success) {
            toast.success(message);
        } else {
            toast.error(message);
        }
    }
    return (
        <div className='card shadow-lg w-full bg-base-100 transition-transform hover:scale-105 hover:shadow-xl duration-300'>
            <figure>
                <img src={product.imageUrl} alt='Image' className='object-cover w-full h-52' />
            </figure>

            <div className='card-body'>
                <h2 className='card-title'>{product.name}</h2>
                <p className='text-gray-500 text-lg font-semibold'>{product.price}$</p>
            </div>


            {/* Icons for edit and delete */}
            <div className='card-actions justify-end space-x-1 p-3'>
                <button className='btn btn-primary'
                    onClick={() => document.getElementById(`update_modal_${product._id}`).showModal()}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className='btn btn-secondary'
                    onClick={() => handleDelete(product._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>

            {/* Update Product Modal */}

            <dialog id={`update_modal_${product._id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Update Product</h3>
                    <div className="form-control mb-3">
                        <input
                            type="text"
                            placeholder="Product name"
                            className="input input-bordered w-full"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                        />
                    </div>
                    <div className="form-control mb-3">
                        <input
                            type="number"
                            placeholder="Product price"
                            className="input input-bordered w-full"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: Number(e.target.value) })}
                        />
                    </div>
                    <div className="form-control mb-3">
                        <input
                            type="text"
                            placeholder="Image URL"
                            className="input input-bordered w-full"
                            value={updatedProduct.imageUrl}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                        />
                    </div>
                    <div className="modal-action">
                        <form method="dialog" className="space-x-2">
                            <button className="btn btn-outline">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ProductCard