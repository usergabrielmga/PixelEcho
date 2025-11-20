import { useState } from "react";
import { FiDownload, FiTrash2, FiEdit2 } from "react-icons/fi";
import { deletePhoto, updatePhotoDescription } from "../services/photoService";

interface PhotoType {
  _id: string;
  imageUrl: string;
  description: string;
}

interface ModalViewPhotoProps {
  photo: PhotoType;
  onClose: () => void;
  refresh: () => void;
  categoryId?: string;
}

export default function ModalViewPhoto({
  photo,
  onClose,
  refresh,
  categoryId,
}: ModalViewPhotoProps) {
  const [description, setDescription] = useState(photo.description);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    if (!categoryId) return;
    setIsSaving(true);
    try {
      await updatePhotoDescription(categoryId, photo._id, description);
      refresh();
      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao salvar descrição:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryId) return;
    if (confirm("Deseja realmente excluir esta foto?")) {
      setIsDeleting(true);
      try {
        await deletePhoto(categoryId, photo._id);
        refresh();
        onClose();
      } catch (err) {
        console.error("Erro ao excluir foto:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(photo.imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "foto.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erro ao baixar imagem:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-11/12 md:w-3/5 max-h-[90vh] overflow-y-auto relative">
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        {/* Foto */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg mb-4 overflow-hidden max-h-[70vh]">
          <img
            src={photo.imageUrl}
            alt={photo.description}
            className="max-w-full max-h-[70vh] object-contain rounded-lg"
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          {!isEditing ? (
            <div className="flex justify-between items-start">
              <p className="text-gray-800 whitespace-pre-wrap">
                {description || "Sem descrição"}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-500 font-medium text-xl"
              >
                <FiEdit2 />
              </button>
            </div>
          ) : (
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2 mb-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setDescription(photo.description);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Ações principais com ícones */}
        <div className="flex justify-center gap-6 text-gray-700 text-2xl">
          <button
            onClick={handleDownload}
            className="hover:text-green-600 transition"
            title="Baixar"
          >
            <FiDownload />
          </button>
          <button
            onClick={handleDelete}
            className="hover:text-red-600 transition"
            title="Excluir"
            disabled={isDeleting}
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
}
