import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // не даём странице перезагрузиться
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'reqres-free-v1', // ключ, который требует reqres.in
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // успех — сохраняем токен и уходим на страницу профиля
        localStorage.setItem('token', data.token);
        navigate('/profile');
      } else {
        // сервер ответил ошибкой (неверные данные, нет ключа и т.д.)
        setError(data.error || 'Ошибка входа');
      }
    } catch (err) {
      // запрос вообще не ушёл (нет сети и т.п.)
      setError('Сбой сети: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Вход</h1>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Войти</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
