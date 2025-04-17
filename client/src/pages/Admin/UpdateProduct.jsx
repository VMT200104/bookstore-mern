import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import AdminLayout from "./AdminLayout";
import { UPDATE_PRODUCT_RESET } from "../../constans/productConstants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Children's Books",
    "Textbooks",
    "Science Technology",
    "Literature",
    "History",
    "Business",
    "Self-Help",
    "Comics Manga",
    "Foreign Language",
    "Poetry"
  ];

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      toast.error(error, {
        duration: 3000,
        position: "top-right",
      });
      dispatch(clearErrors());
    }

    if (updateError) {
      toast.error(updateError, {
        duration: 3000,
        position: "top-right",
      });
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Product Updated Successfully", {
        duration: 3000,
        position: "top-right",
      });
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, productId, product, updateError]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };

  const updateProductImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <AdminLayout title="Update Product">
      <Card className="max-w-lg mx-auto">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold">Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProductSubmitHandler} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm">
                  Product Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="price" className="text-sm">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="category" className="text-sm">
                  Category
                </Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cate) => (
                      <SelectItem key={cate} value={cate}>
                        {cate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="stock" className="text-sm">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-sm">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[60px]"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="images" className="text-sm">
                Product Images
              </Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="cursor-pointer h-9"
                disabled={isProcessingImages}
              />
              {isProcessingImages && (
                <div className="text-sm text-muted-foreground">
                  Processing images...
                </div>
              )}
            </div>

            <div className="max-h-40 overflow-y-auto pr-1 -mt-1">
              <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square w-20 group"
                    >
                      <div className="absolute inset-0 rounded-xl border border-gray-200 shadow-sm transition-all group-hover:border-gray-300 group-hover:shadow-md overflow-hidden">
                        <img
                          src={image.url}
                          alt="Old Product Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                {imagesPreview.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square w-20 group"
                  >
                    <div className="absolute inset-0 rounded-xl border border-gray-200 shadow-sm transition-all group-hover:border-gray-300 group-hover:shadow-md overflow-hidden">
                      <img
                        src={image}
                        alt="Product Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default UpdateProduct;
