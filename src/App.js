import { Routes, Route } from "react-router-dom";
import RequireAuth from "./hooks/RequireAuth";
import ClientMaster from "./pages/ClientMaster/ClientMaster";
import ViewClients from "./pages/ClientMaster/ViewClients/ViewClients";
import AddClient from "./pages/ClientMaster/AddClient/AddClient";
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
        >
          <Route index element={<ViewClients />} />
          <Route path="add-client" element={<AddClient />} />
        </Route>
        <Route path="/start" element={<Welcome />} />
      </Routes>
    </>
  );
}

export default App;
