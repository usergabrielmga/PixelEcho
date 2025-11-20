import { Link } from "react-router-dom";
import Folder from "../assets/Opened Folder.png";
import FolderClosed from "../assets/closed-folder.png";
import { useEffect, useState } from "react";
import { getCategory } from "../services/categoryService";

interface CategoryType {
  _id: string;
  title: string;
  coverImage?: string;
}

export default function DropdownSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategory();
      setCategories(data);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 text-white hover:text-gray-200 w-full cursor-pointer"
      >
        <img
          src={isOpen ? Folder : FolderClosed}
          alt="Categorias"
          className={`
            w-5 h-5 
            transition-all duration-300 ease-out
            ${isOpen ? "opacity-100 scale-100" : "opacity-80 scale-95"}
          `}
        />
        Categorias
      </button>

      {isOpen && (
        <div className="ml-8 mt-2 flex flex-col gap-1 animate-fadeInList">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <Link
                key={category._id}
                to={`/categories/${category._id}/photos`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 opacity-0 animate-fadeItem"
                style={{ animationDelay: `${index * 80}ms` }} // Apresentação gradual
              >
                {category.coverImage && (
                  <img
                    src={category.coverImage}
                    alt={category.title}
                    className="w-5 h-5 rounded-md object-cover"
                  />
                )}
                <span>{category.title}</span>
              </Link>
            ))
          ) : (
            <span className="text-gray-400 text-sm">
              Nenhuma categoria encontrada
            </span>
          )}
        </div>
      )}
    </div>
  );
}
