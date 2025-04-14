import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";
import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Loader from "@/components/ui/loader";

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
      // toast.error(error);
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
                      "https://img1.od-cdn.com/ImageType-400/0211-1/%7B4FD7EF4F-B5AA-4C6A-85E7-C431E5A46496%7DIMG400.JPG",
                      "data:image/jpeg;base64,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",
                      "https://salt.tikicdn.com/cache/w1200/ts/product/0e/54/c5/a2e20aa18612972ed6d4884337ddd789.jpg",
                      "https://salt.tikicdn.com/cache/280x280/ts/product/90/49/97/ec88ab408c1997378344486c94dbac40.jpg",
                    ].map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1 h-full">
                          <Card className="h-full">
                            <CardContent className="flex items-center justify-center p-0 h-full">
                              <img 
                                src={imageUrl} 
                                alt={`Book ${index + 1}`}
                                className="w-full h-full object-contain rounded-lg"
                              />
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
