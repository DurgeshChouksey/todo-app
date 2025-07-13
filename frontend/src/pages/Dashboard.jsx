import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWiithAuth } from "../api/axiosWithAuth";
import TodoCard from "../components/TodoCard";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Fetch all todos when component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosWiithAuth({
          method: "get",
          url: "http://localhost:5001/todo/",
        });
        setTodos([...response]);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/"; // Redirect to login
  };

  // Delete todo handler
  const deleteHandler = async (todoId) => {
    try {
      await axiosWiithAuth({
        method: "delete",
        url: `http://localhost:5001/todo/${todoId}`,
      });
      setTodos((prev) => prev.filter((todo) => todo._id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  // Toggle completion status
  const toggleHandler = async (todoId, currentStatus) => {
    try {
      await axiosWiithAuth({
        method: "put",
        url: `http://localhost:5001/todo/${todoId}`,
        data: {
          completed: !currentStatus,
        },
      });
      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === todoId ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="dashboard-title">
          <h2>TODO'S</h2>
        </div>

        <div className="dashboard-controls">
          <span>{userInfo?.user.username}</span>
          <div className="dashboard-nav-button-group">
            <button onClick={() => navigate("/create")}>+</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Todo List */}
      <div className="dashboard-wrapper">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo, index) => (
            <div key={index} onClick={() => navigate(`/create/${todo._id}`)}>
              <TodoCard
                title={todo.title}
                description={todo.description}
                completed={todo.completed}
                date={todo.updatedAt}
                id={todo._id}
                priority={todo.priority}
                catagory={todo.tags}
                deleteHandler={(e) => {
                  e.stopPropagation();
                  deleteHandler(todo._id);
                }}
                onToggle={(e) => {
                  e.stopPropagation();
                  toggleHandler(todo._id, todo.completed);
                }}
              />
            </div>
          ))
        ) : (
          <div>No todos found.</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
