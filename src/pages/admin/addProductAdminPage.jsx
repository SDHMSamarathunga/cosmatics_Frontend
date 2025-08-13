import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AddProductPage() {
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [alternativeNames, setAlternativeNames] = useState("");
	const [labelledPrice, setLabelledPrice] = useState("");
	const [price, setPrice] = useState("");
	const [images, setImages] = useState([]);
	const [description, setDescription] = useState("");
	const [stock, setStock] = useState("");
	const [isAvailable, setIsAvailable] = useState(true);
	const [category, setCategory] = useState("cream");
    const navigate = useNavigate()

    async function handleSubmit(){
		const promisesArray = []
		for(let i=0; i<images.length; i++){
			const promise = uploadFile(images[i])
			promisesArray[i] = promise
		}
		const responses = await Promise.all(promisesArray)
		console.log(responses)		
        const altNamesInArray = alternativeNames.split(",")
        const productData = {
            productId: productId,
            name: productName,
            altNames: altNamesInArray,
            labelledPrice: labelledPrice,
            price: price,
            images: responses,
            description: description,
            stock: stock,
            isAvailable: isAvailable,
            category: category
        }
        const token = localStorage.getItem("token");
        if(token == null){
            navigate("/login");
            return;
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", productData, 
            {
                headers:{
                    Authorization: "Bearer "+token
                }
            }
        ).then(
            (res)=>{
                console.log("Product added successfully");
                console.log(res.data);
                toast.success("Product added successfully");
                navigate("/admin/products");
            }
        ).catch(
            (error)=>{
                console.error("Error adding product:", error);
                toast.error("Failed to add product");              
            }
        )
        console.log(productData);
    }

	return (
		<div className="w-full min-h-screen bg-gray-100 flex justify-center items-center py-8">
			<div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 flex flex-wrap gap-6">
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Product ID</label>
					<input
						type="text"
						value={productId}
						onChange={(e) => setProductId(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full sm:w-80 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Product Name</label>
					<input
						type="text"
						value={productName}
						onChange={(e) => setProductName(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Alternative Names</label>
					<input
						type="text"
						value={alternativeNames}
						onChange={(e) => setAlternativeNames(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Labelled Price</label>
					<input
						type="number"
						value={labelledPrice}
						onChange={(e) => setLabelledPrice(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Price</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Images</label>
					<input
						multiple
						type="file"
						onChange={(e) => setImages(e.target.files)}
						className="w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
					/>
				</div>
				<div className="w-full flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Description</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
					></textarea>
				</div>
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Stock</label>
					<input
						type="number"
						value={stock}
						onChange={(e) => setStock(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Is Available</label>
					<select
						value={isAvailable}
						onChange={(e) => setIsAvailable(e.target.value === "true")}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value={true}>Available</option>
						<option value={false}>Not Available</option>
					</select>
				</div>
				<div className="w-full sm:w-64 flex flex-col gap-2">
					<label className="text-sm font-medium text-gray-700">Category</label>
					<select
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="cream">Cream</option>
						<option value="face wash">Face Wash</option>
						<option value="soap">Soap</option>
						<option value="fragrance">Fragrance</option>
					</select>
				</div>
				<div className="w-full flex justify-center gap-4 py-6">
					<Link
						to="/admin/products"
						className="w-48 h-12 bg-gray-200 text-gray-700 border border-gray-300 rounded-lg flex justify-center items-center hover:bg-gray-300 transition-colors duration-200"
					>
						Cancel
					</Link>
					<button
						onClick={handleSubmit}
						className="w-48 h-12 bg-blue-600 text-white rounded-lg flex justify-center items-center hover:bg-blue-700 transition-colors duration-200"
					>
						Add Product
					</button>
				</div>
			</div>
		</div>
	);
}