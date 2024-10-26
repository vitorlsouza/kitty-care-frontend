import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-around">
      <div className="w-[200px] h-[40px]">
        <img
          className="w-full h-fill"
          src="/assets/svg/KittyLogo.svg"
          alt="kitty logo"
        />
      </div>
      <div className="w-[343px] h-[680px] sm:w-[600px] sm:h-[725px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] border-2 rounded-3xl border-black">
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
            <div className="my-3 flex flex-col">
              <label className=" text-base sm:text-xl font-bold sm:font-medium m-4">Email</label>
              <div className="w-full h-[52px]">
                <input
                  className="w-full py-3 sm:py-4 px-4  text-base sm:text-xl border-2 rounded-lg"
                  type="email"
                  placeholder="name@email.com"
                />
              </div>
            </div>
            <div className="my-3 flex flex-col">
              <label className=" text-base sm:text-xl font-bold sm:font-medium m-4">Password</label>
              <div className="w-full h-[52px] relative">
                <input
                  className="w-full py-3 sm:py-4 px-4  text-base sm:text-xl border-2 rounded-lg pr-12"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password (8+ characters)"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[55%] sm:top-[70%] transform -translate-y-1/2 hover:border-none focus:outline-none bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <div className="text-[#FF7070] relative mt-5 ml-5 text-[14px] font-medium">
                Forgot Password?
              </div>
            </div>
            <div className="my-3">
              <div className="w-full h-[52px] my-10">
                <input
                  className="w-full py-3 sm:py-4 px-4 text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl"
                  type="submit"
                  placeholder="Email"
                  value="Log in"
                />
              </div>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div className="w-[120px] h-[1px] bg-black"></div>
              <div className="hidden sm:flex w-[56px] h-[56px] p-3 flex-col items-center justify-center border-2 border-[#898B90] rounded-[20px]">
                <div className="w-[31px] h-[31px]">
                  <img
                    className="w-full h-full"
                    src="/assets/png/google.png"
                    alt="Google"
                  />
                </div>
              </div>
              <div className="sm:hidden">Or</div>
              <div className="hidden sm:flex w-[56px] h-[56px] p-3 flex-col items-center justify-center border-2 border-[#898B90] rounded-[20px]">
                <div className="w-[31px] h-[31px]">
                  <img
                    className="w-full h-full"
                    src="/assets/png/apple.png"
                    alt="Apple"
                  />
                </div>
              </div>
              <div className="w-[120px] h-[1px] bg-black"></div>
            </div>
            <div className="flex gap-4 items-center justify-center m-4">
              <div className="flex sm:hidden w-[56px] h-[56px] p-3 flex-col items-center justify-center border-2 border-[#898B90] rounded-[20px]">
                <div className="w-[31px] h-[31px]">
                  <img
                    className="w-full h-full"
                    src="/assets/png/google.png"
                    alt="Google"
                  />
                </div>
              </div>
              <div className="flex sm:hidden w-[56px] h-[56px] flex-col items-center justify-center border-2 border-[#898B90] rounded-[20px]">
                <div className="w-[31px] h-[31px]">
                  <img
                    className="w-full h-full"
                    src="/assets/png/apple.png"
                    alt="Apple"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
