import cors from 'cors';

console.log("valor vindo da env:", process.env.CLIENT_URL);

export const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};