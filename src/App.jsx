import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

import TaskDetails from "./pages/TaskDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />

      </Routes>
    </>
  );
}

export default App;
