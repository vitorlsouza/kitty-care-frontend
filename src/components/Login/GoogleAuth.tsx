import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setAuthToken } from '../../utils/auth';

const GoogleAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const expiresIn = params.get('expiresIn');
    const email = params.get('email');

    if (token && expiresIn && email) {
      setAuthToken({ token, expiresIn, email });

      const returnTo = localStorage.getItem('returnTo') || '/dashboard';
      localStorage.removeItem('returnTo');

      navigate(returnTo, { replace: true });
    }
  }, [navigate]);

  const handleLogin = () => {
    localStorage.setItem('returnTo', window.location.pathname);
    window.location.href = `${
      import.meta.env.VITE_BACKEND_BASE_URL
    }/api/auth/google`;
  };

  return (
    <button
      className="border-2 border-mediumGray rounded-[20px] p-[9.5px]"
      onClick={handleLogin}
    >
      <FcGoogle size={32} />
    </button>
  );
};

export default GoogleAuth;
