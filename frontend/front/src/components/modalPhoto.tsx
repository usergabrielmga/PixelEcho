import { useState } from "react";
import { createPhoto } from "../services/photoService";

interface ModalPhotoProps {
  closeModal: () => void;
  categoryId: string; 
  refresh: () => void;
}

export function ModalPhoto({ closeModal, categoryId, refresh }: ModalPhotoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Selecione uma imagem para enviar");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo", file);
      formData.append("description", description);

      await createPhoto(categoryId, formData);

      refresh();
      closeModal();
    } catch (err) {
      console.error("Erro ao criar foto:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Adicionar Foto</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded p-2"
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
