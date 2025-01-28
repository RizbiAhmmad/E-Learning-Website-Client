import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPages = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-indigo-900 text-white">
            <div className="text-center animate-fadeIn">
                {/* Animated Status */}
                <h3 className="text-7xl font-bold mb-4 animate-bounce">404</h3>
                
                {/* Message */}
                <h2 className="text-5xl font-extrabold mb-2">
                    Page Not Found
                </h2>
                <p className="mb-8 text-lg opacity-80">
                    Oops! The page you’re looking for doesn’t exist or may have been moved.
                </p>

                {/* Back Home Button */}
                <Link to="/">
                    <button className="bg-white text-indigo-900 px-6 py-3 font-semibold rounded-lg hover:bg-indigo-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                        Back to Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPages;
