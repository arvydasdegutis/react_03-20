import { useState } from "react";

const Filter = ({ tasks, setFilteredTasks }) => {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    applyFilterAndSort(e.target.value, sortOrder);
  };


  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    applyFilterAndSort(filter, e.target.value);
  };

  const applyFilterAndSort = (filter, sortOrder) => {
    let filteredTasks = tasks;
    if (filter !== "All") {
      const status = filter === "Completed" ? "Completed" : "Pending";
      filteredTasks = tasks.filter((task) => task.status === status);
    }
    filteredTasks = [...filteredTasks];
    const sortedTasks = filteredTasks.sort((a, b) => a.date.localeCompare(b.date));
    if (sortOrder === "asc") {
      sortedTasks.reverse();
    }

    setFilteredTasks(filteredTasks);
  };

  return (
    <div className="border p-2">
      <div className="border p-2">
        <label htmlFor="filter">Filter by status:</label>
        <select className="w-full" id="filter" value={filter} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="border p-2">
        <label htmlFor="sort">Sort by date:</label>
        <select className="w-full" id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="asc">New</option>
          <option value="desc">Old</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;