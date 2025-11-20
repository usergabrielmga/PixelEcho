import { useState } from 'react';
import Logo from '../assets/logo.png'
import { getDashboardData, LoginData } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom';

export function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Email inválido.");
      return;
    }

    if (password.length < 1) {
      alert("Digite sua senha.");
      return;
    }

    try {
      const data = await LoginData(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("userEmail", email);

      await getDashboardData(data.token);
      navigate("/dashboard");

    } catch (err) {
      console.error('Erro no login:', err);

      
      alert("Email ou senha incorretos.");
    }
  }

  return(
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center w-90 h-120 bg-[#0792FF] rounded-xl">
        <div className='w-30 mb-5'>
          <img src={Logo} alt="" />
        </div>

        <div className='w-75'>
          <div className='flex flex-col mb-5'>
            <label className='pb-2 text-white'>Email:</label>
            <input
              className='h-8 pl-2 outline-none bg-white rounded-md'
              type="email"
              value={email}
              placeholder="Digite seu email..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='flex flex-col mb-5'>
            <label className='pb-2 text-white'>Senha:</label>
            <input
              className='h-8 pl-2 outline-none bg-white rounded-md'
              type="password"
              value={password}
              placeholder="Digite sua senha..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link to='/register' className='block text-sm text-center text-white'>
            Não tem conta? Crie uma agora
          </Link>

          <button
            className='mt-5 w-75 h-10 rounded-md bg-[#174D65] text-white'
            onClick={handleLogin}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}
