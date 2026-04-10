import React, { useEffect, useState } from "react";
import API from "./api/api";
import "./CategoryManagement.css";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const fetchCategories = async () => {
    try {
      const { data } = await API.get("/categories");
      setCategories(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to fetch categories");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchCategories();
      setPageLoading(false);
    }, 1000); // 1 sec loader
  }, []);

  // ✅ OPEN MODAL
  const openModal = (cat = null) => {
    if (cat) {
      setCategoryName(cat.name);
      setDescription(cat.description || "");
      setEditId(cat._id);
    } else {
      setCategoryName("");
      setDescription("");
      setEditId(null);
    }
    setIsModalOpen(true);
  };

  // ✅ CLOSE MODAL
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName("");
    setDescription("");
    setEditId(null);
  };

  // ✅ ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      alert("⚠️ Category name is required");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        await API.put(`/categories/${editId}`, {
          name: categoryName,
          description,
        });
        alert("✅ Category updated successfully");
      } else {
        await API.post("/categories", {
          name: categoryName,
          description,
        });
        alert("✅ Category added successfully");
      }

      fetchCategories();
      closeModal();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Failed to save category");
    }

    setLoading(false);
  };

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await API.delete(`/categories/${id}`);
      alert("🗑️ Category deleted successfully");
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("❌ Delete failed");
    }
  };

    if (pageLoading) {
        return (
            <div className="product-management">
                <div className="loading-spinner">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Loading categories...</p>
                </div>
            </div>
        );
    }


  return (
    <div className="category-management">
      {/* HEADER */}
      <div className="management-header">
        <div className="header-content">
          <h1>
            <i className="fas fa-tags"></i>
            Category Management
          </h1>
          <p>Manage your product categories</p>
        </div>
        <button className="btn-primary" onClick={() => openModal()}>
          <i className="fas fa-plus"></i>
          Add New Category
        </button>
      </div>

      {/* TABLE */}
      <table className="category-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 ? (
            categories.map((cat, i) => (
              <tr key={cat._id}>
                <td>{i + 1}</td>
                <td>{cat.name}</td>
                <td>{cat.description || "—"}</td>
                <td className="action-buttons">
                  <button
                    className="btn-edit"
                    onClick={() => openModal(cat)}
                    title="Edit Category"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(cat._id)}
                    title="Delete Category"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No categories found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                <i className={`fas ${editId ? "fa-edit" : "fa-plus"}`}></i>
                {editId ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                className="close-modal"
                onClick={closeModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="category-form">
              <div className="form-group">
                <label className="text-white">Category Name *</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-white">Description</label>
                <textarea
                  placeholder="Enter category description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i> Save Category
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;