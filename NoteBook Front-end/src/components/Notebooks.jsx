import React, { useEffect, useState } from "react";
import axios from "axios";
import { isUserLoggedIn, getUserId } from "../utils/auth";
import { Api, updateNotebook, getNotebook } from "../utils/api"; // Import API functions
import { Trash2, Pencil, Plus } from "lucide-react";
import AddNotebook from "./AddNotebook";
import UpdateNotebook from "./UpdateNotebook"; // Import UpdateNotebook component

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
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); // State for UpdateNotebook popup
  const [selectedNotebookId, setSelectedNotebookId] = useState(null); // State for selected notebook ID
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [titleFilter, setTitleFilter] = useState("");
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

  // Function to create a new page after notebook creation
  const createPageForNotebook = async (notebookId) => {
    try {
      const response = await axios.post(`${Api}pages/create`, {
        notebookId: notebookId,
        text: "<p></p>", // Default empty content for new page
        sketch: "[]", // Default empty sketch content
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      console.log("New page created for notebook:", notebookId);
    } catch (error) {
      console.error("Failed to create a new page:", error);
      setError(`Failed to create a new page: ${error.message}`);
    }
  };

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

      const createdNotebook = response.data.data;

      // After notebook creation, create the first page for it
      await createPageForNotebook(createdNotebook._id);

      // Update the notebook list
      setNotebooks((prevNotebooks) => [...prevNotebooks, createdNotebook]);
      setShowAddPopup(false);
      window.location.href = `/page/${createdNotebook._id}`;
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

  const handleDeleteNotebook = async (notebookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notebook? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${Api}notebooks/delete/${notebookId}`);

      // Update the state by filtering out the deleted notebook
      setNotebooks((prevNotebooks) =>
        prevNotebooks.filter((notebook) => notebook._id !== notebookId)
      );
    } catch (err) {
      setError(`Failed to delete notebook: ${err.message}`);
      console.error(err);
    }
  };

  const sendNoteBookId = (id) => {
    window.location.href = `/page/${id}`;
  };

  const handleEditNotebook = (notebookId) => {
    setSelectedNotebookId(notebookId);
    setShowUpdatePopup(true); // Show the update popup
  };

  const handleUpdate = (updatedNotebook) => {
    setNotebooks((prevNotebooks) =>
      prevNotebooks.map((notebook) =>
        notebook._id === updatedNotebook._id ? updatedNotebook : notebook
      )
    );
  };

  const handleUpdateNotebook = async (updatedNotebook) => {
    try {
      await updateNotebook(updatedNotebook._id, updatedNotebook);
      setShowUpdatePopup(false); // Close the popup

      window.location.reload(); // Refreshes the page
    } catch (err) {
      console.error("Failed to update notebook:", err);
      setError(`Failed to update notebook: ${err.message}`);
    }
  };

  const getPlaceholders = (notebooks, currentPage, totalPages) => {
    // Only apply placeholders if on the last page
    if (currentPage !== totalPages) {
      return [];
    }

    const container = document.getElementById("root");

    if (!container) {
      return [];
    }

    const containerWidth = container.clientWidth;
    const notebookWidth = 236; // width of each notebook
    const gap = 40; // gap between notebooks
    const totalNotebookSpace = notebookWidth + gap;

    // Calculate how many full notebooks fit in the container
    const columns = Math.floor(containerWidth / totalNotebookSpace);

    if (columns === 0) {
      return [];
    }

    // Calculate remaining items in the last row
    const remainingItems = notebooks.length % columns;

    // Calculate how many placeholders are needed to fill the last row
    const placeholdersNeeded =
      remainingItems === 0 ? 0 : columns - remainingItems;

    return Array.from({ length: placeholdersNeeded }, (_, index) => (
      <li key={`placeholder-${index}`} className="placeholder"></li>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="notebook-page-container">
      <div className="toptitle">
        <h1>Notebooks</h1>

        <div className="filters">
          <input
            type="text"
            placeholder="Search"
            value={titleFilter}
            onChange={handleTitleFilterChange}
          />
          <select
            onChange={handleSortChange}
            value={`${sortField}_${sortOrder}`}
          >
            <option value="createdAt_asc">Oldest</option>
            <option value="createdAt_desc">Newest</option>
          </select>
        </div>
      </div>

      {showAddPopup && (
        <AddNotebook
          onAdd={handleAddNotebook}
          onClose={() => setShowAddPopup(false)}
        />
      )}

      {showUpdatePopup && (
        <UpdateNotebook
          notebookId={selectedNotebookId}
          onUpdate={handleUpdateNotebook} // Pass the handler function correctly
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      {notebooks.length === 0 && (
        <div className="notebooks">
          <div className="add" onClick={() => setShowAddPopup(true)}>
            <Plus size={40} />
          </div>
        </div>
      )}
      {notebooks.length > 0 ? (
        <ul className="notebooks">
          <div className="add" onClick={() => setShowAddPopup(true)}>
            <Plus size={40} />
          </div>

          {notebooks.map((notebook) => (
            <li
              key={notebook._id}
              style={{ background: notebook.theme }}
              onClick={() => sendNoteBookId(notebook._id)}
            >
              <div className="title">{notebook.title}</div>
              <div className="date">{formatDate(notebook.createdAt)}</div>

              <p
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNotebook(notebook._id);
                }}
              >
                <Trash2 color="white" />
              </p>
              <p
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditNotebook(notebook._id);
                }}
              >
                <Pencil color="white" />
              </p>
            </li>
          ))}
          {/* Render placeholders on the last page */}
          {getPlaceholders(notebooks, currentPage, totalPages)}
        </ul>
      ) : (
        <p>No notebooks available.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Notebooks;
