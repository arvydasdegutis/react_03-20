import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => res.json())
      .then((data) => setTask(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
      navigate("/");
    }
  };

  const handleCompleted = async () => {
    if (confirm("Are you sure you want to mark this task as completed?")){
    const updatedTask = { ...task, status: "Completed" };
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    setTask(updatedTask);
  }
};

  if (!task) return <p>Task not found....</p>;

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Task Details</h2>
      <div className="mt-4 border p-6 rounded shadow-lg">
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>Due Date: {task.dueDate}</p>
        <p>Priority: {task.priority}</p>
        <p>Category: {task.category}</p>
        <p>Status: {task.status}</p>
        <Link className="mt-4 bg-yellow-500 text-white px-4 py-1 rounded" to={`/edit-task/${id}`}>
          Edit
        </Link>
        <button onClick={handleDelete} className="ml-2 bg-red-500 text-white px-4 py-1 rounded">
          Delete
        </button>
        {task.status === "Pending" && (
        <button onClick={handleCompleted} className="ml-2 bg-green-500 text-white px-4 py-1 rounded">
          Completed
        </button>)}
      </div>
    </div>
  );
};

export default TaskDetails;