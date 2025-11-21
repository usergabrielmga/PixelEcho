import Photo from "../models/photo.js";
import cloudinary from "../config/cloud.js";


export const createPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "Nenhum arquivo enviado" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "photos", public_id: `photo_${Date.now()}` },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const photo = await Photo.create({
      categoryId: req.params.categoryId,
      userId: req.user.id,
      imageUrl: result.secure_url,
      public_id: result.public_id,
      description: req.body.description,
      keywords: req.body.keywords || [],
    });

    res.status(201).json(photo);
  } catch (err) {
    console.error("Erro ao criar foto:", err);
    res.status(400).json({ error: err.message });
  }
};

// Buscar todas as fotos do usuário (Global)
export const getAllPhotos = async (req, res) => {
  try {
    if (!req.user || !req.user.id) return res.status(401).json({ error: "Usuário não autenticado" });
    const photos = await Photo.find({ userId: req.user.id });
    res.status(200).json(photos);
  } catch (err) {
    console.error("Erro ao buscar todas as fotos:", err);
    res.status(500).json({ error: "Erro ao buscar fotos" });
  }
};

// Buscar fotos por categoria
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find({
      categoryId: req.params.categoryId,
      userId: req.user.id,
    });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar fotos" });
  }
};


export const updatePhotoDescription = async (req, res) => {
  try {
    const { photoId } = req.params;
    const { description } = req.body;

    const updatedPhoto = await Photo.findByIdAndUpdate(
      photoId,
      { description },
      { new: true }
    );

    if (!updatedPhoto) return res.status(404).json({ message: "Foto não encontrada" });

    res.json(updatedPhoto);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar descrição" });
  }
};


export const deletePhoto = async (req, res) => {
  try {
    const { photoId } = req.params;

    const photo = await Photo.findOne({ _id: photoId, userId: req.user.id });
    if (!photo) return res.status(404).json({ error: "Foto não encontrada" });

    await cloudinary.uploader.destroy(photo.public_id);
    await Photo.findByIdAndDelete(photoId);

    res.status(200).json({ message: "Foto deletada com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const searchPhotos = async (req, res) => {
  try {
    const query = req.query.q;

    const photos = await Photo.find({
      userId: req.user.id,
      $or: [
        { description: { $regex: query, $options: "i" } },
        { keywords: { $regex: query, $options: "i" } },
      ],
    });

    res.json(photos);
  } catch (err) {
    res.status(500).json({ error: "Erro na busca" });
  }
};
