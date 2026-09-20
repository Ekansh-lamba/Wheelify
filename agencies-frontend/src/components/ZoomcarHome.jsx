import React, { useState, useEffect } from 'react';
import { Search, Calendar, MapPin, Car, Shield, Clock, Star, ChevronRight, Filter, Award, Phone, Info, 
         CreditCard, Heart, Menu, X, ChevronDown, Settings, Users, Fuel, Gauge } from 'lucide-react';
import './ZoomcarHome.css';

const PremiumCarRental = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'All', count: 150 },
    { id: 'suv', name: 'SUV', count: 45 },
    { id: 'sedan', name: 'Sedan', count: 38 },
    { id: 'luxury', name: 'Luxury', count: 25 },
    { id: 'electric', name: 'Electric', count: 18 },
  ];

  const featuredCars = [
    {
      name: 'Range Rover Sport',
      category: 'Luxury SUV',
      price: '8,999',
      rating: '4.9',
      reviews: 128,
      images: ['/api/placeholder/500/300', '/api/placeholder/500/300'],
      specs: {
        seats: '5',
        transmission: 'Automatic',
        fuel: 'Diesel',
        mileage: '12 km/l'
      },
      features: ['360° Camera', 'Panoramic Roof', 'GPS Navigation', 'Premium Audio'],
      availability: 'Immediate'
    },
    {
      name: 'BMW 5 Series',
      category: 'Luxury Sedan',
      price: '7,499',
      rating: '4.8',
      reviews: 96,
      images: ['/api/placeholder/500/300', '/api/placeholder/500/300'],
      specs: {
        seats: '5',
        transmission: 'Automatic',
        fuel: 'Petrol',
        mileage: '14 km/l'
      },
      features: ['Leather Seats', 'Cruise Control', 'Wireless Charging', 'Smart Display'],
      availability: 'Tomorrow'
    },
    {
      name: 'Tesla Model 3',
      category: 'Electric',
      price: '6,999',
      rating: '4.9',
      reviews: 84,
      images: ['/api/placeholder/500/300', '/api/placeholder/500/300'],
      specs: {
        seats: '5',
        transmission: 'Automatic',
        fuel: 'Electric',
        range: '400 km'
      },
      features: ['Autopilot', 'Premium Sound', 'Glass Roof', 'Supercharging'],
      availability: 'Immediate'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className={`text-2xl font-bold ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
                LuxeDrive
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500`}>
                Home
              </a>
              <a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500`}>
                Cars
              </a>
              <a href="#" className={`${isScrolled ? 'text-gray-700' : 'text-white'} hover:text-blue-500`}>
                Deals
              </a>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all">
                Sign In
              </button>
            </div>

            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white">
          <div className="container mx-auto px-4 py-20">
            <div className="space-y-6">
              <a href="#" className="block text-2xl font-medium text-gray-800">Home</a>
              <a href="#" className="block text-2xl font-medium text-gray-800">Cars</a>
              <a href="#" className="block text-2xl font-medium text-gray-800">Deals</a>
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full text-xl">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.5),transparent_70%)]"></div>
        </div>
        <div className="relative container mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Experience Luxury 
              <span className="block text-blue-400">On Your Terms</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Premium car rentals with personalized service. Choose from our curated collection of luxury vehicles.
            </p>

            {/* Enhanced Search Box */}
            <div className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 transform ${
              isSearchExpanded ? 'scale-105' : ''
            }`}>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Pick-up location"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onFocus={() => setIsSearchExpanded(true)}
                        onBlur={() => setIsSearchExpanded(false)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Pick-up Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="datetime-local"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Return Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="datetime-local"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02]">
                    Search Available Cars
                  </button>
                </div>
              </div>

              {isSearchExpanded && (
                <div className="px-6 pb-6 pt-2 border-t">
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="luxury" className="rounded text-blue-600" />
                      <label htmlFor="luxury" className="text-sm text-gray-600">Luxury Cars Only</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="instant" className="rounded text-blue-600" />
                      <label htmlFor="instant" className="text-sm text-gray-600">Instant Booking</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="deals" className="rounded text-blue-600" />
                      <label htmlFor="deals" className="text-sm text-gray-600">Special Deals</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
              <p className="text-gray-600">Find your perfect ride from our diverse collection</p>
            </div>
            <div className="flex space-x-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`px-6 py-2 rounded-full transition-all ${
                    selectedCategory === category.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                  <span className="ml-2 text-sm opacity-70">({category.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all">
                <div className="relative">
                  <img 
                    src={car.images[0]} 
                    alt={car.name}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{car.rating}</span>
                    </span>
                    <button className="bg-white/90 backdrop-blur p-2 rounded-full hover:text-red-500 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  {car.availability === 'Immediate' && (
                    <span className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      Available Now
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{car.name}</h3>
                      <p className="text-gray-600">{car.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">per day</p>
                      <p className="text-2xl font-bold text-blue-600">₹{car.price}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{car.specs.seats} Seats</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Settings className="w-4 h-4 mr-2" />
                      <span className="text-sm">{car.specs.transmission}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Fuel className="w-4 h-4 mr-2" />
                      <span className="text-sm">{car.specs.fuel}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Gauge className="w-4 h-4 mr-2" />
                      <span className="text-sm">{car.specs.mileage || car.specs.range}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {car.features.map((feature, fIndex) => (
                      <span key={fIndex} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">
                      Book Now
                    </button>
                    <button className="px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Premium Experience</h2>
            <p className="text-xl text-gray-600">Enjoy exclusive benefits and superior service with every rental</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <Shield className="w-12 h-12" />,
                title: 'Premium Insurance',
                description: 'Comprehensive coverage with zero deductible for peace of mind'
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: 'Flexible Rentals',
                description: 'Hourly, daily, or monthly rentals with doorstep delivery'
              },
              {
                icon: <CreditCard className="w-12 h-12" />,
                title: 'Transparent Pricing',
                description: 'No hidden fees, fuel charges clearly displayed upfront'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-12 md:p-16">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Download Our Mobile App
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Book faster, get exclusive deals, and manage your rentals on the go
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center hover:bg-gray-900 transition-all">
                    <span>
                      <div className="text-xs">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </span>
                    <ChevronRight className="ml-2" />
                  </button>
                  <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center hover:bg-gray-900 transition-all">
                    <span>
                      <div className="text-xs">Get it on</div>
                      <div className="text-xl font-semibold">Google Play</div>
                    </span>
                    <ChevronRight className="ml-2" />
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <img
                        key={i}
                        src={`/api/placeholder/40/40`}
                        alt="User"
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div className="text-white">
                    <div className="font-bold">4.9 / 5</div>
                    <div className="text-blue-200">from 10k+ reviews</div>
                  </div>
                </div>
              </div>
              <div className="relative h-full min-h-[500px]">
                <img 
                  src="/api/placeholder/600/1200"
                  alt="Mobile App"
                  className="absolute bottom-0 right-0 w-auto h-[120%] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">LuxeDrive</h3>
              <p className="text-gray-400 mb-6">
                Premium car rentals for those who appreciate luxury and performance.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <Info className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            {[
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Press', 'Blog']
              },
              {
                title: 'Support',
                links: ['Contact Us', 'Help Center', 'Safety', 'Terms']
              },
              {
                title: 'Cities',
                links: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad']
              }
            ].map((section, index) => (
              <div key={index}>
                <h4 className="text-lg font-semibold mb-6">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 LuxeDrive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PremiumCarRental;