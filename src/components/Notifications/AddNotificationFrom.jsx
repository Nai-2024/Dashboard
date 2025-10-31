import React, { useState } from "react";

export default function AddNotificationForm({ onAddNotification, onCancel }) {
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    category: "",
  });

  const categories = ["Place", "Hotel", "Restaurant"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      alert("Please fill all required fields.");
      return;
    }

    const newNotification = {
      ...form,
      time: new Date().toLocaleString(),
    };

    onAddNotification(newNotification);
    setForm({ image: "", title: "", description: "", category: "" });
  };

  return (
    <div className="flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-gray-200 p-7 pt-0 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-semibold text-center m-6">
          Add a New Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notification title"
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full p-2.5 border border-gray-300 rounded-md text-sm bg-white 
                         focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter notification description"
              required
              className="w-full border rounded-lg px-4 py-2 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
            >
              Add Notification
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2.5 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
