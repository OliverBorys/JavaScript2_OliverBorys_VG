import PropTypes from "prop-types";

const SortDropdown = ({ sort, handleSortChange }) => {
  return (
    <div className="w-full sm:w-auto sm:mt-4 flex sm:justify-end items-center">
      <label htmlFor="sortDropdown" className="hidden sm:flex text-sm font-medium text-gray-700 sm:mr-2">
        Sort By:
      </label>
      <select
        id="sortDropdown"
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="border border-gray-300 rounded-md px-1 py-2 text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Price</option>
        <option value="lowest">Lowest Price</option>
      </select>
    </div>
  );
};

SortDropdown.propTypes = {
  sort: PropTypes.string.isRequired,
  handleSortChange: PropTypes.func.isRequired,
};

export default SortDropdown;
