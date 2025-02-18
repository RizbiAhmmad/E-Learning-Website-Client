import { useContext } from "react";
import { motion } from "framer-motion";
import { Check, Crown, Star, Zap } from "lucide-react";
import { ThemeContext } from "../providers/ThemeProvider";


const PricingPlans = () => {
  const { isDarkMode } = useContext(ThemeContext);

  const plans = [
    {
      name: "Basic",
      price: "$10",
      period: "per month",
      icon: <Zap className="w-8 h-8 text-blue-500 dark:text-blue-400" />,
      features: [
        "Access to essential courses",
        "Community discussions",
        "Standard email support",
        "24/7 helpdesk",
        "Basic progress tracking",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$20",
      period: "per month",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      features: [
        "Full access to all courses",
        "Priority support",
        "Exclusive learning materials",
        "Advanced progress tracking",
        "Personalized study plans",
      ],
      cta: "Choose Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: "$30",
      period: "per month",
      icon: <Crown className="w-8 h-8 text-purple-500" />,
      features: [
        "All Pro features",
        "1-on-1 Mentorship",
        "Early access to new content",
        "Dedicated learning consultant",
        "Custom course branding",
      ],
      cta: "Go Premium",
      popular: false,
    },
  ];

  return (
    <section className={` transition-all duration-300 ${isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"}`}>
      <div className="container mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <motion.h1
            className={`text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Flexible Plans for Every Learner
          </motion.h1>
          <motion.p
            className="text-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you're just starting or mastering a skill, we have the perfect plan for you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative ${plan.popular ? "lg:-mt-4" : ""}`}
            >
              <div
                className={`h-full rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden 
                ${isDarkMode ? "bg-gray-800" : "bg-white"}
                ${plan.popular ? "border-2 border-blue-500 dark:border-blue-400" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-center justify-center mb-4">{plan.icon}</div>
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center mb-6">
                    <span className={`text-5xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {plan.price}
                    </span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 
                    ${plan.popular ? "bg-blue-500 hover:bg-blue-600 text-white" : 
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-900"}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400">All plans include a 14-day money-back guarantee.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
