import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';

const StarryBackground = () => {
  return (
    <div className="stars-container absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

const products = [
  {
    id: 1,
    name: 'Шелковое платье',
    price: 12900,
image:'https://i.pinimg.com/564x/5c/65/40/5c65401e6e332caf1c2f1e84b91f2d47.jpg'
  },
  {
    id: 2,
    name: 'Костюм из льна',
    price: 15500,
image:'https://i.pinimg.com/564x/84/4b/b4/844bb4b3795970c3ad01d50ae4440528.jpg'
  },
  {
    id: 3,
    name: 'Летнее платье',
    price: 8900,
image:'https://i.pinimg.com/736x/7a/ca/f9/7acaf918c8bc71a78e51b5462b7587da.jpg'
  },
  {
    id: 4,
    name: 'Блуза из шифона',
    price: 6900,
image:'https://i.pinimg.com/474x/64/1c/96/641c96fbea22d8ce8e5251bcb5795901.jpg'
  }
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: typeof products[0]) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(currentCart =>
      currentCart.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0 
            ? null 
            : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item): item is CartItem => item !== null)
    );
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gradient-to-b from-blue-950 to-blue-900 z-50">
        <div className="relative h-24 flex justify-center items-center px-4">
          <StarryBackground />
          <button 
            onClick={() => setIsCartOpen(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center"
          >
            <ShoppingBag size={20} className="text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Logo */}
          <div className="header-title border-2 border-white/80 p-2">
            <div className="text-white text-2xl tracking-[0.2em] text-center">
              LAMARA
            </div>
            <div className="text-white text-xs tracking-[0.4em] text-center mt-1">
              OUTLET
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/5 backdrop-blur-sm px-4 py-3">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Поиск"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-transparent text-white text-sm">
          <ul className="flex justify-center space-x-8 py-3">
            <li className="border-b-2 border-white"><a href="#" className="hover:opacity-80 transition-opacity">ЖЕНСКОЕ</a></li>
            <li><a href="#" className="hover:opacity-80 transition-opacity">МУЖСКОЕ</a></li>
            <li><a href="#" className="hover:opacity-80 transition-opacity">ДЕТСКОЕ</a></li>
          </ul>
        </nav>
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform duration-300">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Корзина</h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
              
              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Корзина пуста
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-20 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-gray-600">{item.price.toLocaleString()} ₽</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span>{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-gray-200 rounded"
                            >
                              <Plus size={16} />
                            </button>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="ml-auto text-red-500 hover:text-red-600"
                            >
                              Удалить
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-medium">Итого:</span>
                      <span className="font-semibold">{totalPrice.toLocaleString()} ₽</span>
                    </div>
                    <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors">
                      Оформить заказ
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
      
<main>
  <div className="space-y-3">
    {/* Главный баннер с индивидуальным отступом через инлайн-стиль */}
    <div
      className="relative h-60 w-full bg-[url('https://i.pinimg.com/564x/1f/6b/b3/1f6bb3c1785616387c887e5f06e9dcd1.jpg')] bg-cover bg-center rounded-lg"
      style={{ marginTop: '201px' }} // Установи значение, которое тебе нужно
    >
      <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
      <div className="relative p-6 text-white text-center">
        <h1 className="text-2xl font-bold">Главная реклама</h1>
        <p className="text-sm mt-2">Описание основной рекламы или акций</p>
      </div>
    </div>

    {/* Dual Banners */}
    <div className="flex gap-4">
      {/* Первый баннер */}
      <div className="relative h-40 w-full bg-[url('https://i.pinimg.com/564x/bc/d1/f8/bcd1f8163059aa4f3b3388dafae83317.jpg')] bg-cover bg-center rounded-lg">
        <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
        <div className="relative p-4 text-white">
          <h2 className="text-xl font-bold">Заголовок</h2>
          <p className="text-sm">Описание или дополнительная информация.</p>
        </div>
      </div>

      {/* Второй баннер */}
      <div className="relative h-40 w-full bg-[url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=400&q=80')] bg-cover bg-center rounded-lg">
        <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end rounded-lg">
          <span className="text-white text-sm">Костюмы</span>
        </div>
      </div>
    </div>
  </div>
  
        {/* Recommendations */}
        <div className="mt-8 px-4">
          <h3 className="text-xl mb-4 font-light">Рекомендуем</h3>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col">
                <div className="relative group">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    В корзину
                  </button>
                </div>
                <h4 className="font-light mt-2">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.price.toLocaleString()} ₽</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer spacing */}
      <div className="h-20"></div>
    </div>
  );
}

export default App;