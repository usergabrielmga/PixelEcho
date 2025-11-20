import { useEffect, useState } from "react";
import { getAllPhotos } from "../services/photoService";
import ModalViewPhoto from "./modalViewPhoto";

interface PhotoType {
  categoryId: string | undefined;
  _id: string;
  imageUrl: string;
  description: string;
}

export function GlobalPhotos() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);

  const fetchPhotos = async () => {
    try {
      const data = await getAllPhotos();
      setPhotos(data);
    } catch (err) {
      console.error("Erro ao buscar fotos globais:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleOpenModal = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  };

  return (
    <div className="p-6 w-full mt-25 md:mt-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Todas as Fotos</h2>
       
      </div>

      {/* Grid tipo Pinterest */}
      <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="mb-4 break-inside-avoid relative rounded-lg shadow hover:scale-[1.02] transition cursor-pointer overflow-hidden bg-white"
            onClick={() => handleOpenModal(photo)}
          >
            <img
              src={photo.imageUrl}
              alt={photo.description}
              className="w-full h-auto object-contain"
            />
           
          </div>
        ))}
      </div>

      {/* ModalViewPhoto */}
      {isOpen && selectedPhoto && (
        <ModalViewPhoto
          photo={selectedPhoto}
          onClose={() => setIsOpen(false)}
          refresh={fetchPhotos}
          categoryId={selectedPhoto.categoryId} 
        />
      )}
    </div>
  );
}
