/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [signInNow, setSignInNow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setUsername("");
    setPassword("");
  }, [signInNow]);

  async function handleSignIn() {
    try {
      const response = await fetch("http://192.168.0.103:3000/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.msg);
        console.log(data.token);
        localStorage.setItem("token", data.token);
        return navigate("/");
      } else {
        const data = await response.json();
        alert(data.msg);
        setSignInNow(false);
      }
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleSignUp() {
    try {
      const response = await fetch("http://192.168.0.103:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.msg);
        setSignInNow(true);
      } else if (response.status === 403) {
        const data = await response.json();
        alert(data.msg);
        setSignInNow(true);
      }
    } catch (e) {
      setError(e);
    }
  }

  return (
    <div className="form">
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="inputs">
          <input
            value={username}
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      {signInNow ? (
        <button onClick={handleSignIn}>SignIn</button>
      ) : (
        <button onClick={handleSignUp}>SignUp</button>
      )}
    </div>
  );
};

export default Form;
