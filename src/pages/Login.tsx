import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../Redux/hooks";
import { loginUserAsync } from "../Redux/features/userSlice";
import Divider from "../components/Login/Divider";
import TextInput from "../components/Login/Input";
import LogBtnBy from "../components/Login/LogBtnBy";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // Clear errors when user types
    setError({ ...error, [e.target.name]: "", general: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...error };

    if (!userInfo.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!userInfo.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setError(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await dispatch(loginUserAsync({
        email: userInfo.email,
        password: userInfo.password,
      })).unwrap();

      // Clear form and errors
      setUserInfo({ email: "", password: "" });
      setError({ email: "", password: "", general: "" });

      // Redirect on success
      navigate("/dashboard");
    } catch (err: any) {
      setError({
        ...error,
        general: err.message || "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-around">
      <div className="w-[150px] h-[30px] sm:w-[200px] sm:h-[40px]">
        <img
          className="w-full h-full"
          src="/assets/svg/KittyLogo.svg"
          alt="kitty logo"
        />
      </div>
      <div className="w-[343px] h-[680px] sm:w-[600px] sm:h-[725px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
        <div className="w-full h-full flex flex-col items-center justify-between">
          <div className="text-center">
            <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
              Login
            </h2>
            <div className="text-base sm:text-lg font-medium">
              New to KittyCare?{" "}
              <span>
                <a href="/signup">Sign up for free</a>
              </span>
            </div>
          </div>

          <div className="w-full h-full flex-col justify-between">
            <TextInput
              name="email"
              label="Email"
              type="email"
              placeholder="name@email.com"
              className={error.email ? "border-red-500" : ""}
              onChange={handleChange}
              error={error.email}
            />
            <TextInput
              name="password"
              label="Password"
              type="password"
              placeholder="Password (8+ characters)"
              className={error.password ? "border-red-500" : ""}
              onChange={handleChange}
              error={error.password}
            />

            {error.general && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error.general}
              </div>
            )}

            <div className="my-3">
              <div className="w-full h-[52px] my-[30px]">
                <input
                  className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer disabled:bg-blue-400"
                  type="submit"
                  value={isLoading ? "Logging in..." : "Log in"}
                  onClick={handleSubmit}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <Divider />
              <LogBtnBy
                src="/assets/png/google.png"
                alt="Google"
                className="hidden sm:flex"
              />
              <div className="sm:hidden">Or</div>
              <LogBtnBy
                src="/assets/png/apple.png"
                alt="Apple"
                className="hidden sm:flex"
              />
              <Divider />
            </div>
            <div className="flex sm:hidden gap-4 items-center justify-center m-4">
              <LogBtnBy
                src="/assets/png/google.png"
                alt="Google"
                className="flex"
              />
              <LogBtnBy
                src="/assets/png/apple.png"
                alt="Apple"
                className="flex"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
