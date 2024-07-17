import { Suspense } from "react";
import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Todos />
              </Suspense>
            }
          />
          <Route
            path="/signin"
            element={
              <Suspense fallback={"loading..."}>
                <Form />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
