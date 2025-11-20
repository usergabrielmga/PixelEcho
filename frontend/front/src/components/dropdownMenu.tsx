import { FaEdit, FaTrash } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";


interface DropdownMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function DropdownMenu( { onEdit, onDelete }: DropdownMenuProps ) {

    const [open, setOpen] = useState(false);

    return(
        <div>
             
        <button
            className="text-gray-600 hover:text-gray-900"
            onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
            }}
        >
        <BsThreeDots size={20} />
        </button>

        {open && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-10">
          <button
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setOpen(false);
            }}
          >
            <FaEdit size={16} /> Editar
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
              setOpen(false);
            }}
          >
            <FaTrash size={16} /> Excluir
          </button>
        </div>
        )}
         
                      
        </div>
    )
}

