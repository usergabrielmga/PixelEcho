import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";


interface DropdownPhotosProps {
  onEdit: () => void;
  onDelete: () => void;
  onDownload: () => void;
}

export default function DropdownPhotos( { onEdit, onDelete, onDownload }: DropdownPhotosProps ) {

    const [open, setOpen] = useState(false);

    return(
        <div className="relative inline-block text-left">
             
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
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-gray-100 w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setOpen(false);
            }}
          >
            
          <FaEdit size={16} /> Editar
          </button>

            <button
            className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-gray-100 w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
              setOpen(false);
            }}
          >

          <FaDownload size={16} /> Baixar
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
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

