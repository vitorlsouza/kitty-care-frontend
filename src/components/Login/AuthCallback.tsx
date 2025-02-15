import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthToken } from '../../utils/auth';
import LoadingOverlay from '../LoadingOverlay';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);

      const authData = {
        token: params.get('token') || '',
        email: params.get('email') || '',
        expiresIn: params.get('expiresIn') || '',
        photo: params.get('photo') || '',
      };

      if (!authData.token || !authData.email) {
        throw new Error('Missing authentication data');
      }

      setAuthToken(authData);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Auth callback error:', err);
      setError(err instanceof Error ? err.message : 'Authentication failed');
    }
  }, [location, navigate]);

  if (error) {
    return (
      <div className="auth-error">
        <p>{error}</p>
        <LoadingOverlay />
      </div>
    );
  }

  return <LoadingOverlay />;
};

export default AuthCallback;
