import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";
import { toast } from "sonner";

const LoginForm = ({ className, ...props }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate(redirect);
      }
    }
  }, [dispatch, error, isAuthenticated, navigate, user, redirect]);

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {loading ? (
        <Loader />
      ) : (
        <div
          className={cn(
            "flex items-center justify-center h-auto max-h-screen p-6",
            className
          )}
          {...props}
        >
          <Card className="w-full max-w-[900px] overflow-hidden">
            <CardContent className="grid gap-6 md:grid-cols-2">
              {/* Form Section */}
              <form
                className="p-6 md:p-8 w-full max-w-[400px] mx-auto"
                onSubmit={loginSubmit}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Access your BookStore account now.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="/password/forgot"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                  </Button>
                  <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="ml-auto text-sm underline-offset-2 hover:underline"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>

              {/* Carousel Section (Hidden on Mobile) */}
              <div className="hidden md:block overflow-hidden">
                <Carousel
                  plugins={[plugin.current]}
                  className="w-full h-[500px]"
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {[
                      "https://www.issp.edu.vn/wp-content/uploads/sites/13/2024/07/sach-hay-cho-tre-8-tuoi-5.png",
                      "https://salt.tikicdn.com/cache/w1200/ts/product/0e/54/c5/a2e20aa18612972ed6d4884337ddd789.jpg",
                      "https://ischool.vn/wp-content/uploads/2022/12/nhung-cuon-sach-hay-cho-tre-12-tuoi-1.jpg",
                      "https://cdn0.fahasa.com/media/catalog/product/n/h/nhung_cau_noi_hay_ve_sach_va_van_hoa_doc_1_2019_02_22_15_34_37.jpg"
                    ].map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1 h-full">
                          <Card className="h-full overflow-hidden py-0">
                            <CardContent className="flex items-center justify-center p-0 h-full">
                              <div className="w-full h-full flex items-center justify-center">
                                <img 
                                  src={imageUrl} 
                                  alt={`Book ${index + 1}`}
                                  className="max-w-full max-h-full object-contain rounded-lg"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
