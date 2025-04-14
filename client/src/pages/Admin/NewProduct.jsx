import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, clearErrors } from "../../actions/productAction";
import AdminLayout from "./AdminLayout";
import { NEW_PRODUCT_RESET } from "../../constans/productConstants";
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

const NewProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isProcessingImages, setIsProcessingImages] = useState(false);

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Children's Books",
    "Textbooks",
    "Science & Technology",
    "Literature",
    "History",
    "Business",
    "Self-Help",
    "Comics & Manga",
    "Foreign Language",
    "Poetry"
  ];

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 3000,
        position: "top-right",
      });
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product Created Successfully", {
        duration: 3000,
        position: "top-right",
      });
      navigate("/admin/products");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    if (price < 0) {
      toast.error("Price cannot be negative", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    if (Stock < 0) {
      toast.error("Stock cannot be negative", {
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = async (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

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
    <AdminLayout title="Create Product">
      <div className="flex justify-center items-center">
        <Card className="max-w-sm w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create Product</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <form onSubmit={createProductSubmitHandler} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
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

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="Price"
                    required
                    min="0"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    className="h-9"
                  />
                </div>

                <div className="space-y-2">
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

                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-sm">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="Stock"
                    required
                    min="0"
                    onChange={(e) => setStock(e.target.value)}
                    value={Stock}
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images" className="text-sm">
                  Product Images
                </Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                  className="cursor-pointer h-9"
                  disabled={isProcessingImages}
                />
                {isProcessingImages && (
                  <div className="text-sm text-muted-foreground text-center">
                    Processing images...
                  </div>
                )}
              </div>

              <div className="max-h-40 overflow-y-auto pr-1 -mt-1">
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {imagesPreview.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square w-20 group mx-auto"
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

              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Product"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
