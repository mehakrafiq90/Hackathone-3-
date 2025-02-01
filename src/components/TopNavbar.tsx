'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/Product';
import { useAuth, useUser } from '@clerk/clerk-react';
import { FiLogOut, FiPackage, FiUser } from 'react-icons/fi';
import { getCategories, getAllProducts } from '@/sanity/lib/getData';

const TopNav: React.FC = () => {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const profileRef = useRef<HTMLDivElement>(null);

  const fetchCategoriesAndProducts = async () => {
    const categoryData = await getCategories();
    setCategories(categoryData || []);

    const productData = await getAllProducts();
    setProducts(productData || []);
  };

  useEffect(() => {
    fetchCategoriesAndProducts();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);

  const renderProductLinks = filteredProducts.map((product) => (
    <Link href={`/products/${product.slug.current}`} key={product._id}>
      <div className="p-2 hover:bg-gray-200 text-black">{product.name}</div>
    </Link>
  ));

  const renderCategoryLinks = categories.map((category) => (
    <Link
      href={`/products?category=${category.name}`}
      key={category._id}
      className="text-[#716d8d] text-base"
    >
      {category.name}
    </Link>
  ));

  const handleSignOut = () => {
    signOut().catch((error) => console.error('Sign out error:', error));
  };

  const renderUserProfile = isSignedIn ? (
    <div className="relative" ref={profileRef}>
      <Link href="/profile" className="flex items-center cursor-pointer">
        <Image
          src={user?.imageUrl || '/icons/default-profile.png'}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="ml-2">{user?.firstName}</p>
      </Link>
    </div>
  ) : (
    <Link href="/sign-in">
      <Image
        src="/icons/User--avatar.png"
        alt="User Icon"
        width={24}
        height={24}
        className="rounded-full"
      />
    </Link>
  );

  return (
    <div className="TopNav relative bg-white mb-0">
      {/* Desktop View */}
      <div className="hidden md:block w-full max-w-[1440px] mx-auto h-[132px] relative bg-white px-4 lg:px-8 xl:px-12">
      <div className="absolute left-[28px] top-[20px] flex items-center">
          <div className="cursor-pointer">
            <Image
              src="/icons/search.png"
              alt="Search Icon"
              width={24}
              height={24}
              onClick={toggleSearch}
            />
          </div>
          {isSearchOpen && (
            <div className="relative ml-2">
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search products..."
                className="p-2 border rounded text-black"
              />
              {query && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg z-10">
                  {renderProductLinks}
                </div>
              )}
            </div>
          )}
        </div>
        <Link
          href="/"
          className="absolute left-[50%] transform -translate-x-1/2 top-[20px] text-[#211f2d] text-2xl"
        >
          Avion
        </Link>
        <div className="absolute right-[170px] top-[22px] cursor-pointer flex items-center">
          <Link href="/cart" className="relative flex items-center">
            <Image
              src="/icons/Shopping--cart.png"
              alt="Cart Icon"
              width={24}
              height={24}
            />
            {cartItemCount > 0 && (
              <span className="absolute bottom-2 right-6 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          {isSignedIn && (
            <Link href="/profile" className="ml-4 cursor-pointer flex items-center">
              <FiUser size={24} />
            </Link>
          )}
        </div>
        <div className="absolute right-[20px] top-[20px] flex items-center">
          {renderUserProfile}
          {isSignedIn && (
            <Link href="/tracking" className="ml-4 cursor-pointer flex items-center">
              <FiPackage size={24} />
            </Link>
          )}
          {isSignedIn && (
            <FiLogOut
              className="ml-4 cursor-pointer"
              size={24}
              onClick={handleSignOut}
              title="Sign Out"
            />
          )}
        </div>
        <div className="absolute left-[50%] transform -translate-x-1/2 top-[90px] w-full flex justify-center gap-11 cursor-pointer whitespace-nowrap overflow-hidden">
          {renderCategoryLinks}
        </div>
        <div className="absolute w-[calc(100%-56px)] left-[28px] top-[70px] border border-black/10"></div>
      
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex w-full h-[69px] pl-6 pr-5 pt-5 pb-[19px] justify-between items-center mb-0">
        <Link href="/" className="Avion text-[#211f2d] text-2xl">
          Avion
        </Link>
        <div className="flex items-center gap-5 ml-auto">
          <Image
            src="/icons/Search.png"
            alt="Search Icon"
            width={24}
            height={24}
            onClick={toggleSearch}
          />
          <Link href="/cart" className="relative flex items-center">
            <Image
              src="/icons/Shopping--cart.png"
              alt="Cart Icon"
              width={24}
              height={24}
            />
            {cartItemCount > 0 && (
              <span className="absolute top-3 left-4 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
          {isSignedIn && (
            <Link href="/tracking" className="flex items-center">
              <FiPackage size={24} />
            </Link> 
          )}
          {isSignedIn ? (
            <div className="relative" ref={profileRef}>
              <Link href="/profile" className="flex items-center cursor-pointer">
                <Image
                  src={user?.imageUrl || '/icons/default-profile.png'}
                   alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <Link href="/sign-in">
              <Image
                src="/icons/User--avatar.png"
                alt="User Icon"
                width={24}
                height={24}
                className="rounded-full"
              />
            </Link>
          )}
          <button onClick={toggleMenu}>
            <Image
              src="/icons/menu.svg" 
              alt="Menu Icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden w-full absolute top-14 left-0 p-4 bg-white z-10 shadow-lg">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search products..."
            className="p-2 w-full border rounded text-black"
          />
          {query && (
            <div className="mt-2 bg-white shadow-lg z-10">
              {renderProductLinks}
            </div>
          )}
        </div>
      )}
      {isOpen && (
        <div className="md:hidden bg-white w-full absolute top-14 left-0 flex flex-col items-start p-4 shadow-lg z-10">
          {categories.map((category) => (
            <Link
              href={`/products?category=${category.name}`}
              key={category._id}
              className="text-[#716d8d] text-base mb-2 hover:bg-gray-200 p-2 rounded-md transition duration-300"
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopNav;