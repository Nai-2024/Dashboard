import React, { useState, useEffect } from "react";

// Validation regex patterns
const NAME_REGEX = /^[A-Za-z\s-]+$/; // For name, city, state
const COUNTRY_REGEX = /^[A-Za-z\s]+$/; // For country
const POSTAL_CODE_REGEX = /^[A-Za-z0-9\s-]{3,10}$/; // Supports all kind of postal codes
const PHONE_REGEX = /^[0-9+\-\s]{7,20}$/; // Phone (digits, +, -, spaces)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format
const URL_REGEX = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/; // Optional https://
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_MB = 2; // 2 MB limit

const categories = ["Place", "Hotel", "Restaurant"];
const certifications = ["Gold", "Silver", "Bronze"];

// form’s data model
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

  // errors State – Handling Validation Messages
  const [errors, setErrors] = useState({});

  // Prefill form when editing
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
        profileImage: null,
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

  // Handle text and select input changes with capitalization
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    // Automatically capitalizes the first lette
    if (["name", "city", "state", "country"].includes(name)) {
      newValue = value.charAt(0).toUpperCase() + value.slice(1);
    }
    // Converts postal code to uppercase
    if (name === "postalCode") {
      newValue = value.toUpperCase();
    }
    // Uses setForm to update the state immutably.
    setForm((prev) => ({ ...prev, [name]: newValue }));
  };

  // Manage file uploads for profileImage. If multiple files are selected, stores the array. If a single file is selected, stores just that one file object.
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "pictures" ? files : files[0],
    }));
  };

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!form.name || !NAME_REGEX.test(form.name))
      newErrors.name = "Name should contain only letters, spaces, or hyphens.";

    if (!form.city || !NAME_REGEX.test(form.city))
      newErrors.city = "City name should contain only letters or spaces.";

    if (!form.state || !NAME_REGEX.test(form.state))
      newErrors.state = "State should contain only letters or spaces.";

    if (!form.country || !COUNTRY_REGEX.test(form.country))
      newErrors.country = "Country should contain only letters or spaces.";

    if (!form.description || form.description.trim().length < 40)
      newErrors.description = "Description must be at least 40 characters.";

    if (!form.phoneNumber || !PHONE_REGEX.test(form.phoneNumber))
      newErrors.phoneNumber = "Enter a valid phone number (7–20 digits).";

    if (!form.email || !EMAIL_REGEX.test(form.email))
      newErrors.email = "Enter a valid email address.";

    if (form.website && !URL_REGEX.test(form.website))
      newErrors.website = "Enter a valid website URL (with or without https).";

    if (form.reviewLink && !URL_REGEX.test(form.reviewLink))
      newErrors.reviewLink = "Enter a valid review link URL.";

    if (form.postalCode && !POSTAL_CODE_REGEX.test(form.postalCode))
      newErrors.postalCode = "Invalid postal code format.";

    // Image validation
    if (!editingData && !form.profileImage)
      newErrors.profileImage = "Profile image is required.";
    else if (form.profileImage) {
      if (!ALLOWED_IMAGE_TYPES.includes(form.profileImage.type))
        newErrors.profileImage = "Only JPG, PNG, or WEBP files allowed.";
      else if (form.profileImage.size > MAX_IMAGE_SIZE_MB * 1024 * 1024)
        newErrors.profileImage = "Image must be under 2MB.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Final Form Submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh (e.preventDefault()).
    if (validate()) {
      // validate
      const cleanedFeatures = form.features // if valid Cleans up features (turns “Wifi, Pool, Spa” → ["wifi", "pool", "spa"]).
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      onAddPlace({ ...form, features: cleanedFeatures }); // Calls the parent function onAddPlace() and passes the cleaned form data for saving.
    }
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name}</p>
            )}
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
                className="mt-1 p-2 border border-gray-300 rounded-md text-sm w-full"
                required
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.city && (
              <p className="text-red-600 text-sm">{errors.city}</p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.state && (
              <p className="text-red-600 text-sm">{errors.state}</p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.country && (
              <p className="text-red-600 text-sm">{errors.country}</p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.postalCode && (
              <p className="text-red-600 text-sm">{errors.postalCode}</p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm resize-y min-h-[200px]"
              required
            />
            {errors.description && (
              <p className="text-red-600 text-sm">{errors.description}</p>
            )}
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
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">{errors.phoneNumber}</p>
            )}
          </label>

          <label className="flex flex-col font-medium text-gray-700">
            Email *
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
              required
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
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
            {errors.website && (
              <p className="text-red-600 text-sm">{errors.website}</p>
            )}
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
            {errors.reviewLink && (
              <p className="text-red-600 text-sm">{errors.reviewLink}</p>
            )}
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
              required={!editingData}
              className="mt-1 p-2 border border-gray-300 rounded-md text-sm"
            />
            {errors.profileImage && (
              <p className="text-red-600 text-sm">{errors.profileImage}</p>
            )}
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
