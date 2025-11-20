import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/cropImage";
import { CreateCategory, updateCategory } from "../services/categoryService";

interface ModalCategoryProps {
  closeModal: () => void;
  category?: { _id: string; title: string; coverImage?: string } | null;
  refresh: () => void;
}

export function ModalCategory({ closeModal, category, refresh }: ModalCategoryProps) {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setPreview(category.coverImage || null);
      setCoverImage(null);
    } else {
      setTitle("");
      setPreview(null);
      setCoverImage(null);
    }
  }, [category]);

  const handleCropComplete = (_: any, croppedAreaPixelsValue: any) => {
    setCroppedAreaPixels(croppedAreaPixelsValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let fileToUpload = coverImage;

    if (preview && croppedAreaPixels) {
      fileToUpload = await getCroppedImg(preview, croppedAreaPixels);
    }

    try {
      if (category) {
        await updateCategory(category._id, title, fileToUpload);
      } else {
        await CreateCategory(title, fileToUpload);
      }

      refresh();
      closeModal();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {category ? "Editar Categoria" : "Nova Categoria"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="text"
          placeholder="Título da categoria"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-lg px-3 py-2"
          required
        />

        {preview && (
          <div className="relative w-full h-52 bg-black/80 rounded-lg overflow-hidden">
            <Cropper
              image={preview}
              crop={crop}
              zoom={zoom}
              aspect={255 / 170}         
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
        )}

        {preview && (
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setCoverImage(file);
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {category ? "Salvar" : "Criar"}
          </button>
        </div>
      </form>
    </div>
  );
}
