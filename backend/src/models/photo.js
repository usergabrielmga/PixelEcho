import mongoose from "mongoose"

const photoSchema =  new mongoose.Schema({
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    imageUrl: { type: String, required: true },
    public_id: { type: String, required: true },
    description: { type: String, required: false },
    keywords: [{ type: String }],
}, {timestamps: true})

export default mongoose.model("Photo", photoSchema);