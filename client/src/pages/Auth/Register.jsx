import { useState, useEffect } from "react";
import { Mail, Lock, User, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "@/actions/userAction";
import { toast } from "react-toastify";
import Loader from "@/components/ui/loader";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/verify");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setAvatar(file);
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Loader />
      ) : (
        <Card className="w-full max-w-md shadow-2xl rounded-2xl bg-white">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Create Account</h2>
            <form className="space-y-5" onSubmit={registerSubmit}>
              <div className="relative">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input id="name" name="name" className="pl-10" required value={name} onChange={handleChange} />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="email">Email</Label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input id="email" name="email" type="email" className="pl-10" required value={email} onChange={handleChange} />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input id="password" name="password" type="password" className="pl-10" required value={password} onChange={handleChange} />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="avatar">Avatar</Label>
                <div className="relative flex flex-col items-left gap-2 mt-1">
                  <div className="relative flex items-center w-full">
                    <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <label htmlFor="avatar" className="pl-10 py-2 w-full bg-white border border-gray-300 rounded-lg shadow-sm text-gray-600 text-center cursor-pointer">
                      Choose an image
                    </label>
                    <Input id="avatar" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </div>
                  {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-lg object-cover border" />}
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary text-white" disabled={loading}>
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center text-sm">
              Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RegisterPage;
