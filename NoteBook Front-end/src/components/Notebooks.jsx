import React, { useEffect, useState } from "react";
import axios from "axios";
import { isUserLoggedIn, getUserId } from "../utils/auth";
import { Api } from "../utils/api";
import AddNotebook from "./AddNotebook";

import "../css/notebooks.css";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function Notebooks() {
  const [notebooks, setNotebooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchNotebooks() {
      // Check if the user is logged in
      if (!isUserLoggedIn()) {
        window.location.href = "/login";
        return;
      }

      const userId = getUserId();
      if (!userId) {
        window.location.href = "/login";
        return;
      }

      try {
        const response = await axios.get(`${Api}notebooks/user/${userId}`);

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        const notebooksData = response.data.data;
        console.log(notebooksData);

        // Set notebooks
        setNotebooks(notebooksData);
      } catch (err) {
        setError("Failed to load notebooks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotebooks();
  }, []); // Empty dependency array means this runs once on component mount

  const handleAddNotebook = async (newNotebook) => {
    const userId = getUserId();

    if (!userId) {
      setError("User not logged in. Please log in.");
      return;
    }

    try {
      const response = await axios.post(`${Api}notebooks/create`, {
        title: newNotebook.title,
        userId: userId,
        theme: newNotebook.theme,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      // Update state with the new notebook
      setNotebooks([...notebooks, response.data.data]);
      setShowPopup(false); // Close the popup
    } catch (err) {
      setError("Failed to add notebook. Please try again later.");
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Notebooks</h1>
      <p>This is the Notebooks component.</p>

      {notebooks.length > 0 ? (
        <ul className="notebooks">
          <div className="add" onClick={() => setShowPopup(true)}>
            +
          </div>
          {showPopup && (
            <AddNotebook
              onAdd={handleAddNotebook}
              onClose={() => setShowPopup(false)}
            />
          )}
          {notebooks.map((notebook) => (
            <li key={notebook._id} style={{ background: notebook.theme }}>
              <div className="title">Title: {notebook.title}</div>
              <div className="date">{formatDate(notebook.createdAt)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notebooks available.</p>
      )}
    </div>
  );
}

export default Notebooks;
