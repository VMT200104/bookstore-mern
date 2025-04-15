import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { DELETE_REVIEW_RESET } from "../../constans/productConstants";
import { toast } from "sonner";

// Shadcn imports
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Search,
  Trash2,
  MoreVertical,
  Loader2,
} from "lucide-react";

// Components
import AdminLayout from "./AdminLayout";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchType, setSearchType] = useState("id"); // "id" or "name"
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const { error: deleteError, isDeleted } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector((state) => state.productReviews);

  const deleteReviewHandler = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviews(reviewId, searchValue));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setHasSearched(true);
      if (searchType === "id") {
        dispatch(getAllReviews(searchValue));
      } else {
        dispatch(getAllReviews(null, searchValue));
      }
    } else {
      toast.error("Please enter a search value");
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
      toast.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  return (
    <AdminLayout title="Product Reviews">
      <div className="space-y-6">
        {/* Search Product */}
        <Card>
          <CardHeader>
            <CardTitle>Search Product Reviews</CardTitle>
            <CardDescription>
              Search reviews by product ID or name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={productReviewsSubmitHandler} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={searchType === "id" ? "default" : "outline"}
                    onClick={() => setSearchType("id")}
                  >
                    By ID
                  </Button>
                  <Button
                    type="button"
                    variant={searchType === "name" ? "default" : "outline"}
                    onClick={() => setSearchType("name")}
                  >
                    By Name
                  </Button>
                </div>
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder={searchType === "id" ? "Enter Product ID" : "Enter Product Name"}
                    className="pl-8"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (hasSearched) setHasSearched(false);
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !searchValue.trim()}
                  className="min-w-[100px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>
              {searchType === "id" && searchValue && searchValue.length !== 24 && (
                <p className="text-sm text-red-500">
                  Product ID must be exactly 24 characters long
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Reviews List */}
        {loading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </CardContent>
          </Card>
        ) : reviews && reviews.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" /> Product Reviews
              </CardTitle>
              <CardDescription>
                Showing {reviews.length} reviews for the selected product
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Review ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell className="font-medium">{review._id}</TableCell>
                      <TableCell>{review.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={review.rating >= 3 ? "success" : "destructive"}
                          className="flex w-fit items-center gap-1"
                        >
                          <Star className="h-3 w-3 fill-current" />
                          {review.rating}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="truncate">{review.comment}</p>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => deleteReviewHandler(review._id)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Review
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : hasSearched && !loading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Star className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900">No Reviews Found</h3>
              <p className="text-gray-500">This product has no reviews yet.</p>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default ProductReviews;