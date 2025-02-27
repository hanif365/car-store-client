import { useState, useEffect } from "react";

interface ProductFiltersProps {
  onFilterChange: (filters: Record<string, unknown>) => void;
  brands: string[];
  categories: string[];
  models: string[];
}

const ProductFilters = ({
  onFilterChange,
  brands,
  categories,
  models,
}: ProductFiltersProps) => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    brand: "",
    category: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFilters((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      searchTerm: "",
      brand: "",
      category: "",
      model: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Search Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleInputChange}
          placeholder="Search products..."
          className="w-full p-2 border rounded focus:ring-brand-primary focus:border-brand-primary"
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleInputChange}
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
          />
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleInputChange}
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Brand Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Brand
        </label>
        <select
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Category Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="category"
          value={filters.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Model Select */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Model
        </label>
        <select
          name="model"
          value={filters.model}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">All Models</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="inStock"
          checked={filters.inStock}
          onChange={handleInputChange}
          className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
        />
        <label className="ml-2 block text-sm text-gray-700">In Stock Only</label>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={handleClearFilters}
        className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded hover:bg-gray-200 transition duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ProductFilters;
