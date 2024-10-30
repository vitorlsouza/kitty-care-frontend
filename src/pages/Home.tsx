
const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <a href="/cat-assistant" className="text-xl">Chatroom</a>
      <a href="/login" className="text-xl">Login</a>
      <a href="/signup" className="text-xl">Signup</a>
      <a href="/paymentmethod" className="text-xl">Payment Method</a>
      <a href="/paymentdetail" className="text-xl">Payment Detail</a>
    </div>
  );
};

export default Home;