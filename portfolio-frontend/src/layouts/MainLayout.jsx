import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import './Mainlayout.css';
export default function MainLayout() {

  return (

    <div className="main-layout">
      <div className="container-layout">

      <Sidebar />
      <main
        className="content-area text-light min-vh-100 main-content"
      >
        <div className="container">
          <Outlet />

        </div>

      </main>
      </div>

    </div>

  )
}