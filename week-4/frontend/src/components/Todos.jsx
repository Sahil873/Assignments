/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://192.168.0.103:3000/todos";

const Todos = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [todoId, setTodoId] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch(BASE_URL, {
        headers: { Authorization: token },
      });
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setTodos(data.todos);
    } catch (err) {
      console.log("Error while fetching todos: ", err);
    }
  };

  useEffect(() => {
    if (!token) {
      console.log("In useEffect of Todo");
      alert("User not authenticated. Sign in first.");
      navigate("/signin");
    } else {
      fetchTodos();
    }
  }, [navigate, token]);

  const handleAddTodo = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description: desc }),
      });
      const data = await response.json();
      alert(data.msg);
      if (response.ok) fetchTodos();
    } catch (err) {
      console.log("Error while adding todo: ", err);
    }
    setTitle("");
    setDesc("");
  };

  const handleTodoDelete = async (todoId) => {
    try {
      const response = await fetch(`${BASE_URL}/${todoId}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!response.ok) throw new Error("Failed to delete Todo");
      const data = await response.json();
      alert(data.msg);
      setTodos(todos.filter((todo) => todo._id !== todoId));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTodoEdit = (todoId) => {
    const todo = todos.find((todo) => todo._id === todoId);
    setTodoId(todo._id);
    setTitle(todo.title);
    setDesc(todo.description);
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await fetch(`${BASE_URL}/${todoId}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description: desc }),
      });
      const data = await response.json();
      alert(data.msg);
      if (response.ok) fetchTodos();
      setTodoId(null);
      setTitle("");
      setDesc("");
    } catch (err) {
      console.log("Error while updating todo: ", err);
    }
  };

  return (
    <div className="todos">
      <div className="todoInputContainer">
        <div className="todoInputs">
          <input
            value={title}
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            value={desc}
            type="text"
            placeholder="description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        {todoId ? (
          <button onClick={handleUpdateTodo}>Update Todo</button>
        ) : (
          <button onClick={handleAddTodo}>Add Todo</button>
        )}
      </div>
      <div className="userTodos">
        {todos?.length > 0
          ? todos.map((todo) => (
              <div key={todo._id}>
                <div>
                  <h2>{todo.title}</h2>
                  <p>{todo.description}</p>
                </div>
                <div>
                  <button onClick={() => handleTodoEdit(todo._id)}>edit</button>
                  <button onClick={() => handleTodoDelete(todo._id)}>
                    delete
                  </button>
                </div>
              </div>
            ))
          : "No Todos"}
      </div>
    </div>
  );
};

export default Todos;
