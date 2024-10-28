import { useState } from "react";
import Divider from "../components/Login/Divider";
import TextInput from "../components/Login/Input";
import LogBtnBy from "../components/Login/LogBtnBy";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (userInfo.email === "" || userInfo.password === "") {
      setError("Please fill in all fields");
      setTimeout(() => {
        setError("");
      }, 3000);
    } else {
      console.log(userInfo);
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
      <div className="flex flex-col sm:flex-row">
        <div>
          <div className="w-[343px] h-[680px] sm:w-[608px] sm:h-[98%] max-w-[90%] px-[21px] py-[47px] sm:px-[104px] sm:py-[70px] border-2"></div>
        </div>
        <div>
          <div className="w-[343px] h-[680px] sm:w-[608px] sm:h-[98%] max-w-[90%] px-[21px] py-[47px] sm:px-[104px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="text-center">
                <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                  Sign up
                </h2>
                <div className="text-base sm:text-lg font-medium">
                  Already have an account?{" "}
                  <span>
                    <a href="/login">Login</a>
                  </span>
                </div>
              </div>

              <div className="w-full h-full flex-col justify-between">
                <TextInput
                  name="firstName"
                  label=""
                  type="text"
                  placeholder="First name"
                  className={error ? "border-red-500" : ""}
                  onChange={handleChange}
                />
                <TextInput
                  name="lastName"
                  label=""
                  type="text"
                  placeholder="Last name"
                  className={error ? "border-red-500" : ""}
                  onChange={handleChange}
                />
                <TextInput
                  name="email"
                  label=""
                  type="email"
                  placeholder="name@email.com"
                  className={error ? "border-red-500" : ""}
                  onChange={handleChange}
                />
                <TextInput
                  name="password"
                  label=""
                  type="password"
                  placeholder="Password (8+ characters)"
                  className={error ? "border-red-500" : ""}
                  onChange={handleChange}
                />
                <div className="my-3">
                  <div className="w-full h-[52px] my-10">
                    <input
                      className="w-full h-[55px] text-base sm:text-xl border-2 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 active:bg-blue-800 cursor-pointer"
                      type="submit"
                      value="Create account"
                      onClick={handleSubmit}
                    />
                    <div className="text-sm text-center text-red-500 my-2">
                      {error}
                    </div>
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
      </div>
    </div>
  );
};

export default Signup;
