import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4">
       
        <div className="flex flex-wrap items-center justify-between">
          
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">E-Learning</h2>
            <p className="text-sm">
              Your one-stop platform for learning and teaching. Join us to
              explore knowledge and grow your skills!
            </p>
          </div>

          
          <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
            <h3 className="text-lg font-bold text-white mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-blue-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/classes"
                  className="hover:text-blue-500 transition-colors"
                >
                  All Classes
                </a>
              </li>
              <li>
                <a
                  href="/teach"
                  className="hover:text-blue-500 transition-colors"
                >
                  Teach
                </a>
              </li>
            </ul>
          </div>

          
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        
        <div className="border-t border-gray-700 my-6"></div>

        
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} E-Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
