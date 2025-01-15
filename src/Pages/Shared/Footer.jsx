import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-gray-300 py-8 mt-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">E-Learning</h2>
            <p className="text-sm">
              Your one-stop platform for learning and teaching. Join us to
              explore knowledge and grow your skills!
            </p>
          </div>

          {/* Center Section */}
          <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
            <h3 className="text-lg font-bold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-300 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/classes"
                  className="hover:text-blue-300 transition-colors"
                >
                  All Classes
                </a>
              </li>
              <li>
                <a
                  href="/teach"
                  className="hover:text-blue-300 transition-colors"
                >
                  Teach
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded-full"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors bg-gradient-to-r from-blue-400 to-blue-600 p-2 rounded-full"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors bg-gradient-to-r from-blue-600 to-blue-800 p-2 rounded-full"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors bg-gradient-to-r from-pink-500 to-pink-700 p-2 rounded-full"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm text-gray-300">
            &copy; {new Date().getFullYear()} E-Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
