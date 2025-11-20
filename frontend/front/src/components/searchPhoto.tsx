import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllPhotos } from "../services/photoService";
import ModalViewPhoto from "./modalViewPhoto";


interface PhotoType {
  _id: string;
  imageUrl: string;
  description: string;
  keywords?: string[];
  categoryId?: string;
}

export default function SearchPage() {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [filteredPhotos, setFilteredPhotos] = useState<PhotoType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);

  const fetchPhotos = async () => {
    try {
      const data = await getAllPhotos();
      setPhotos(data);
      setFilteredPhotos(data);
    } catch (err) {
      console.error("Erro ao buscar fotos:", err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setFilteredPhotos(photos);
      return;
    }
    const filtered = photos.filter(
      (photo) =>
        photo.description?.toLowerCase().includes(term) ||
        photo.keywords?.some((k) => k.toLowerCase().includes(term))
    );
    setFilteredPhotos(filtered);
  };

  const handleOpenModal = (photo: PhotoType | null) => {
    setSelectedPhoto(photo);
    setIsOpen(true);
  };

  return (
    <div className="p-6 w-full mt-25 md:mt-0">
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Busca de Fotos</h2>
      </div>

     
      <div className="relative w-full max-w-md mb-6">
  <input
    type="text"
    placeholder="Digite palavras-chave para buscar fotos..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full pl-3 md:pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
  />
  <FaSearch
    size={18}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    onClick={handleSearch}
  />
</div>

      
      <div className="columns-2 md:columns-3 xl:columns-4 gap-4">
        {filteredPhotos.length > 0 ? (
          filteredPhotos.map((photo) => (
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
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Nenhuma foto encontrada.
          </p>
        )}
      </div>

      
      {isOpen && selectedPhoto && (
        <ModalViewPhoto
          photo={selectedPhoto}
          onClose={() => setIsOpen(false)}
          refresh={fetchPhotos}
          categoryId="global"
        />
      )}
    </div>
  );
}
