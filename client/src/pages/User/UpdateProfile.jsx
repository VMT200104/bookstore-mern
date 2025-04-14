import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, User, Image } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, updateProfile } from "@/actions/userAction";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";
import { UPDATE_PROFILE_RESET } from "@/constans/userContans";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    if (avatar) myForm.append("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    // console.log("🔄 isUpdated:", isUpdated);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url || "/Profile.png");
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully!");
      dispatch(loadUser());
      navigate("/account");
      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, toast, isUpdated, navigate, user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-md p-6 shadow-md bg-white">
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview} alt="Avatar Preview" />
                <AvatarFallback>UP</AvatarFallback>
              </Avatar>
              <form className="w-full flex flex-col gap-4" onSubmit={updateProfileSubmit}>
                <div className="flex items-center gap-2">
                  <User className="text-gray-500" size={18} />
                  <Label htmlFor="name">Name</Label>
                </div>
                <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex items-center gap-2">
                  <Mail className="text-gray-500" size={18} />
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="flex items-center gap-2">
                  <Image className="text-gray-500" size={18} />
                  <Label htmlFor="avatar">Profile Picture</Label>
                </div>
                <Input id="avatar" name="avatar" type="file" accept="image/*" onChange={updateProfileDataChange} />
                <Button type="submit" className="mt-2">Save Changes</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
