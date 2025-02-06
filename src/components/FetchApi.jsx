import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";

const FetchApi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null); // Store original user for reset

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=6")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((error) => console.log("Error fetching data", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setEditedUser((prevUser) => {
      if (!prevUser) return prevUser;

      const updatedUser = { ...prevUser };

      if (name.startsWith("name.")) {
        updatedUser.name = { ...prevUser.name, [name.split(".")[1]]: value };
      } else if (name.startsWith("location.")) {
        updatedUser.location = {
          ...prevUser.location,
          [name.split(".")[1]]: value,
        };
      } else {
        updatedUser[name] = value;
      }

      return updatedUser;
    });
  };

  const saveChanges = () => {
    setSelectedUser(editedUser); // Save changes to the selected user
    setEditedUser(null); // Exit edit mode
  };

  // Reset to the original user
  const resetChanges = () => {
    setEditedUser({ ...originalUser }); // Restore initial fetched user data
  };

  const downloadImage = () => {
    const profileCard = document.getElementById("profile-card");
    if (!profileCard) return;
  
    html2canvas(profileCard, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      const user = editedUser || selectedUser; // Capture edited data if available
      link.download = `${user.name.first}_${user.name.last}_profile.png`;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Random User Profiles
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => {
                setSelectedUser(user);
                setEditedUser(null);
                setOriginalUser(user); // Store original user when selected
              }}
            >
              <img
                src={user.picture.large}
                alt="User"
                className="rounded-full w-24 h-24 border-4 border-blue-500"
              />
              <h2 className="text-lg font-semibold mt-3">
                {user.name.first} {user.name.last}
              </h2>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
          ))}
        </div>
      )}

      {/* Profile Card */}
      {selectedUser && (
        <div
          id="profile-card"
          className="mt-8 p-6 bg-white rounded-2xl shadow-lg mx-auto w-full max-w-md text-center relative"
        >
          <button
            className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-red-500 text-xl"
            onClick={() => setSelectedUser(null)}
          >
            ✖
          </button>

          {editedUser ? (
            <>
              <img
                src={editedUser.picture.large}
                alt="Selected User"
                className="rounded-full w-32 h-32 border-4 border-blue-500 mx-auto"
              />
              <p>First Name:</p>
              <input
                type="text"
                name="name.first"
                value={editedUser.name.first}
                onChange={handleInputChange}
                className="mt-4 p-2 border rounded-md w-full"
              />
              <p>Last Name:</p>
              <input
                type="text"
                name="name.last"
                value={editedUser.name.last}
                onChange={handleInputChange}
                className="mt-2 p-2 border rounded-md w-full"
              />
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="mt-2 p-2 border rounded-md w-full"
              />
              <p>City:</p>
              <input
                type="text"
                name="location.city"
                value={editedUser.location.city}
                onChange={handleInputChange}
                className="mt-2 p-2 border rounded-md w-full"
              />
              <p>Country:</p>
              <input
                type="text"
                name="location.country"
                value={editedUser.location.country}
                onChange={handleInputChange}
                className="mt-2 p-2 border rounded-md w-full"
              />
              <p>Phone:</p>
              <input
                type="text"
                name="phone"
                value={editedUser.phone}
                onChange={handleInputChange}
                className="mt-2 p-2 border rounded-md w-full"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={saveChanges}
                  className="bg-blue-500 text-white p-2 rounded-md w-1/2 mx-1"
                >
                  Save
                </button>
                <button
                  onClick={resetChanges}
                  className="bg-gray-500 text-white p-2 rounded-md w-1/2 mx-1"
                >
                  Reset
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={selectedUser.picture.large}
                alt="Selected User"
                className="rounded-full w-32 h-32 border-4 border-blue-500 mx-auto"
              />
              <h2 className="text-2xl font-bold mt-4">
                {selectedUser.name.first} {selectedUser.name.last}
              </h2>
              <p className="text-gray-600 text-lg">{selectedUser.email}</p>
              <p className="text-gray-500">
                {selectedUser.location.city}, {selectedUser.location.country}
              </p>
              <p className="text-gray-400">Phone: {selectedUser.phone}</p>
              <button
                onClick={() => {
                  setEditedUser({ ...selectedUser });
                  setOriginalUser({ ...selectedUser }); // Store original data when editing starts
                }}
                className="mt-4 bg-yellow-500 text-white p-2 rounded-md"
              >
                Edit Profile
              </button>
            </>
          )}
          {/* Download Button */}
          <button
            onClick={downloadImage}
            className="mt-4 bg-green-500 text-white p-2 rounded-md"
          >
            Download Profile as Image
          </button>
        </div>
      )}
    </div>
  );
};

export default FetchApi;
