import { useLoginForm } from '../hooks/useLoginForm';
import { LoginForm } from '../components/Login/LoginForm';
import Layout from '../components/Layout';
import { changeMethod } from '../Redux/features/billingSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '../Redux/hooks';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { error, isLoading, handleChange, handleSubmit } = useLoginForm();
  const urlParams = new URLSearchParams(window.location.search);

  // Handle plan selection from URL
  useEffect(() => {
    const planSelection = urlParams.get('planSelection');
    if (planSelection) {
      const isYearly = planSelection.toLowerCase() === "yearly";
      dispatch(changeMethod({ method: isYearly }));
    }
  }, [dispatch, urlParams]);

  return (
    <Layout>
      <div className="w-[343px] m-auto sm:w-[600px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
        <div className="w-full h-full flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
              Login
            </h2>
            <div className="text-base sm:text-lg font-medium">
              New to KittyCare?{' '}
              <span className="block sm:inline text-[#0061EF]">
                <a href={`/signup?${urlParams.toString()}`}>Sign up for free</a>
              </span>
            </div>
          </div>

          <LoginForm
            error={error}
            isLoading={isLoading}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};
export default Login;

