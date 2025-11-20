import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPhotos } from "../services/photoService";
import { ModalPhoto } from "./modalPhoto";
import ModalViewPhoto from "./modalViewPhoto";
import { getCategoryById } from "../services/categoryService";


interface PhotoType {
  _id: string;
  imageUrl: string;
  description: string;
}

export function PhotosPage() {

  const [isViewOpen, setIsViewOpen] = useState(false);
  const { id } = useParams();
  
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
   const [categoryTitle, setCategoryTitle] = useState("");

  const fetchPhotos = async () => {
    if (!id) return;
    try {
      const data = await getPhotos(id);
      setPhotos(data);
    } catch (err) {
      console.error("Erro ao buscar fotos:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [id]);

  const handleNew = () => {
    setSelectedPhoto(null);
    setIsOpen(true);
  };


  const handleViewPhoto = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setIsViewOpen(true);
  };

     const fetchCategoryTitle = async () => {
    if (!id) return;
    const category = await getCategoryById(id);
    setCategoryTitle(category.title);
  };

  useEffect(() => {
    fetchCategoryTitle();
  }, [id]);
 

    return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{categoryTitle}</h2>
        <button
          onClick={handleNew}
          className="px-4 py-2 bg-sky-700 text-white rounded-lg hover:bg-green-500 transition hover:bg-sky-600
            hover:scale-105 
            transform 
            transition-all 
            duration-300
            cursor-pointer
            "
        >
          Adicionar Nova Foto
        </button>
      </div>

     
    <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
      {photos.map((photo) => (
        <div
          key={photo._id}
          onClick={() => handleViewPhoto(photo)}
          className="mb-4 break-inside-avoid rounded-lg overflow-hidden shadow hover:scale-[1.02] transition cursor-pointer"
        >
          <img
            src={photo.imageUrl}
            alt={photo.description}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      ))}
    </div>


  
      {isOpen && id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <ModalPhoto
            closeModal={() => setIsOpen(false)}
            categoryId={id}
            refresh={fetchPhotos}
          />
        </div>
      )}

    
      {isViewOpen && selectedPhoto && (
        <ModalViewPhoto
          photo={selectedPhoto}
          onClose={() => setIsViewOpen(false)}
          refresh={fetchPhotos}
          categoryId={id}
        />
      )}
    </div>
  );
}
