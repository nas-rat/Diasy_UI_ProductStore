import { create } from 'zustand';

const useProductStore = create((set) => ({

    products: [],

    // function to fetch products from the API
    fetchProducts: async () => {

        try {
            //const res = await fetch('http://localhost:5000/api/products');
            const res = await fetch('/api/products');
            if (!res.ok) {
                console.log("Error fetching products", res.statusText);
                return;
            }
            const data = await res.json();
            set({ products: data.data || [] });

        } catch (error) {
            console.log("fetch products error", error);
        }

    },

    deleteProduct: async (pid) => {
        try {
            // const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
            //     method: 'DELETE',
            // });\

            const res = await fetch(`/api/products/${pid}`, {
                method: 'DELETE',
            });

            const data = await res.json();


            if (!data.message) {
                console.log("Error deleting product", data.message);
                return { success: false, error: data.message };
            }

            set((state) => ({
                products: state.products.filter((product) => product._id !== pid),
            }));

            return { success: true, message: "Product deleted successfully" };

        } catch (error) {
            console.log("delete product error", error);
            return { success: false, error: "Error deleting product" };

        }
    },

    updateProduct: async (pid, product) => {
        try {

            const res = await fetch(`/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (!res.ok) {
                console.log("Error updating product", res.statusText);
                return { success: false, error: res.statusText };
            }

            const data = await res.json();

            set((state) => ({
                products: state.products.map((p) =>
                    p._id === pid ? data.data : p
                ),
            }));

            return { success: true, message: "Product updated successfully" };

        } catch (error) {
            console.log("update product error", error);
            return { success: false, error: "Error updating product" };
        }
    },

    createProduct: async (newProduct) => {

        if (newProduct.name === "" || newProduct.price === "" || newProduct.imageUrl === "") {
            return { success: false, error: "All fields are required" };
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                console.log(`Error creating product${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            set((state) => ({
                products: [...state.products, data.data],
            }));
            return { success: true, message: "Product created successfully" };
        } catch (error) {
            console.log("create product error", error);
            return { success: false, message: "Network error. Try again later" };

        }
    }
}));

export default useProductStore;