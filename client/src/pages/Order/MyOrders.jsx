import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import MetaData from "../layout/MetaData";

// Shadcn imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, toast, error]);

  return (
    <>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px] w-full">
          <Loader />
        </div>
      ) : (
        <div className="container mx-auto py-8 px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {user.name}'s Orders
              </CardTitle>
              <CardDescription>
                View and manage your order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Order ID</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders &&
                      orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell className="font-medium">
                            {order._id}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.orderStatus === "Delivered"
                                  ? "success"
                                  : "destructive"
                              }
                            >
                              {order.orderStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>{order.orderItems.length+1}</TableCell>
                          <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <Link to={`/order/${order._id}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MyOrders;
