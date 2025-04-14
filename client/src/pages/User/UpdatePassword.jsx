import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constans/userContans";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    
    const passwordData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    dispatch(updatePassword(passwordData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Password updated successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, navigate, isUpdated]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-gray-800">Change Password</CardTitle>
          <CardDescription className="text-gray-500">Enter your current password and new password to update.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-6">
              <Loader />
            </div>
          ) : (
            <form className="space-y-6" onSubmit={updatePasswordSubmit}>
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" required value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdatePassword;
