
const Home = () => {
  return (
    <div className="w-full h-[700px] flex flex-col items-center justify-center gap-3">
      <a href="/cat-assistant" className="text-xl">Chatroom</a>
      <a href="/login" className="text-xl">Login</a>
      <a href="/signup" className="text-xl">Signup</a>
      <a href="/paymentmethod" className="text-xl">Payment Method</a>
      <a href="/paymentdetail" className="text-xl">Payment Detail</a>
      <a href="/progress" className="text-xl">Go to Progress</a>
    </div>
  );
};

export default Home;
