// import React, { useEffect, useState } from 'react';
// import axios from "axios";
// import "./Bookmarks.css";
// import { useNavigate } from "react-router-dom";

// const Bookmarks = () => {
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     navigate("/home/bookmarkform");
//   };

//   const [users, setUsers] = useState([]);

//   const token = localStorage.getItem('token');
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };

//   const fetchBookmark = async () => {
//     try {
//       let res = await axios.post("http://localhost:5000/api/v1/questions/getAllBookmarks", {}, config);
//       setUsers(res.data.bookmarks);
//     } catch (error) {
//       console.error("Failed to fetch bookmarks:", error);
//     }
//   };

//   useEffect(() => {
//     fetchBookmark();
//   }, []);

//   return (
//     <div className="main">
//       <div className='book'>
//         <button className="btn1" onClick={handleButtonClick}>Add A Bookmark</button>
//         <div className="class">
//           <div className='subclass'>
//             <table className='table'>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Url</th>
//                   <th>Solution</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {
//                   users.map((data, index) => (
//                     <tr key={index}>
//                       <td>{data.title}</td>
//                       <td>
//                         <a href={data.url} target="_blank" rel="noopener noreferrer">
//                           {data.url}
//                         </a>
//                       </td>
//                       <td>{data.solution}</td>
//                     </tr>
//                   ))
//                 }
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Bookmarks;


import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Bookmarks.css";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Bookmarks = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/home/bookmarkform");
  };

  const [users, setUsers] = useState([]);

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchBookmark = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/questions/getAllBookmarks`,
        {},
        config
      );
      setUsers(res.data.bookmarks);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmark();
  }, []);

  return (
    <div className="main">
      <div className='book'>
        <button className="btn1" onClick={handleButtonClick}>Add A Bookmark</button>
        <div className="class">
          <div className='subclass'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Url</th>
                  <th>Solution</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((data, index) => (
                    <tr key={index}>
                      <td>{data.title}</td>
                      <td>
                        <a href={data.url} target="_blank" rel="noopener noreferrer">
                          {data.url}
                        </a>
                      </td>
                      <td>{data.solution}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;

