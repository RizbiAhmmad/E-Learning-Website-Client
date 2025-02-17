const Banner = () => {
  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/e-learning-technology-concept_46706-901.jpg?semt=ais_hybrid')`,
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
          className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition"
        >
          Explore Classes
        </a>
      </div>
    </section>
  );
};

export default Banner;
