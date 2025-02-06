import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

const RandomUserProfiles = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null); // For handling inline editing

  useEffect(() => {
    // Fetch user data from the Random User API
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(data => setUsers(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleProfileClick = (user) => {
    setSelectedUser(user);
    setEditableUser(user); // Initialize the editable user state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // For now, just log the updated user data
    console.log('Updated User:', editableUser);
    setSelectedUser(editableUser); // Save the updated data (if needed, you can integrate it with a backend)
  };

  const handleReset = () => {
    // Reset the editable user state to the original selected user data
    setEditableUser(selectedUser);
  };

  const downloadProfileAsImage = () => {
    const profileCard = document.getElementById('profile-card');
    
    html2canvas(profileCard).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `${editableUser.name.first}-${editableUser.name.last}-profile.png`; // Generate filename
      link.click(); // Trigger download
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Random User Profiles</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleProfileClick(user)} // Handle profile click
          >
            <img
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center">{`${user.name.first} ${user.name.last}`}</h2>
            <p className="text-center text-gray-600">{user.email}</p>
            <p className="text-center text-gray-600">{`${user.location.city}, ${user.location.country}`}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div
          id="profile-card" 
          className="mt-8 bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          
          <div className="flex justify-center mb-4">
            <img
              src={editableUser.picture.large}
              alt={`${editableUser.name.first} ${editableUser.name.last}`}
              className="w-32 h-32 rounded-full"
            />
          </div>

          <div>
            <label className="font-semibold text-lg">First Name:</label>
            <input
              type="text"
              name="name.first"
              value={editableUser.name.first}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg mb-4"
            />

            <label className="font-semibold text-lg">Last Name:</label>
            <input
              type="text"
              name="name.last"
              value={editableUser.name.last}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg mb-4"
            />

            <label className="font-semibold text-lg">Email:</label>
            <input
              type="email"
              name="email"
              value={editableUser.email}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg mb-4"
            />

            <label className="font-semibold text-lg">Location (City):</label>
            <input
              type="text"
              name="location.city"
              value={editableUser.location.city}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg mb-4"
            />

            <label className="font-semibold text-lg">Country:</label>
            <input
              type="text"
              name="location.country"
              value={editableUser.location.country}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded-lg mb-4"
            />

            <button
              onClick={handleSave}
              className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full"
            >
              Save Changes
            </button>

            <button
              onClick={downloadProfileAsImage}
              className="bg-green-500 text-white p-2 rounded-lg mt-4 w-full"
            >
              Download Profile as Image
            </button>

            <button
              onClick={handleReset}
              className="bg-red-500 text-white p-2 rounded-lg mt-4 w-full"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomUserProfiles;
