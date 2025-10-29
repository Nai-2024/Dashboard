import React, { useState, useEffect } from "react";

const categories = ["Place", "Hotel", "Restaurant"];
const certifications = ["Gold", "Silver", "Bronze"];

export default function AddPlaceForm({ onAddPlace, onCancel, editingData }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    address: "",
    certification: "",
    features: "",
    description: "",
    phoneNumber: "",
    email: "",
    website: "",
    reviewLink: "",
    profileImage: null,
    pictures: null,
  });

  // Prefill form when editing
// ✅ Prefill form when editing
  useEffect(() => {
    if (editingData) {
      setForm({
        name: editingData.name || "",
        category: editingData.category || "",
        city: editingData.city || "",
        state: editingData.state || "",
        country: editingData.country || "",
        postalCode: editingData.postalCode || "",
        address: editingData.address || "",
        certification: editingData.certification || "",
        // Convert features array → string for input field
        features: Array.isArray(editingData.features)
          ? editingData.features.join(", ")
          : editingData.features || "",
        description: editingData.description || "",
        phoneNumber: editingData.phoneNumber || "",
        email: editingData.email || "",
        website: editingData.website || "",
        reviewLink: editingData.reviewLink || "",
        profileImage: null, // reset to allow new file upload
        pictures: null,
      });
    } else {
      // Reset to empty when adding new place
      setForm({
        name: "",
        category: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        address: "",
        certification: "",
        features: "",
        description: "",
        phoneNumber: "",
        email: "",
        website: "",
        reviewLink: "",
        profileImage: null,
        pictures: null,
      });
    }
  }, [editingData]);


   // ✅ Handle input change (text, select, textarea)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files.length > 1 ? files : files[0] }));
  };

  // ✅ Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(form);
  };

return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md m-6">
      <h2 className="text-2xl font-semibold mb-6 text-center pb-4">
        {editingData ? "Edit Place" : "Add a New Place"}
      </h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <label className="flex flex-col font-medium text-gray-700">
            Place Name *
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter place name"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* Category */}
          <label className="flex flex-col font-medium text-gray-700">
            Category *
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          {/* Address */}
          <div className="col-span-2">
            <label className="flex flex-col font-medium text-gray-700">
              Address *
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
                className="mt-1 p-2 border border-gray-300 rounded-md text-sm w-full"
              />
            </label>
          </div>

          {/* City */}
          <label className="flex flex-col font-medium text-gray-700">
            City *
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* State */}
          <label className="flex flex-col font-medium text-gray-700">
            State/Province *
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state/province"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* Country */}
          <label className="flex flex-col font-medium text-gray-700">
            Country *
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* Postal Code */}
          <label className="flex flex-col font-medium text-gray-700">
            Postal Code *
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="Enter postal code"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* Features */}
          <label className="flex flex-col font-medium text-gray-700">
            Features *
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder="wifi, pool, spa"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          {/* Certification */}
          <label className="flex flex-col font-medium text-gray-700">
            Certification *
            <select
              name="certification"
              value={form.certification}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="">Select certification</option>
              {certifications.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Description */}
        <div>
          <label className="flex flex-col font-medium text-gray-700">
            Description *
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description (min 40 characters)"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm resize-y min-h-[80px]"
            />
          </label>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-medium text-gray-700">
            Phone Number *
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            Email *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>
        </div>

        {/* Optional Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-medium text-gray-700">
            Website (Optional)
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            Review Link (Optional)
            <input
              type="url"
              name="reviewLink"
              value={form.reviewLink}
              onChange={handleChange}
              placeholder="https://reviews.com/place"
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-medium text-gray-700">
            Profile Image *
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              required={!editingData} // Only required for new places
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            Pictures (Optional)
            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleFileChange}
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-md text-sm font-medium"
          >
            {editingData ? "Save Changes" : "Add Place"}
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
  );
}