import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Search from "../assets/Search.png";
import Photos from "../assets/PhotoEditor.png";
import DropdownSidebar from "./dropdownSidebar";
import { useEffect, useState } from "react";
import { IoMdMenu, IoMdClose } from "react-icons/io";


export default function SideBar() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setEmail("");
    navigate("/login");
  }

  return (
    <>
      {/* TOPO MOBILE */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-[#0792FF] flex justify-between items-center px-4 py-3 z-[60] shadow-md">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded-lg"
        >
          {isOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        </button>

        <a href="/dashboard">
          <img src={Logo} alt="Logo" className="w-16 h-auto mx-auto cursor-pointer"/>
        </a>
        

        
        <div className="w-10" />
      </div>

     
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static 
          top-0 left-0 
          h-full md:h-screen 
          w-64 md:w-[200px] 
          bg-[#0792FF] p-4 
          flex flex-col 
          transform md:transform-none 
          transition-transform duration-300 ease-in-out 
          z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${isOpen ? "pt-30  md:pt-0" : ""}  /* espaço da barra superior */
        `}
      >
        <div className="hidden md:flex justify-center mb-8">
          <a href="/dashboard"><img src={Logo} alt="logo" className="w-20 h-auto" /></a>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          <DropdownSidebar />

          <Link
            to="/photos/global"
            className="flex items-center gap-3 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <img src={Photos} alt="Upload" className="w-5 h-5" />
            Minhas Fotos
          </Link>

          <Link
            to="/search"
            className="flex items-center gap-3 text-white hover:text-gray-200"
            onClick={() => setIsOpen(false)}
          >
            <img src={Search} alt="Busca" className="w-5 h-5" />
            Busca
          </Link>
        </div>

        <div className="mt-auto">
          <p className="text-white text-sm">Conta Conectada:</p>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">
              {email || "Não conectado"}
            </span>
            {email && (
              <button
                onClick={handleLogout}
                className="ml-2 text-sm text-white cursor-pointer hover:text-red-600"
              >
                Sair
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
