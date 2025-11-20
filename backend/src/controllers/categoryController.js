import Category from "../models/category.js";
import cloudinary from "../config/cloud.js";

export async function createCategory(req, res) {
  try {
    const { title } = req.body;
    let coverImageUrl = null;

    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (error) reject(error);
            else {
              coverImageUrl = result.secure_url;
              resolve();
            }
          }
        );
        stream.end(req.file.buffer);
    });
  }

    const newCategory = new Category({
      title,
      coverImage: coverImageUrl,
      userId: req.user.id, 
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Erro ao criar categoria:", err);
    res.status(500).json({ error: err.message });
  }
}


export async function getCategories(req, res) {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    let coverImageUrl = null;

    if (req.file) {
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "categories" },
          (error, result) => {
            if (result) {
              coverImageUrl = result.secure_url;
              resolve();
            } else {
              reject(error);
            }
          }
        );
        stream.end(req.file.buffer);
      });
    }

    const updateData = { title };
    if (coverImageUrl) updateData.coverImage = coverImageUrl;

    const category = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCategoryById(req, res) {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ 
      _id: id,
      userId: req.user.id // garante que só vê categorias do próprio usuário
    });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    res.json(category);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


export async function deleteCategory(req, res) {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    res.json({ message: "Categoria deletada com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
