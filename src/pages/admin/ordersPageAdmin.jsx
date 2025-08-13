import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/paginator";
import toast from "react-hot-toast";

export default function OrdersPageAdmin() {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [popupVisible, setPopupVisible] = useState(false);
	const [clickedOrder, setClickedOrder] = useState(null);
	const [orderStatus, setOrderStatus] = useState("pending");
	const [orderNotes, setOrderNotes] = useState("");

	useEffect(() => {
		if (loading) {
			axios
				.get(
					`${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then((res) => {
					setOrders(res.data.orders);
					setTotalPages(res.data.totalPages);
					setLoading(false);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [loading, page, limit]);

	return (
		<div className="w-full h-full flex flex-col justify-between p-4 bg-gray-50 rounded-lg shadow-inner">
			{/* Table */}
			<div className="overflow-x-auto bg-white rounded-lg shadow-md">
				<table className="w-full border-collapse">
					<thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
						<tr>
							{["Order ID", "Email", "Name", "Address", "Phone", "Status", "Date", "Total"].map((header, i) => (
								<th key={i} className="p-3 text-left">{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{orders.map((order, index) => (
							<tr
								key={index}
								className="border-b hover:bg-indigo-50 cursor-pointer transition-all"
								onClick={() => {
									setOrderStatus(order.status);
									setOrderNotes(order.notes);
									setClickedOrder(order);
									setPopupVisible(true);
								}}
							>
								<td className="p-3 font-semibold">{order.orderID}</td>
								<td className="p-3">{order.email}</td>
								<td className="p-3">{order.name}</td>
								<td className="p-3">{order.address}</td>
								<td className="p-3">{order.phone}</td>
								<td className="p-3 capitalize">
									<span
										className={`px-2 py-1 rounded-full text-sm font-medium ${
											order.status === "pending"
												? "bg-yellow-100 text-yellow-800"
												: order.status === "completed"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{order.status}
									</span>
								</td>
								<td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
								<td className="p-3 text-right font-semibold">
									{order.total.toLocaleString("en-US", {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Popup Modal */}
			{popupVisible && clickedOrder && (
				<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
					<div className="w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 relative">
						{/* Save Button */}
						{(orderStatus !== clickedOrder.status || orderNotes !== clickedOrder.notes) && (
							<button
								className="absolute top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
								onClick={async () => {
									setPopupVisible(false);
									try {
										await axios.put(
											`${import.meta.env.VITE_BACKEND_URL}/api/orders/${clickedOrder.orderID}`,
											{ status: orderStatus, notes: orderNotes },
											{
												headers: {
													Authorization: `Bearer ${localStorage.getItem("token")}`,
												},
											}
										);
										toast.success("Order updated successfully");
										setLoading(true);
									} catch (err) {
										console.error(err);
										toast.error("Failed to update order");
									}
								}}
							>
								Save Changes
							</button>
						)}

						{/* Close Button */}
						<button
							className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow hover:bg-red-700 transition"
							onClick={() => setPopupVisible(false)}
						>
							✕
						</button>

						{/* Order Details */}
						<h2 className="text-2xl font-bold mb-4 text-indigo-700">Order Details</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
							<p><strong>Order ID:</strong> {clickedOrder.orderID}</p>
							<p><strong>Name:</strong> {clickedOrder.name}</p>
							<p><strong>Email:</strong> {clickedOrder.email}</p>
							<p><strong>Phone:</strong> {clickedOrder.phone}</p>
							<p className="md:col-span-2"><strong>Address:</strong> {clickedOrder.address}</p>
							<p><strong>Total:</strong> Rs. {clickedOrder.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
							<div className="flex items-center">
								<strong>Status:</strong>
								<select
									className="ml-3 border rounded px-2 py-1"
									value={orderStatus}
									onChange={(e) => setOrderStatus(e.target.value)}
								>
									<option value="pending">Pending</option>
									<option value="completed">Completed</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</div>
							<div className="md:col-span-2">
								<strong>Notes:</strong>
								<textarea
									className="w-full border rounded p-2 mt-1"
									value={orderNotes}
									onChange={(e) => setOrderNotes(e.target.value)}
								/>
							</div>
							<p><strong>Date:</strong> {new Date(clickedOrder.date).toLocaleString()}</p>
						</div>

						{/* Order Items */}
						<h3 className="text-lg font-semibold mb-2">Items</h3>
						<div className="space-y-3 max-h-40 overflow-y-auto">
							{clickedOrder.items.map((item, i) => (
								<div key={i} className="flex items-center gap-4 border p-3 rounded-lg shadow-sm">
									<img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border" />
									<div className="flex-1">
										<p className="font-semibold">{item.name}</p>
										<p className="text-sm text-gray-600">Qty: {item.qty}</p>
										<p className="text-sm text-gray-600">Price: Rs. {item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
										<p className="text-sm font-medium">Subtotal: Rs. {(item.qty * item.price).toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Pagination */}
			<div className="mt-4">
				<Paginator
					currentPage={page}
					totalPages={totalPages}
					setCurrentPage={setPage}
					limit={limit}
					setLimit={setLimit}
					setLoading={setLoading}
				/>
			</div>
		</div>
	);
}
