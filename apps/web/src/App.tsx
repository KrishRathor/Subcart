import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { StorePage } from "./pages/StorePage";
import { EditPage } from "./pages/EditPage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/store" element={<StorePage />} />
        <Route path="/dashboard/edit" element={<EditPage />} />
      </Routes>

    </div>
  )
}

export default App
