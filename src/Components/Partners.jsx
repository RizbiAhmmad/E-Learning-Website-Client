import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";


const Partners = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const partners = [
    {
      name: "Programming Hero",
      logo: "https://cdn-1.webcatalog.io/catalog/programming-hero/programming-hero-icon.png?v=1714780907586",
      description: "Leading provider of online learning solutions.",
    },
    {
      name: "W3 Schools",
      logo: "https://cdn.prod.website-files.com/60ffdd9e3c66d71b667eba0b/6470ee2574766c89099e3497_JcqFK_yAO6Av33xfNUmTM0r7f2bXs1HA0eqm_j7VTdw.png",
      description: "Innovator in education technology.",
    },
    {
      name: "Tutorials Point",
      logo: "https://miro.medium.com/v2/resize:fit:2400/2*b8mw7lPrrc9NU-iw2KkaAQ.png",
      description: "Empowering communities through skill development.",
    },
    {
      name: "Udemy",
      logo: "https://logowik.com/content/uploads/images/udemy-new-20212512.jpg",
      description: "A global leader in certification and training.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`py-12 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto px-8">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Our Partners
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          We collaborate with industry leaders to bring you the best learning experience.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delayChildren: 0.3, staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`rounded-lg shadow-lg p-8 text-center transition-all duration-500 ${
                isDarkMode
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-white text-black hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white"
              }`}
            >
              <motion.img
                src={partner.logo}
                alt={partner.name}
                className="w-20 h-20 mx-auto mb-4 object-contain"
                whileHover={{ scale: 1.1 }}
              />
              <h3 className="text-lg font-bold">{partner.name}</h3>
              <p className="text-sm mt-2">{partner.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Partners;
