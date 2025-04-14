import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { Trash2, Plus, Minus } from 'lucide-react';
import { removeItemsFromCart, updateCartItemQuantity } from '../../actions/cartAction';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeItemsFromCart(id));
    } else {
      dispatch(updateCartItemQuantity(id, quantity));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateShippingPrice = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal > 1000 ? 0 : 200; // Free shipping for orders over 1000, otherwise 200
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = calculateShippingPrice();
    const tax = subtotal * 0.18; // Adding tax calculation to match ConfirmOrder
    return (subtotal + shipping + tax).toFixed(2);
  };

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any books to your cart yet.</p>
          <Button onClick={() => navigate('/products')}>Continue Shopping</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            {cartItems.map((item) => (
              <div key={item.product}>
                <div className="flex items-center gap-4 py-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500">${item.price}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center border rounded">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input 
                          type="number" 
                          value={item.quantity}
                          className="w-15 text-center border-0"
                          readOnly
                        />
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveItem(item.product)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <p className="flex items-center space-x-2 mt-2">
                      <span>Status:</span>
                      <span
                        className={`font-bold ${
                          item.stock < 1 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {item.stock < 1 ? "Out of Stock" : "In Stock"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
                <Separator className="my-4" />
              </div>
            ))}
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${calculateShippingPrice()}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>${(parseFloat(calculateSubtotal()) * 0.18).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
              <Button 
                className="w-full mt-4"
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
              <div className="text-center text-sm text-gray-500 mt-4">
                <p>Free shipping on orders over 1000</p>
                <p>30-day money-back guarantee</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
