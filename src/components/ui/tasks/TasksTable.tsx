"use client";
import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const TasksTable = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    employees: [],
    priority: "",
    startDate: "",
    deadline: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/task/get-all-task"
      );
      const data = await response.json();

      const formattedData = data.map((task) => ({
        _id: task._id,
        name: task.name,
        employees: task.employees || [],
        priority: task.priority || "Medium",
        startDate: task.startDate
          ? new Date(task.startDate).toISOString().split("T")[0]
          : "",
        deadline: task.deadline
          ? new Date(task.deadline).toISOString().split("T")[0]
          : "",
        status: task.status || "Pending",
      }));

      setTasks(formattedData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/v1/employee/get-all-employee"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleAddTask = async () => {
    if (
      !formData.name ||
      !formData.employees.length ||
      !formData.priority ||
      !formData.startDate ||
      !formData.deadline
    )
      return;

    try {
      const response = await fetch("http://127.0.0.1:5000/v1/task/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json();
      setIsModalOpen(false);
      resetForm();
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/v1/task/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      await response.json();
      setIsModalOpen(false);
      setEditing(false);
      resetForm();
      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://127.0.0.1:5000/v1/task/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: taskId }),
      });
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditing(true);
    setFormData(task);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "employees") {
      // Handle multiple select
      const selectedOptions = Array.from(
        e.target.selectedOptions,
        (option) => ({
          _id: option.value,
          name: option.text,
        })
      );
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      employees: [],
      priority: "",
      startDate: "",
      deadline: "",
    });
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const displayedTasks = filteredTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border rounded-lg p-2 mr-4"
        />
        <button
          onClick={() => {
            setEditing(false);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus />
        </button>
      </div>

      <div className="overflow-hidden w-full overflow-x-auto rounded-md border border-neutral-300 dark:border-neutral-700">
        <table className="w-full text-left text-sm text-neutral-600 dark:text-neutral-300">
          <thead className="border-b border-neutral-300 bg-neutral-50 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white">
            <tr>
              <th className="p-4">Task Name</th>
              <th className="p-4">Assigned To</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-300 dark:divide-neutral-700">
            {displayedTasks.map((task) => (
              <tr key={task._id}>
                <td className="p-4">
                  <div className="font-medium text-neutral-900 dark:text-white">
                    {task.name}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {task.employees.map((emp) => (
                      <span
                        key={emp._id}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                      >
                        {emp.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="p-4">{task.startDate}</td>
                <td className="p-4">{task.deadline}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit Task" : "Add Task"}
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Task Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
              <select
                name="employees"
                multiple
                value={formData.employees.map((emp) => emp._id)}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2 h-32"
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={editing ? handleUpdateTask : handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {editing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksTable;
