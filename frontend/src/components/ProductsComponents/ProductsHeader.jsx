

function ProductsHeader({ onCategorySelect }) {

  const categories = [
    { name: "watch", image: "./img/w-7.webp" },
    { name: "headphones", image: "./img/headphone-1.webp" },
    { name: "pods", image: "./img/pods1.webp" },
    { name: "extras", image: "./img/speaker.webp" },
  ];

  return (
    <div className="flex flex-col items-center mt-20 mb-20">
      <h2 className="text-6xl font-semibold font-poppins pb-3 mb-14 md:mb-10 sm:mb-10 bg-gradient-to-r from-cyan-400 via-cyan-600 to-sky-400 bg-clip-text text-transparent">
        Categories
      </h2>
      <div className="flex justify-center gap-20 flex-wrap">
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer group flex-col items-center gap-4  "
              onClick={() => onCategorySelect(category.name)}
            >
              <div className="w-20 h-20 bg-[#1a1a1a] flex items-center justify-center rounded-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 transition-all duration-300 group-hover:-translate-y-2 rounded-full"
                />
              </div>
              <p className="text-lg font-medium transition-all duration-200 group-hover:text-[#ced4da]">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductsHeader;
