const Banner = () => {
    return (
      <section
        className="relative bg-cover bg-center bg-no-repeat h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: `url('https://moxit.com.ar/wp-content/uploads/2021/10/istockphoto-1213778711-612x612-1.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div> 
  
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Welcome to E-Learning</h1>
          <p className="text-lg lg:text-xl mb-6">
            Discover knowledge and grow your skills with our platform.
          </p>
          <a
            href="/classes"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
          >
            Explore Classes
          </a>
        </div>
      </section>
    );
  };
  
  export default Banner;
  