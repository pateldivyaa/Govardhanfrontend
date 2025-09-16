import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Edit, Check, X } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/inventory";

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", kg: "", imgFile: null });
  const [editingId, setEditingId] = useState(null);
  const [editItem, setEditItem] = useState({ name: "", kg: "", imgFile: null });

  // ✅ Load items from server
  useEffect(() => {
    axios.get(API_URL).then((res) => setItems(res.data));
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewItem((prev) => ({ ...prev, imgFile: file }));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditItem((prev) => ({ ...prev, imgFile: file }));
    }
  };

  // ✅ Add new item
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.kg || !newItem.imgFile) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newItem.name);
    formData.append("kg", newItem.kg);
    formData.append("img", newItem.imgFile);

    const res = await axios.post(API_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setItems((prev) => [...prev, res.data]);
    setNewItem({ name: "", kg: "", imgFile: null });
  };

  // ✅ Delete item
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ Start editing
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditItem({ name: item.name, kg: item.kg, imgFile: null });
  };

  // ✅ Save edit
  const handleSaveEdit = async (id) => {
    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("kg", editItem.kg);
    if (editItem.imgFile) formData.append("img", editItem.imgFile);

    const res = await axios.put(`${API_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setItems((prev) =>
      prev.map((item) => (item._id === id ? res.data : item))
    );
    setEditingId(null);
  };

  const handleCancelEdit = () => setEditingId(null);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

      {/* Add Item Form */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Add New Item</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={newItem.name}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border rounded-md px-3 py-2 w-full"
          />
          <input
            type="number"
            name="kg"
            placeholder="KG Available"
            value={newItem.kg}
            onChange={handleChange}
            className="border rounded-md px-3 py-2 w-full"
          />
        </div>
        <button
          onClick={handleAddItem}
          className="mt-4 flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> Add Item
        </button>
      </div>

      {/* Inventory List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3">Inventory Items</h3>
        {items.length === 0 ? (
          <p className="text-gray-500">No items added yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex flex-col items-center text-center shadow-sm"
              >
                {editingId === item._id ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={editItem.name}
                      onChange={handleEditChange}
                      className="border rounded-md px-2 py-1 mb-2 w-full"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleEditFileChange}
                      className="border rounded-md px-2 py-1 mb-2 w-full"
                    />
                    <input
                      type="number"
                      name="kg"
                      value={editItem.kg}
                      onChange={handleEditChange}
                      className="border rounded-md px-2 py-1 mb-2 w-full"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={() => handleSaveEdit(item._id)}
                        className="flex items-center px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
                      >
                        <Check className="h-4 w-4 mr-1" /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500 text-sm"
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={`http://localhost:5000${item.img}`} // ✅ serve from backend
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-md mb-3"
                    />
                    <h4 className="font-bold text-lg">{item.name}</h4>
                    <p className="text-gray-600">{item.kg} KG Available</p>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
