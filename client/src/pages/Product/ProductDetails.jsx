import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";

import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";

import { toast } from "sonner";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import Loader from "@/components/ui/loader";
import { NEW_REVIEW_RESET } from "@/constans/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const { isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to add items to the cart");
      return;
    }
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative w-[400px] h-[400px] overflow-hidden rounded-lg">
                  {product.images && product.images[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="object-contain w-full h-full"
                    />
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                  <p className="text-gray-500">Product # {product._id}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {renderStars(product.ratings)}
                  </div>
                  <span className="text-gray-500">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">${product.price}</h2>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        onClick={decreaseQuantity}
                        className="px-3"
                      >
                        -
                      </Button>
                      <span className="px-4">{quantity}</span>
                      <Button
                        variant="ghost"
                        onClick={increaseQuantity}
                        className="px-3"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      onClick={addToCartHandler}
                      disabled={product.Stock < 1}
                      className="bg-primary text-primary-foreground"
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <p className="flex items-center space-x-2">
                    <span>Status:</span>
                    <span
                      className={`font-bold ${
                        product.Stock < 1 ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <Button
                  onClick={submitReviewToggle}
                  variant="outline"
                  className="w-full"
                >
                  Submit Review
                </Button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">REVIEWS</h3>
              {product.reviews && product.reviews[0] ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No Reviews Yet</p>
              )}
            </div>
          </div>

          {/* Review Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Review</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="icon"
                      onClick={() => setRating(index + 1)}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          index < rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </Button>
                  ))}
                </div>
                <Textarea
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={reviewSubmitHandler}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
