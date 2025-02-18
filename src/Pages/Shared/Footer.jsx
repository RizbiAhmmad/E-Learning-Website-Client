import { useContext } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { ThemeContext } from "../../providers/ThemeProvider";

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer
      className={`py-12 px-8 transition-all duration-300 ${
        isDarkMode ? "bg-black text-gray-400" : "bg-gray-100 text-gray-700"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Section */}
          <div className="w-full text-center lg:text-left lg:w-1/3 mb-6 lg:mb-0">
            <h2 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              E-Learning
            </h2>
            <p className="text-md">
              Your one-stop platform for learning and teaching. Join us to
              explore knowledge and grow your skills!
            </p>
          </div>

          {/* Center Section */}
          <div className="w-full lg:w-1/3 text-center mb-6 lg:mb-0">
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/classes" className="hover:text-blue-500 transition-colors">
                  All Classes
                </a>
              </li>
              <li>
                <a href="/teach" className="hover:text-blue-500 transition-colors">
                  Teach
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Social Media */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end gap-4">
            {[
              { href: "https://www.facebook.com/mdakashkhan444/", icon: <FaFacebook />, bg: "bg-blue-600" },
              { href: "https://github.com/RizbiAhmmad", icon: <FaGithub />, bg: "bg-gray-800" },
              { href: "https://www.linkedin.com/in/rizbi2001/", icon: <FaLinkedin />, bg: "bg-blue-700" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : `${social.bg} text-white hover:opacity-80`
                }`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t my-6 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}></div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} E-Learning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
