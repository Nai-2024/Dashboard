import React, { useState } from "react";

export default function AddNotificationForm({ onAddNotification, onCancel }) {
  const [form, setForm] = useState({
    profile: "",
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Single handler for all fields
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setForm((prev) => ({ ...prev, profile: files[0] })); // Save File object
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.profile) newErrors.profile = "Please upload an image.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const newNotification = {
      title: form.title,
      description: form.description,
      profile: form.profile,
    };

    onAddNotification(newNotification);

    setForm({ profile: "", title: "", description: "" });
    setErrors({});
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title}</p>
            )}
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
              className="w-full border rounded-lg px-4 py-2 min-h-[200px] focus:ring-2 focus:ring-black"
            ></textarea>
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Upload Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            {errors.profile && (
              <p className="text-red-600 text-sm mt-1">{errors.profile}</p>
            )}
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
