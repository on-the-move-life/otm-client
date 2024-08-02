import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8 text-center">
        Page not found 😢
      </h1>
      <button
        onClick={handleGoHome}
        className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none text-lg md:text-xl"
      >
        Go To Home
      </button>
    </div>
  );
}