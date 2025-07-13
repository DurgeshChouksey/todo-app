import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosWiithAuth } from "../api/axiosWithAuth";
import "../styles/create-edit.css";
const BASE_URL = import.meta.env.VITE_API_URL;

const CreateTodo = () => {
  const { id } = useParams(); // To check if we're editing or creating a todo
  // if :id in param, then it's a edit req
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");

  // Fetch single todo data if editing
  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const response = await axiosWiithAuth({
            method: "get",
            url: `${BASE_URL}/todo/${id}`,
          });

          const todo = response;
          setTitle(todo.title);
          setDescription(todo.description);
          setPriority(todo.priority);
          setTags(todo.tags.join(", "));
        } catch (err) {
          console.error("Error loading todo:", err);
        }
      }
    };

    fetchTodo();
  }, [id]);

  // Submit handler for create and update
  const handleSubmit = async () => {
    const payload = {
      title,
      description,
      priority,
      tags: tags.split(",").map((tag) => tag.trim()),
      userId: userInfo?.user?.userId,
    };

    try {
      if (id) {
        // PUT request for update
        await axiosWiithAuth({
          method: "put",
          url: `${BASE_URL}/todo/${id}`,
          data: payload,
        });
      } else {
        // POST request for new todo
        await axiosWiithAuth({
          method: "post",
          url: `${BASE_URL}/todo`,
          data: payload,
        });
      }

      // Navigate back to dashboard after success
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save todo", error);
    }
  };

  return (
    <div className="create-todo-wrapper">
      <div className="create-todo-container">
        <button onClick={() => navigate("/dashboard")} className="back-button">
          ← Back
        </button>

        <h2>{id ? "Edit Todo" : "Create Todo"}</h2>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Submit Button */}
        <button onClick={handleSubmit}>
          {id ? "Update Todo" : "Create Todo"}
        </button>
      </div>
    </div>
  );
};

export default CreateTodo;
