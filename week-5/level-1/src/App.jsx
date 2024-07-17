/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import "./App.css";

const user = {
  name: "Sahil",
  description: "SDE at Google",
  interests: ["WEB DEV", "APP DEV", "OPEN SOURCE", "WEB 3"],
};

function App() {
  return (
    <div>
      <CardComponent user={user} />
    </div>
  );
}

const socialMediaHandleStyle = {
  padding: "0.5rem 1rem",
  textDecoration: "none",
  backgroundColor: "blue",
  color: "white",
  borderRadius: ".5rem",
  marginRight: "1rem",
};

function CardComponent({ user }) {
  return (
    <div
      style={{
        border: "1px solid grey",
        padding: "1rem",
        maxWidth: "fit-content",
      }}
    >
      <h1>{user.name}</h1>
      <p>{user.description}</p>
      <h2>Interests</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {user.interests.map((interest) => (
          <li>{interest}</li>
        ))}
      </ul>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={socialMediaHandleStyle}
          href="#"
        >
          LinkedIn
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={socialMediaHandleStyle}
          href="#"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}

export default App;
