import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";

interface IProductForm {
  name: string;
  brand: string;
  model: string;
  yearOfManufacture: number;
  price: number;
  category: string;
  stock: number;
  description: string;
  image: string;
}

interface IProduct extends IProductForm {
  _id: string; // Add _id to the product interface
}

const ProductsManagement = () => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IProductForm>();

  const { data: productsData, isLoading } = useGetProductsQuery({});
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (data: IProductForm) => {
    try {
      // Convert specific fields to numbers
      const formattedData = {
        ...data,
        yearOfManufacture: Number(data.yearOfManufacture),
        price: Number(data.price),
        stock: Number(data.stock),
      };

      if (editingProductId) {
        await updateProduct({
          id: editingProductId,
          data: formattedData,
        }).unwrap();
        toast.success("Product updated successfully");
      } else {
        await createProduct(formattedData).unwrap();
        toast.success("Product created successfully");
      }
      reset();
      setEditingProductId(null);
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (product: IProduct) => {
    setEditingProductId(product._id);
    // Set form values for editing
    Object.keys(product).forEach((key) => {
      if (key in product) {
        setValue(key as keyof IProductForm, product[key]);
      }
    });
    // Scroll to the top of the page to see the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error((error as { data?: { message?: string } })?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Products</h2>

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 space-y-4 max-w-2xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Product Name"
              className="border p-2 rounded w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Brand"
              className="border p-2 rounded w-full"
              {...register("brand", { required: "Brand is required" })}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">
                {errors.brand.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Model"
              className="border p-2 rounded w-full"
              {...register("model", { required: "Model is required" })}
            />
            {errors.model && (
              <p className="text-red-500 text-sm mt-1">
                {errors.model.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Year of Manufacture"
              className="border p-2 rounded w-full"
              {...register("yearOfManufacture", {
                required: "Year of manufacture is required",
                min: { value: 1900, message: "Year must be valid" },
              })}
            />
            {errors.yearOfManufacture && (
              <p className="text-red-500 text-sm mt-1">
                {errors.yearOfManufacture.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-full"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded w-full"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              placeholder="Stock"
              className="border p-2 rounded w-full"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be positive" },
              })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="Image URL"
              className="border p-2 rounded w-full"
              {...register("image", { required: "Image URL is required" })}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <textarea
            placeholder="Description"
            className="border p-2 rounded w-full"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productsData?.data?.data?.map((product: IProduct) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{product.model}</td>
                <td className="px-6 py-4">{product.yearOfManufacture}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManagement;
