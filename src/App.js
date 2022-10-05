import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hooks/RequireAuth";
import ClientMaster from "./pages/ClientMaster/ClientMaster";
import Welcome from "./pages/Welcome/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <ClientMaster />
            </RequireAuth>
          }
        />
        <Route path="/start" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
