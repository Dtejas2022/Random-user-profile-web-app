import React from "react";

const CorporateProfileCard = ({ user }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-lg overflow-hidden bg-white">
      {/* Header Section */}
      <div className="bg-blue-600 p-4 text-white text-center">
        <img
          src={user.picture}
          alt="User"
          className="rounded-full w-24 h-24 mx-auto border-4 border-white"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-lg font-medium">{user.jobTitle}</p>
      </div>

      {/* Body Section */}
      <div className="p-4">
        <div className="text-sm text-gray-600 mb-2">
          <strong>Email: </strong>{user.email}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Phone: </strong>{user.phone}
        </div>
        <div className="text-sm text-gray-600 mb-2">
          <strong>Location: </strong>{user.location}
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-100 p-4 text-center">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all">
          Contact
        </button>
      </div>
    </div>
  );
};

export default CorporateProfileCard;
