import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constans/orderConstants";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Truck,
  Package,
  MapPin,
  Phone,
  User,
  CreditCard,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

// Components
import AdminLayout from "./AdminLayout";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("status", status);
    dispatch(updateOrder(id, formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <AdminLayout title="Process Order">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Process Order">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Customer Name</p>
                    <p className="font-medium">{order.user && order.user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium">{order.shippingInfo && order.shippingInfo.phoneNo}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <Badge
                    variant={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "success" : "destructive"}
                    className="mt-1"
                  >
                    {order.paymentInfo && order.paymentInfo.status === "succeeded" ? (
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> PAID
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3" /> NOT PAID
                      </span>
                    )}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-xl font-bold text-green-600">
                    {formatPrice(order.totalPrice)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" /> Order Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product}`}
                          className="font-medium hover:text-blue-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.quantity} x {formatPrice(item.price)} = {" "}
                          <span className="font-semibold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status Update */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
              <CardDescription>Update the current order status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Current Status</p>
                  <Badge
                    variant={
                      order.orderStatus === "Delivered" ? "success" :
                      order.orderStatus === "Cancelled" ? "destructive" :
                      order.orderStatus === "Processing" ? "secondary" :
                      "warning"
                    }
                    className="w-full justify-center py-2 text-base"
                  >
                    {order.orderStatus}
                  </Badge>
                </div>

                {order.orderStatus !== "Delivered" && (
                  <form onSubmit={updateOrderSubmitHandler} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Update Status</label>
                      <Select onValueChange={setStatus} value={status}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select new status" />
                        </SelectTrigger>
                        <SelectContent>
                          {order.orderStatus === "Processing" && (
                            <>
                              <SelectItem value="Confirmed">Confirmed</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </>
                          )}
                          {order.orderStatus === "Confirmed" && (
                            <>
                              <SelectItem value="Shipped">Shipped</SelectItem>
                              <SelectItem value="Cancelled">Cancelled</SelectItem>
                            </>
                          )}
                          {order.orderStatus === "Shipped" && (
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loading || status === ""}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Status"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;