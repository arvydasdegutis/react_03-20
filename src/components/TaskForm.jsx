import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

const TaskForm = ({ isEditMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:5000/tasks/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setTask(data);
          for (const [key, value] of Object.entries(data)) {
            setValue(key, value);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    const url = isEditMode ? `http://localhost:5000/tasks/${id}` : "http://localhost:5000/tasks";
    const method = isEditMode ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    navigate("/");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">{isEditMode ? "Edit Task" : "Add a New Task"}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col space-y-4 border p-6 rounded shadow-lg">
        <input
          {...register("title", { required: true, minLength: 3, maxLength: 100 })}
          placeholder="Title"
          className="border p-2"
        />
        {errors.title && <span>Title must be between 3 and 100 characters.</span>}

        <input
          {...register("description", { required: true })}
          placeholder="Description"
          className="border p-2"
        />
        {errors.description && <span>Description is required.</span>}

        <select {...register("category", { required: true })} className="border p-2">
          <option value="">Select Category</option>
          <option value="IT department">IT department</option>
          <option value="HR department">HR department</option>
          <option value="Finance department">Finance department</option>
          <option value="Sales department">Sales department</option>
        </select>
        {errors.category && <span>Please select a category.</span>}

        <select {...register("priority", { required: true })} className="border p-2">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && <span>Please select a priority.</span>}

        <input
          {...register("date", { required: true })}
          type="date"
          className="border p-2"
        />
        {errors.date && <span>Please select a due date.</span>}
        {isEditMode ?
          <select {...register("status", { required: true })}
            className="border p-2">
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            </select>

          :
          <select {...register("status", { required: true })}
            className="border p-2">
            <option value="Pending">Pending</option>
            </select> 
        }
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
          {isEditMode ? "Save Changes" : "Add Task"}
        </button>
        {isEditMode? 
        <button type="button" onClick={() => navigate("/")} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button> : " "}
      </form>
    </div>
  );
};

export default TaskForm;