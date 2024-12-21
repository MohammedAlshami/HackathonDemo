import { useState, useEffect } from "react";

const EmployeesTable = () => {
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({ _id: null, name: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setClients(data);
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
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleUpdateClient = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/v1/employee/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: formData._id,
          name: formData.name,
          email: formData.email,
        }),
      });
      const updatedClient = await response.json();
      setClients((prev) =>
        prev.map((client) =>
          client._id === updatedClient._id ? updatedClient : client
        )
      );
      setFormData({ _id: null, name: "", email: "" });
      setEditing(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDeleteClient = async (_id: number) => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/employee/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      });
      setClients((prev) => prev.filter((client) => client._id !== _id));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClient = (client: typeof formData) => {
    setEditing(true);
    setFormData(client);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Clients Management
      </h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full border rounded p-2"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={() => {
            setEditing(false);
            setFormData({ _id: null, name: "", email: "" });
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add Client
        </button>
      </div>
      <div className="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300 dark:border-neutral-700">
        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead className="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">ID</th>
              <th className="p-4">Email</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-300 dark:divide-neutral-700">
            {displayedClients.map((client) => (
              <tr key={client._id}>
                <td className="p-4">
                  <div className="flex w-max items-center gap-2">
                    <div className="flex flex-col">
                      <span className="text-neutral-900 dark:text-white">
                        {client.name}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">{client._id}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEditClient(client)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClient(client._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Client" : "Add Client"}
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded p-2 mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              {editing ? (
                <button
                  onClick={handleUpdateClient}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              ) : (
                <button
                  onClick={handleAddClient}
                  className="bg-green-500 text-white px-4 py-2 rounded"
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
