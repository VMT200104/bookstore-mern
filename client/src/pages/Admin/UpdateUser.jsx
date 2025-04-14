import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { User, Mail, Shield } from "lucide-react";
import AdminLayout from "./AdminLayout";
import { getUserDetails, updateUser } from "@/actions/userAction";
import { toast } from "sonner";
import Loader from "@/components/ui/loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const { isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user?.name || "");
      setEmail(user?.email || "");
      setRole(user?.role || "");
    }

    if (error) {
      toast.error(error);
      dispatch({ type: "CLEAR_ERRORS" });
    }

    if (isUpdated) {
      toast.success("User updated successfully");
      navigate("/admin/users");
      dispatch({ type: "UPDATE_USER_RESET" });
    }
  }, [dispatch, id, user, error, isUpdated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      name,
      email,
      role,
    };

    dispatch(updateUser(id, userData));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <AdminLayout title="Update User">
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md">
          <Card className="w-full bg-white shadow-xl rounded-lg p-8">
            <CardHeader className="text-center mb-6">
              <h2 className="text-3xl font-semibold text-gray-800">
                Update User
              </h2>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <User size={20} className="mr-2 text-gray-600" />
                    <Label htmlFor="name" className="font-medium text-gray-700">
                      Full Name
                    </Label>
                  </div>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <Mail size={20} className="mr-2 text-gray-600" />
                    <Label
                      htmlFor="email"
                      className="font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <div className="flex items-center mb-2">
                    <Shield size={20} className="mr-2 text-gray-600" />
                    <Label htmlFor="role" className="font-medium text-gray-700">
                      User Role
                    </Label>
                  </div>
                  <Select onValueChange={setRole} value={role}>
                    <SelectTrigger className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full py-3 mt-4 text-white bg-black hover:bg-gray-800 rounded-lg text-lg font-semibold transition duration-200"
                >
                  Update
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
