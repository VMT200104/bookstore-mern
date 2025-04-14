import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, ShoppingCart, User, LogOut, Search, Heart, Plus, Settings, Package, UserCircle } from 'lucide-react';
import { logout } from '@/actions/userAction';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { favoriteItems } = useSelector((state) => state.favorite);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed!');
    }
  };

  return (
    <nav className="bg-background border-b fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-extrabold text-primary tracking-tight">
                BookStore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center justify-center space-x-6">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                Books
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center justify-end space-x-4">
            <div className="flex items-center space-x-2">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="hidden md:flex items-center">
                <div className="relative">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books..."
                    className="w-64"
                  />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </form>

              {isAuthenticated ? (
                <>
                  <Button variant="ghost" size="icon" asChild className="relative">
                    <Link to="/favorites">
                      <Heart className="w-5 h-5" />
                      {favoriteItems.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                          {favoriteItems.length}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="relative">
                    <Link to="/cart">
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                          {cartItems.length}
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar.url} alt={user?.name} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="flex items-center">
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="flex items-center">
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" asChild className="font-semibold">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild className="font-semibold">
                    <Link to="/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <form onSubmit={handleSearch} className="flex items-center mb-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search books..."
                  className="w-full"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </form>
            <Link
              to="/"
              className="block text-center text-muted-foreground hover:text-primary px-4 py-3 rounded-md text-base font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block text-center text-muted-foreground hover:text-primary px-4 py-3 rounded-md text-base font-semibold transition-colors"
            >
              Books
            </Link>
            <Link
              to="/about"
              className="block text-center text-muted-foreground hover:text-primary px-4 py-3 rounded-md text-base font-semibold transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block text-center text-muted-foreground hover:text-primary px-4 py-3 rounded-md text-base font-semibold transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
