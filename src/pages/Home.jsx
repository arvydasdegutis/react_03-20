import { useEffect, useState } from "react";
import { Link } from "react-router";
import  Filter   from "../components/Filter";
const Home = () => {
    const [tasks, setTasks] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:5000/tasks")
        .then((res) => res.json())
        .then((data) => {
  
          const sortedTasks = data.sort((a, b) =>
            a.title.localeCompare(b.date)
          );
          setTasks(sortedTasks);
        });
    }, []);
  
    return (
      <main className="p-10">
        <h2 className="text-2xl font-bold">Tasks List</h2>
        <Filter tasks={tasks} setFilteredTasks={setTasks} />
        <section className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {tasks.length > 0 ? (
            tasks.map((task) => (
              <figure key={task.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold">
                  {task.title} 
                </h3>
                <p>{task.description}</p>
                <p>Due Date: {task.date}</p>
                <p>Priority: {task.priority}</p>
                <p>Category: {task.category}</p>
                <p>Status: {task.status}</p>
                <Link to={`/tasks/${task.id}`}>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
                    View Details
                  </button>
                </Link>
              </figure>
            ))
          ) : (
            <div>
            <p>No tasks found or your filter don't work properly....</p>
            <p>Please refresh page...</p></div>
          )}
        </section>
      </main>
    );
  };
  
 
export default Home;
