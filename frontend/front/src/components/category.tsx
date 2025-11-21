import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory, deleteCategory } from "../services/categoryService";
import { ModalCategory } from "./modalCategory";
import DropdownMenu from "./dropdownMenu";
import { IoMdAddCircle } from "react-icons/io";

interface CategoryType {
  _id: string;
  title: string;
  coverImage?: string;
  isFixed?: boolean;
}



export function Category() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const navigate = useNavigate();

  

  const fetchCategories = async () => {
    try {
      const data = await getCategory();

    
      const fixed = data.find((cat: { isFixed: boolean; }) => cat.isFixed);
      const others = data.filter((cat: { isFixed: boolean; }) => !cat.isFixed);
      setCategories(fixed ? [fixed, ...others] : others);

    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNew = () => {
    setSelectedCategory(null);
    setIsOpen(true);
  };

  const handleEdit = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setIsOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await deleteCategory(id);
        await fetchCategories();
      } catch (err) {
        console.error("Erro ao excluir categoria:", err);
      }
    }
  };
  


  return (
    <div className="p-10 w-full  pt-[110px] md:pt-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-2xl shadow  flex flex-col items-center relative cursor-pointer group overflow-hidden hover:scale-105 duration-200 ease-in"
            onClick={() => {
              if (cat.isFixed) {
                navigate("/photos/global"); 
              } else {
                navigate(`/categories/${cat._id}/photos`);
              }
            }}
          >
            {cat.coverImage && (
              <div className="relative w-full">
                <img
                  src={cat.coverImage}
                  alt={cat.title}
                  className="w-full object-cover rounded-lg"
                />

                <h3 className="relative bottom-0 left-0 w-full text-center py-2 ">
                  {cat.title}
                </h3>

              
                {!cat.isFixed && (
                  <div className="absolute top-1 right-2">
                    <DropdownMenu
                      onEdit={() => handleEdit(cat)}
                      onDelete={() => handleDelete(cat._id)}
                    />
                  </div>
                )}

              </div>
            )}
          </div>
        ))}

        <div
          className="bg-white rounded-2xl shadow flex flex-col items-center justify-center cursor-pointer group hover:scale-105 duration-200 ease-in overflow-hidden"
          onClick={handleNew}
        >
        <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 flex flex-col items-center justify-center">
          <IoMdAddCircle size={40} className="text-sky-700" />
          <h3 className="mt-2 text-center text-sm sm:text-base font-medium text-sky-700">
            Nova Categoria
          </h3>
        </div>
  </div>
        
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <ModalCategory
            closeModal={() => setIsOpen(false)}
            category={selectedCategory}
            refresh={fetchCategories}
          />
        </div>
      )}
    </div>
  );
}
