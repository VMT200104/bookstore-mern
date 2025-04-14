import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { clearErrors, getProduct } from "../../actions/productAction";
import { Slider } from "@/components/ui/slider";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import MetaData from "../layout/MetaData";
import { Loader2, Filter } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { toast } from "sonner";

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

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(searchQuery, currentPage, price, category, ratings));
  }, [dispatch, searchQuery, currentPage, price, category, ratings, error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title="ALL PRODUCTS" />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-72">
          <Card className="p-6 h-fit sticky top-8 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
            <div className="flex items-center gap-3 mb-8 border-b pb-4">
              <Filter className="w-6 h-6 text-primary" />
              <h3 className="font-semibold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Filters</h3>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-200 uppercase tracking-wide">Price Range</h4>
              <Slider
                defaultValue={[0, 25000]}
                max={25000}
                value={price}
                onValueChange={priceHandler}
                className="mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">${price[0]}</span>
                <div className="h-[1px] flex-1 mx-3 bg-gray-200 dark:bg-gray-700"></div>
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">${price[1]}</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
              <h4 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-200 uppercase tracking-wide">Categories</h4>
              <Select value={category || "all"} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
                <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div>
              <h4 className="text-sm font-medium mb-2">Rating</h4>
              <Select value={ratings.toString()} onValueChange={(value) => setRatings(Number(value))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select minimum rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Ratings</SelectItem>
                  <SelectItem value="1">1 Star & Above</SelectItem>
                  <SelectItem value="2">2 Stars & Above</SelectItem>
                  <SelectItem value="3">3 Stars & Above</SelectItem>
                  <SelectItem value="4">4 Stars & Above</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-8 text-center">All Books</h1>
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <Loader2 className="w-12 h-12 animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {resultPerPage < filteredProductsCount && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPageNo(currentPage - 1)}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: Math.ceil(productsCount / resultPerPage) }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => setCurrentPageNo(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPageNo(currentPage + 1)}
                          disabled={currentPage === Math.ceil(productsCount / resultPerPage)}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
