import express from 'express';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import { corsOptions } from './config/cors.js';
import cors from 'cors';
import photoRoutes from "./routes/photoRoutes.js";





const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


connectDB();



app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", photoRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
