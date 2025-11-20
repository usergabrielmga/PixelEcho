import { useState } from 'react';
import Logo from '../assets/logo.png'
import { RegisterData } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom';

export function Register() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  async function handleRegister() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*]).{8,}$/;

    if (!emailRegex.test(email)) {
      alert("Email inválido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert(
        "Senha inválida.\n\nA senha deve conter:\n- Mínimo 8 caracteres\n- Pelo menos 1 letra maiúscula\n- Pelo menos 1 número\n- Pelo menos 1 caractere especial (!@#$%&*)"
      );
      return;
    }

    try {
      await RegisterData(name, email, password);
      alert("Conta criada com sucesso!");
      navigate("/Login");
    } catch (err) {
      console.error('Erro no cadastro:', err);
      alert("Erro ao cadastrar, tente novamente.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="flex flex-col items-center justify-center w-95 h-140 bg-[#0792FF] rounded-xl">
        <div className='w-30 mb-5'>
          <img src={Logo} alt="" />
        </div>

        <div className='w-75'>
          <div className='flex flex-col mb-5'>
            <label className='pb-2 text-white'>Nome:</label>
            <input
              className='h-8 pl-2 outline-none bg-white rounded-md'
              type="text"
              value={name}
              placeholder="Digite seu nome..."
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <Link to='/login' className='block text-sm text-center cursor-pointer text-white'>
            Já tem sua conta? Entre agora
          </Link>

          <button
            className='mt-5 w-75 h-10 rounded-md bg-[#174D65] text-white cursor-pointer'
            onClick={handleRegister}
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
