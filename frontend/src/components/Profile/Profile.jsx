
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Profile.css";

// const Profile = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setError("No token found. Please log in.");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await axios.get("http://localhost:5000/api/v1/user/getUser", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(res.data.userData);
//       } catch (err) {
//         console.error("Failed to load profile:", err);
//         setError("Failed to load profile");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) return <div>Loading profile...</div>;
//   if (error) return <div style={{ color: "red" }}>{error}</div>;

//   return (
//     <div className="profile-container">
//       <div className="profile-header">
//         {data.avatar ? (
//           <img
//             src={`http://localhost:5000/${data.avatar}`}
//             alt="Profile"
//             className="profile-image"
//           />
//         ) : (
//           <div className="profile-image-placeholder">No Image</div>
//         )}

//         <div className="profile-info">
//           <p><strong>Email:</strong> {data.email || "N/A"}</p>
//           <p><strong>Username:</strong> {data.userName || "N/A"}</p>
//           <p><strong>College:</strong> Indian Institute Of Technology</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data.userData);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        {data.avatar ? (
          <img
            src={`${BACKEND_URL}/${data.avatar}`}
            alt="Profile"
            className="profile-image"
          />
        ) : (
          <div className="profile-image-placeholder">No Image</div>
        )}

        <div className="profile-info">
          <p><strong>Email:</strong> {data.email || "N/A"}</p>
          <p><strong>Username:</strong> {data.userName || "N/A"}</p>
          <p><strong>College:</strong> Indian Institute Of Technology</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
