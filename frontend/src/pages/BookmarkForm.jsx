// import React, { useState } from "react";
// import "./BookmarkForm.css"; 
// import { useNavigate } from "react-router-dom";
// const BookmarkForm = () => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [solution, setSolution] = useState("");
//   const navigate = useNavigate();

//   const token= localStorage.getItem('token')
//   const config={
//     headers:{
//       Authorization:`Bearer ${token}` 
//     }
//   }


//   const HandleButtonClick = () => {
//     navigate("/home/bookmark");
//   };


//   const HandleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("hello")
//     try {
//       const response = await fetch('http://localhost:5000/api/v1/questions/createQuestion', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization:`Bearer ${token}` 
//         },
//         body: JSON.stringify({ title, url, solution })
//       });

//       if (!response.ok) {
//         throw new Error('BookMark Addition failed');
//       }

//     //   navigate('/');
//       console.log('BookMark Addition successful');
//     } catch (error) {
//       console.error('Error during BookMark Addition:', error.message);
//     }
//   };

//   return (
//     <div className="bookmark-form">
//       <button className="back-button" onClick={HandleButtonClick}>
//         ←
//       </button>
//       <h2>Add a Bookmark</h2>
//       <form onSubmit={HandleSubmit}>
//         <label>
//           Title
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. write a reverse string in Java"
//             required
//           />
//         </label>
//         <label>
//           URL
//           <input
//             type="url"
//             value={url}
//             onChange={(e) => setUrl(e.target.value)}
//             placeholder="Link here"
//             required
//           />
//         </label>
//         <label>
//           Solution
//           <textarea
//             value={solution}
//             onChange={(e) => setSolution(e.target.value)}
//             placeholder="Describe the solution"
//             required
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default BookmarkForm;

import React, { useState } from "react";
import "./BookmarkForm.css"; 
import { useNavigate } from "react-router-dom";

const BookmarkForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [solution, setSolution] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('token');

  const HandleButtonClick = () => {
    navigate("/home/bookmark");
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/questions/createQuestion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ title, url, solution })
      });

      if (!response.ok) {
        throw new Error('Bookmark addition failed');
      }

      console.log('Bookmark added successfully');
      navigate("/home/bookmark");
    } catch (error) {
      console.error('Error during Bookmark Addition:', error.message);
    }
  };

  return (
    <div className="bookmark-form">
      <button className="back-button" onClick={HandleButtonClick}>
        ←
      </button>
      <h2>Add a Bookmark</h2>
      <form onSubmit={HandleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. write a reverse string in Java"
            required
          />
        </label>
        <label>
          URL
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Link here"
            required
          />
        </label>
        <label>
          Solution
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Describe the solution"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookmarkForm;
