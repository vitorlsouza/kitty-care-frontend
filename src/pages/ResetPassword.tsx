import Layout from '../components/Layout';
import TextInput from '../components/Login/Input';


const ResetPassword: React.FC = () => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    return (
        <Layout>
            <div className="w-[343px] m-auto sm:w-[600px] max-w-[90%] px-[21px] py-[47px] sm:px-[100px] sm:py-[70px] bg-white border-2 rounded-3xl border-[#B8B8B8]">
                <div className="w-full h-full flex flex-col items-center">
                    <div className="text-center">
                        <h2 className="text-[28px] sm:text-[40px] font-semibold pb-4">
                            Password Reset
                        </h2>
                    </div>
                </div>
                <div className='w-full text-center'>
                    <p className='text-base sm:text-lg'>Enter your current password and new password.</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                >
                    <TextInput
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        placeholder="Enter your current password"
                    />
                    <TextInput
                        name="newPassword"
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                    />
                    <TextInput
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your new password"
                    />
                    <button
                        type="submit"
                        className="w-full h-[55px] mt-6 text-base sm:text-xl 
                         bg-blue-600 text-white rounded-2xl
                         hover:bg-blue-700 active:bg-blue-800
                         disabled:bg-blue-400 disabled:cursor-not-allowed
                         transition-colors duration-200"
                        // disabled={isLoading}
                        // aria-busy={isLoading}
                    >
                        {/* {isLoading ? 'Logging in...' : 'Log in'} */}
                        Reset Password
                    </button>
                </form>
            </div>
        </Layout>
    );
};
export default ResetPassword;

