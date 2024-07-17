/* eslint-disable react/prop-types */
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear("token");
    alert("User Logged out successfully");
    return navigate("/");
  }

  return (
    <nav>
      <div className="logo">Be10x</div>
      <div className="user">
        {localStorage.length === 0 ? (
          <button id="signin">signin</button>
        ) : (
          <button onClick={handleLogout} id="logout">
            <TbLogout />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
