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
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [titleFilter, setTitleFilter] = useState(""); // State for title filter
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20); // Limit per page

  useEffect(() => {
    async function fetchNotebooks() {
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
        const response = await axios.get(`${Api}notebooks/user/${userId}`, {
          params: {
            title: titleFilter,
            sortBy: sortField,
            sortOrder: sortOrder,
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
          },
        });

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        // Extract notebooks and totalCount from response
        const { notebooks, totalCount } = response.data.data || {
          notebooks: [],
          totalCount: 0,
        };
        setNotebooks(notebooks);
        setTotalPages(Math.ceil(totalCount / itemsPerPage));
        setError(""); // Clear any previous errors
      } catch (err) {
        setNotebooks([]);
        setError("Failed to load notebooks. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotebooks();
  }, [sortField, sortOrder, titleFilter, currentPage]); // Dependencies include currentPage

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

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setNotebooks((prevNotebooks) => [...prevNotebooks, response.data.data]);
      setShowPopup(false);
    } catch (err) {
      setError(`Failed to add notebook: ${err.message}`);
      console.error(err);
    }
  };

  const handleSortChange = (event) => {
    const [field, order] = event.target.value.split("_");
    setSortField(field);
    setSortOrder(order);
  };

  const handleTitleFilterChange = (event) => {
    setTitleFilter(event.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const sendNoteBookId = (id) => {
    window.location.href = `/page/${id}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Notebooks</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={titleFilter}
          onChange={handleTitleFilterChange}
        />
        <select onChange={handleSortChange} value={`${sortField}_${sortOrder}`}>
          <option value="createdAt_asc">Oldest</option>
          <option value="createdAt_desc">Newest</option>
        </select>
      </div>

      {showPopup && (
        <AddNotebook
          onAdd={handleAddNotebook}
          onClose={() => setShowPopup(false)}
        />
      )}

      {notebooks.length > 0 ? (
        <ul className="notebooks">
          <div className="add" onClick={() => setShowPopup(true)}>
            +
          </div>
          {notebooks.map((notebook) => (
            <li
              key={notebook._id}
              style={{ background: notebook.theme }}
              onClick={() => sendNoteBookId(notebook._id)}
            >
              <div className="title">{notebook.title}</div>
              <div className="date">{formatDate(notebook.createdAt)}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notebooks available.</p>
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Notebooks;
