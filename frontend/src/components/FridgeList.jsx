import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";


const FridgeList = ({ items, fetchItems }) => {
  // Function to delete an item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/FridgeItems/${id}`);
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Function to determine the expiry status
  const getExpiryStatus = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return { status: "Expired", color: "bg-red-200", iconColor: "text-red-500" };
    } else if (diffDays <= 3) {
      return { status: "Expiring Soon", color: "bg-yellow-200", iconColor: "text-gray-500" };
    } else {
      return { status: "Healthy", color: "bg-green-200", iconColor: "text-gray-500" };
    }
  };

  return (
    <div className="mt-6">
      
      <div className="overflow-x-auto">
      <div className="flex justify-between mb-2 ml-[600px] font-semibold">
        <span className="text-gray-600 mx-auto">Total items — {items.length}</span>
      </div>
        <table className="w-[720px] mx-auto border-separate" style={{ borderSpacing: "0 10px" }}>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => {
                const { status, color, iconColor } = getExpiryStatus(item.expiryDate);
                return (
                  <tr key={item.id} className="border-b hover:bg-gray-50 my-2 p-6 bg-white rounded-xl shadow-sm">
                    <td className="inline-block w-36 text-center font-semibold px-6 py-4 flex items-center">
                      {item.name}
                    </td>
                    <td className="text-gray-600 px-4 py-2">
                      <span className="">Expiry Date -- </span>
                      {new Date(item.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className={`inline-block w-36 text-center px-2 py-1 rounded-full ${color}`}>{status}</span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteItem(item.id)}
                        className={`hover:underline flex items-center ${iconColor}`}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No items in the fridge. Add some to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FridgeList;
