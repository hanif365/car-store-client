import { useState, useRef, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/features/products/productsApi";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/utils/imageUpload";
import Loader from "@/components/Shared/Loader/Loader";

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
  _id: string;
}

const ProductsManagement = () => {
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue("image", "");
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = async (data: IProductForm) => {
    try {
      setIsUploading(true);

      let imageUrl = data.image;

      if (imageFile) {
        toast.loading("Uploading image...");
        imageUrl = await uploadImageToImgBB(imageFile);
        toast.dismiss();
      }

      if (!imageUrl) {
        toast.error("Please provide an image URL or upload an image");
        setIsUploading(false);
        return;
      }

      const formattedData = {
        ...data,
        yearOfManufacture: Number(data.yearOfManufacture),
        price: Number(data.price),
        stock: Number(data.stock),
        image: imageUrl,
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
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (product: IProduct) => {
    setEditingProductId(product._id);
    Object.keys(product).forEach((key) => {
      if (key in product) {
        setValue(key as keyof IProductForm, product[key as keyof IProduct]);
      }
    });

    setImagePreview(product.image);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        (error as { data?: { message?: string } })?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-2 sm:px-1 py-3 sm:py-6 max-w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="mb-8 space-y-6 w-full bg-white p-4 sm:p-6 rounded-xl shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Product Name"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Brand"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("brand", { required: "Brand is required" })}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Model"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("model", { required: "Model is required" })}
            />
            {errors.model && (
              <p className="text-red-500 text-sm">{errors.model.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Year of Manufacture"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("yearOfManufacture", {
                required: "Year of manufacture is required",
                min: { value: 1900, message: "Year must be valid" },
              })}
            />
            {errors.yearOfManufacture && (
              <p className="text-red-500 text-sm">
                {errors.yearOfManufacture.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price must be positive" },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Category"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("category", { required: "Category is required" })}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <input
              type="number"
              placeholder="Stock"
              className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock must be positive" },
              })}
            />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
        </div>

        <div className="border-2 border-dashed border-blue-100 rounded-xl p-4 sm:p-6 hover:border-blue-200 transition-colors bg-white shadow-sm hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Product Image
          </h3>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-gradient-to-r file:from-blue-600 file:to-blue-700 file:text-white
                hover:file:from-blue-700 hover:file:to-blue-800
                transition-all duration-200
                cursor-pointer"
            />

            {imagePreview && (
              <div className="mt-4 space-y-3">
                <p className="text-sm font-medium text-gray-600">Preview</p>
                <div className="flex justify-center items-center p-2 bg-gray-50 rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="max-h-48 w-auto object-contain rounded-md shadow-sm transition-transform hover:scale-105"
                  />
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Click the button above to replace this preview
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <textarea
            placeholder="Description"
            className="border p-2 rounded-lg w-full h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full sm:w-auto px-6 py-3 rounded-lg text-white font-medium transition-colors ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading
            ? "Uploading..."
            : editingProductId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {/* Mobile View */}
          <div className="block sm:hidden">
            {productsData?.data?.data?.map((product: IProduct) => (
              <div key={product._id} className="p-4 border-b">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.brand} {product.model}</p>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                    <div className="mt-2 flex space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View */}
          <table className="hidden sm:table min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productsData?.data?.data?.map((product: IProduct) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 sm:h-12 sm:w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                      {product.name}
                    </div>
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-500">
                    {product.brand}
                  </td>
                  <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-500">
                    {product.model}
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 text-sm text-gray-500">
                    {product.yearOfManufacture}
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-sm text-gray-900">
                    ${product.price}
                  </td>
                  <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex space-x-2 text-sm">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
