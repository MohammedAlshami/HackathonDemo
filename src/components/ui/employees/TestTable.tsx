"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaUserPlus } from "react-icons/fa";

const EmployeesTable = () => {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({ _id: null, name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const itemsPerPage = 3;

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/employee/get-all-employee"
      );
      const data = await response.json();

      const formattedData = data.map((client) => ({
        _id: client._id,
        name: client.name,
        email: client.email,
        avatar: client.avatar || "/bg.png",
        status: client.status || "Active",
      }));

      setClients(formattedData);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleAddClient = async () => {
    if (!formData.name || !formData.email) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/v1/employee/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email }),
      });
      const newClient = await response.json();
      setClients((prev) => [...prev, newClient]);
      setFormData({ _id: null, name: "", email: "" });
      setIsModalOpen(false);
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/employee/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: formData._id,
          name: formData.name,
          email: formData.email,
        }),
      });
      setFormData({ _id: null, name: "", email: "" });
      setEditing(false);
      setIsModalOpen(false);
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/employee/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: clientId }),
      });
      setClients((prev) => prev.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  const handleEditClient = (client) => {
    setEditing(true);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const displayedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className=" p-4">
      {/* <div className="flex justify-between items-center bg-teal-500 text-white p-4 rounded-md mb-4">
        <h1 className="text-xl font-bold">Employees Management</h1>
        <button
          onClick={() => {
            setEditing(false);
            setFormData({ _id: null, name: "", email: "" });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus /> Add Employee
        </button>
      </div> */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-lg p-2 mr-4"
        />
        <button
          onClick={() => {
            setEditing(false);
            setFormData({ _id: null, name: "", email: "" });
            setIsModalOpen(true);
          }}
          className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaUserPlus />  
        </button>
      </div>
      {/* Header Row */}
      <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg font-semibold border border-black/10 py-4 mb-4">
        <div>Name</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
      {/* Client Rows */}
      <div className="grid gap-4">
        {displayedClients.map((client) => (
          <div
            key={client._id}
            className="grid grid-cols-3 gap-4 items-center bg-white p-4 rounded-lg shadow-md border"
          >
            <div className="flex items-center gap-4">
              <img
                src={client.avatar}
                alt={`${client.name}'s avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-bold">{client.name}</p>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
            </div>
            <span
              className={`px-2 py-1 w-fit text-sm rounded ${
                client.status === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {client.status}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClient(client)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteClient(client._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Employee" : "Add Employee"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              {editing ? (
                <button
                  onClick={handleUpdateClient}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddClient}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesTable;
