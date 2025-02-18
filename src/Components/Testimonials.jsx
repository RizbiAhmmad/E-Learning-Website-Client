import React, { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Import autoplay styles
import { Navigation, Autoplay } from "swiper/modules"; // Import Autoplay module
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { ThemeContext } from "../providers/ThemeProvider";

const Testimonials = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <section
      className={`py-12 px-8 transition-all duration-300 ${
        isDarkMode ? "bg-black text-white" : "bg-gray-100 text-black"
      }`}
    >
      <h2 className="text-3xl font-semibold text-center">What Our Students Say</h2>

      <Swiper
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
        modules={[Navigation, Autoplay]} 
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="flex flex-col items-center m-16">
              <Rating style={{ maxWidth: 180 }} value={review.rating} readOnly />
              <p className="py-8 text-center">{review.details}</p>
              <h3 className="text-2xl text-orange-400">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
