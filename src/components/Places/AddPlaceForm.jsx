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

  useEffect(() => {
    if (editingData) {
      setForm(editingData); // prefill when editing
    }
  }, [editingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(form); // pass back to Dashboard
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 rounded-lg shadow-md m-6">
      <h2 className="text-2xl font-semibold mb-6 text-center pb-4">
        {editingData ? "Edit Place" : "Add a New Place"}
      </h2>

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {/* Address full width */}
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

        {/* Row 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

        {/* Row 6 - Description */}
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

        {/* Row 7 */}
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

        {/* Row 8 */}
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

        {/* Row 9 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-medium text-gray-700">
            Profile Image *
            <input
              type="file"
              name="profileImage"
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            Pictures (Optional)
            <input
              type="file"
              name="pictures"
              multiple
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
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
