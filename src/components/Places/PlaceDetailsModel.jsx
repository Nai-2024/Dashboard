import { X, Phone, Mail, Globe, Star } from "lucide-react";

export default function PlaceDetailsModel({
  place,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!place) return null;
  console.log("Place Details Model: Place data in modal:", place);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-md w-[90%] md:w-[900px] max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {place.name}
            </h2>
            {place.category && (
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {place.category}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Cover Image */}
        <img
          src={place.profile || "/placeholder.jpg"}
          alt={place.name}
          className="w-full h-56 md:h-64 object-cover"
        />

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 px-8 py-6 text-[15px] text-gray-700">
          {/* LEFT COLUMN */}
          <div className="space-y-5">
            {/* Row 1: City / State */}
            <div className="grid grid-cols-2 gap-6 border-b border-gray-300 pb-3">
              <div>
                <p className="text-sm text-gray-500 font-medium">City</p>
                <p className="text-gray-800">{place.city || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">State</p>
                <p className="text-gray-800">{place.state || "—"}</p>
              </div>
            </div>

            {/* Row 2: Country / Postal */}
            <div className="grid grid-cols-2 gap-6 border-b border-gray-300 pb-3">
              <div>
                <p className="text-sm text-gray-500 font-medium">Country</p>
                <p className="text-gray-800">{place.country || "—"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Postal Code</p>
                <p className="text-gray-800">{place.postalCode || "—"}</p>
              </div>
            </div>

            {/* Address - Label and Value in One Line */}
            <div className="grid grid-cols-2 gap-6 border-b border-gray-300 pb-3">
              <p className="text-sm text-gray-500 font-medium min-w-[100px]">
                Address
              </p>
              <p className="text-gray-800 break-words flex-1">
                {place.address || "—"}
              </p>
            </div>

            {/* Certification - Label and Value in One Line */}
            <div className="grid grid-cols-2 gap-6 border-b border-gray-300 pb-3">
              <p className="text-sm text-gray-500 font-medium min-w-[100px]">
                Certification
              </p>
              <p className="text-gray-800 flex-1">
                {place.certification || "—"}
              </p>
            </div>

            {/* Features */}
            <div className="border-b border-gray-300 pb-3">
              <p className="text-sm text-gray-500 font-medium">Features</p>
              <p className="text-gray-800">
                {Array.isArray(place.features)
                  ? place.features.join(", ")
                  : place.features || "—"}
              </p>
            </div>

            {/* Description */}
            <div className="border-b border-gray-300 pb-3">
              <p className="font-semibold text-gray-900 mb-2">Description</p>
              <p className="text-gray-600 leading-relaxed">
                {place.description ||
                  "No description available for this place at the moment."}
              </p>
            </div>

            {/* Gallery */}
            {place.pictures?.length > 0 && (
              <div className="border-b border-gray-300 pb-3">
                <p className="font-semibold text-gray-900 mb-3 mt-4">Gallery</p>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {place.pictures.map((pic, i) => (
                    <img
                      key={i}
                      src={pic}
                      alt={`Gallery ${i}`}
                      className="h-24 w-36 object-cover rounded-lg shadow-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4 pl-6 md:pl-8 md:border-l border-gray-300">
            {place.phoneNumber && (
              <p className="flex items-center gap-2 text-gray-700">
                <Phone size={16} className="text-blue-600" />{" "}
                {place.phoneNumber}
              </p>
            )}
            {place.email && (
              <p className="flex items-center gap-2 text-gray-700 break-all">
                <Mail size={16} className="text-blue-600" /> {place.email}
              </p>
            )}
            {place.website && (
              <p className="flex items-center gap-2 text-gray-700">
                <Globe size={16} className="text-blue-600" />
                <a
                  href={
                    place.website.startsWith("http")
                      ? place.website
                      : `https://${place.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {place.website}
                </a>
              </p>
            )}
            {place.reviewLink && (
              <p className="flex items-center gap-2 text-gray-700">
                <Star size={16} className="text-blue-600" />
                <a
                  href={place.reviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on TripAdvisor
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 border-t px-6 py-4 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose(); //clost model
              onEdit(place);
            }} // then open edit form
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(place)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
