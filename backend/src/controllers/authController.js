import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import Category from "../models/category.js";



const JWT_SECRET = process.env.JWT_SECRET || "SUA_CHAVE_SECRETA";

export const register = async (req, res) => {
    const {name, email, password} = req.body


    try {
        const existingUser = await User.findOne({email})

        if(existingUser) {
             return res.status(400).json({ error: "Email já cadastrado" });
        }

      const hashedPassword = await bcrypt.hash(password, 10);

    
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      await Category.create({
        title: "Todas",
        userId: newUser._id,
        coverImage: "https://res.cloudinary.com/dtbjxy7iv/image/upload/v1762796456/photos/photo_1762796456042.jpg",
        isFixed: true
      });

      return res.status(201).json({ message: "Usuário registrado com sucesso!" });
      } catch(error)  {
      console.error(error);
      return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}



export const login = async (req, res) => {

const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); 

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

   return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: `Bem-vindo, ${user.name}!`,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }

}

export function authenticateToken(req, res, next) {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
  if (err) return res.status(403).json({ message: "Token inválido ou expirado" });
  req.user = user;
  next();
});

}

