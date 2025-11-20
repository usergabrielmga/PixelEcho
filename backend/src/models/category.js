import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    coverImage: { type: String, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    isFixed: { type: Boolean, default: false }
})

export default mongoose.model('Category', categorySchema);