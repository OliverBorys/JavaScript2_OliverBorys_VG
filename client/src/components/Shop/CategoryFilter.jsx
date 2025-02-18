import PropTypes from "prop-types";

const CategoryFilter = ({
  categories,
  selectedCategory,
  handleCategoryChange,
}) => {
  return (
    <div className="w-full">
      <div className="sm:hidden flex justify-center gap-4 w-full">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none"
        >
          <option value="">All Items</option>
          {categories.map((category) => (
            <option key={category.id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <nav className="hidden sm:flex justify-center gap-6 border-b border-gray-300 pb-2 w-full">
        <button
          onClick={() => handleCategoryChange("")}
          className={`relative text-gray-700 pb-2 transition-all duration-300 hover:text-black ${
            selectedCategory === "" ? "font-bold" : ""
          }`}
        >
          All Items
          <span
            className={`absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ${
              selectedCategory === "" ? "w-full" : "hover:w-full"
            }`}
          ></span>
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              handleCategoryChange(category.categoryName.toLowerCase())
            }
            className={`relative text-gray-700 pb-2 transition-all duration-300 hover:text-black ${
              selectedCategory === category.categoryName.toLowerCase()
                ? "font-bold"
                : ""
            }`}
          >
            {category.categoryName}
            <span
              className={`absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 ${
                selectedCategory === category.categoryName.toLowerCase()
                  ? "w-full"
                  : "hover:w-full"
              }`}
            ></span>
          </button>
        ))}
      </nav>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      categoryName: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
};

export default CategoryFilter;
