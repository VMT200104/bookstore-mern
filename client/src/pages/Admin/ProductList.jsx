import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import AdminLayout from "./AdminLayout";
import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constans/productConstants";

const ITEMS_PER_PAGE = 5;

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [productImageIndices, setProductImageIndices] = useState({});

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      navigate("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  // Pagination logic
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = products?.slice(startIndex, endIndex) || [];
  const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);

  // Reset to first page if current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleImageHover = (productId) => {
    setHoveredProduct(productId);
    if (!productImageIndices[productId]) {
      setProductImageIndices(prev => ({
        ...prev,
        [productId]: 0
      }));
    }
  };

  const handleImageLeave = () => {
    setHoveredProduct(null);
  };

  const handlePrevImage = (e, productId) => {
    e.stopPropagation();
    const product = products.find(p => p._id === productId);
    setProductImageIndices(prev => ({
      ...prev,
      [productId]: prev[productId] === 0 ? product.images.length - 1 : prev[productId] - 1
    }));
  };

  const handleNextImage = (e, productId) => {
    e.stopPropagation();
    const product = products.find(p => p._id === productId);
    setProductImageIndices(prev => ({
      ...prev,
      [productId]: prev[productId] === product.images.length - 1 ? 0 : prev[productId] + 1
    }));
  };

  return (
    <AdminLayout title="ALL PRODUCTS - Admin">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">ALL PRODUCTS</h1>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product ID</TableHead>
                <TableHead className="w-[120px]">Images</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="w-[100px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProducts?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium truncate" style={{maxWidth: '100px'}} title={product._id}>
                    {product._id}
                  </TableCell>
                  <TableCell>
                    <div 
                      className="relative w-10 h-10"
                      onMouseEnter={() => handleImageHover(product._id)}
                      onMouseLeave={handleImageLeave}
                    >
                      <img
                        src={product.images && product.images[productImageIndices[product._id] || 0] ? product.images[productImageIndices[product._id] || 0].url : "https://via.placeholder.com/40"}
                        alt={product.name}
                        className="h-10 w-10 object-cover rounded-md"
                      />
                      {hoveredProduct === product._id && product.images && product.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => handlePrevImage(e, product._id)}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-l"
                          >
                            <ChevronLeft className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => handleNextImage(e, product._id)}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-r"
                          >
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">{product.Stock}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link to={`/admin/products/${product._id}`} className="flex items-center cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" /> Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteProductHandler(product._id)}
                          className="text-red-600 flex items-center cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {(!products || products.length === 0) && (
          <div className="text-center text-muted-foreground mt-10">
            No products found.
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default ProductList;
