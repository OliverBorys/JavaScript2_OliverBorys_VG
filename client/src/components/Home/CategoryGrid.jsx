import { useNavigate } from "react-router-dom";

const CategoryGrid = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Shoes", img: "https://www.cafe.se/app/uploads/2024/11/IMG_1696.jpeg" },
    { name: "Clothes", img: "https://collectibledry.com/wp-content/uploads/2018/01/Gosha-x-Burberry-shot-by-Gosha-Rubchinskiy_001-1.jpg" },
    { name: "Bags", img: "https://mygemma.com/cdn/shop/articles/NEW-WPD-BLOG-Top-Image-12.png?v=1695912820" },
    { name: "Watches", img: "https://magazine.chrono24.com/cdn-cgi/image/f=auto,metadata=none,q=65/2022/11/Rolex-Datejust-Daytona-Explorer-2-1.jpg" },
    { name: "Sunglasses", img: "https://moscot.com/cdn/shop/files/lemtosh-tortoise-color-woodstock-orange-pos-2.jpg?v=1721853214&width=2295" },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/shop?category=${categoryName.toLowerCase()}`);
  };

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative w-full h-[300px] flex flex-col items-center group cursor-pointer"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-300 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 flex items-center justify-center bg-transparent text-white text-2xl font-semibold rounded-2xl group-hover:bg-black/50 duration-300">
              {category.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
