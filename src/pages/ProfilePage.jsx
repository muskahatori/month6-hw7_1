import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('token');
    if (!saved) {
      // нет токена — не пускаем на страницу, отправляем на вход
      navigate('/');
      return;
    }
    setToken(saved);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // удаляем токен
    navigate('/');
  };

  if (!token) return null; // пока проверяем/редиректим — ничего не рисуем

  return (
    <div className="container">
      <h1>Вы вошли</h1>
      <p>Токен сохранён в localStorage:</p>
      <code className="token">{token}</code>
      <button className="logout" onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default ProfilePage;
