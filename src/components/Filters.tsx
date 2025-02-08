import React, { useState, useEffect } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { getCategories, getProductsByCategory } from '@/sanity/lib/getData';
import { Product } from '@/types/Product';

interface FiltersProps {
  onProductsChange: (products: Product[]) => void;
}

const Filters: React.FC<FiltersProps> = ({ onProductsChange }) => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [productTypes, setProductTypes] = useState<{ _id: string; name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProductType, setSelectedProductType] = useState<string>('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isProductTypeDropdownOpen, setIsProductTypeDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data || []);
      setProductTypes(data || []); // Assuming product types are similar to categories
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (category: string) => {
    setSelectedCategory(category);
    setIsCategoryDropdownOpen(false);
    console.log('Category selected:', category); // Debugging
    // Fetch products based on the selected category
    const productsByCategory = await getProductsByCategory(category);
    onProductsChange(productsByCategory);
  };

  const handleProductTypeChange = async (productType: string) => {
    setSelectedProductType(productType);
    setIsProductTypeDropdownOpen(false);
    console.log('Product type selected:', productType); // Debugging
    // Fetch products based on the selected product type
    const productsByCategory = await getProductsByCategory(productType);
    onProductsChange(productsByCategory);
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  };

  const toggleProductTypeDropdown = () => {
    setIsProductTypeDropdownOpen(!isProductTypeDropdownOpen);
  };

  return (
    <div className="w-full h-auto px-4 py-2 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex justify-start items-start gap-3 flex-wrap cursor-pointer relative">
        <div 
          className="relative px-6 py-3 bg-white border flex justify-between items-center gap-2"
          onClick={toggleCategoryDropdown}
        >
          <div className="text-black text-base leading-normal">
            {selectedCategory || 'Category'}
          </div>
          <FaCaretDown className="text-[#2a254b]" />
        </div>
        {isCategoryDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border mt-1 z-10">
            {categories.map((category) => (
              <div 
                key={category._id} 
                onClick={() => handleCategoryChange(category.name)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
              >
                {category.name}
              </div>
            ))}
          </div>
        )}
        <div 
          className="relative px-6 py-3 bg-white border flex justify-between items-center gap-2"
          onClick={toggleProductTypeDropdown}
        >
          <div className="text-black text-base leading-normal">
            {selectedProductType || 'Product type'}
          </div>
          <FaCaretDown className="text-[#2a254b]" />
        </div>
        {isProductTypeDropdownOpen && (
          <div className="absolute top-full left-0 w-full bg-white border mt-1 z-10">
            {productTypes.map((type) => (
              <div 
                key={type._id} 
                onClick={() => handleProductTypeChange(type.name)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
              >
                {type.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-start items-center gap-4 mt-2 md:mt-0 cursor-pointer">
        <div className="text-black text-sm leading-[21px]">Sorting by:</div>
        <div className="px-6 py-3 bg-white border flex justify-between items-center gap-2">
          <div className="text-black text-base leading-normal">Date added</div>
          <FaCaretDown className="text-[#2a254b]" />
        </div>
      </div>
    </div>
  );
};

export default Filters; 

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { FaCaretDown } from 'react-icons/fa';
// import { getCategories, getProductsByCategory, getProductsByType } from '@/sanity/lib/getData';
// import { Product } from '@/types/Products';

// interface FiltersProps {
//   onProductsChange: (products: Product[]) => void;
// }

// const Filters: React.FC<FiltersProps> = ({ onProductsChange }) => {
//   const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
//   const [productTypes, setProductTypes] = useState<{ _id: string; name: string }[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedProductType, setSelectedProductType] = useState<string>('');
//   const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
//   const [isProductTypeDropdownOpen, setIsProductTypeDropdownOpen] = useState(false);

//   useEffect(() => {
//     // Categories aur product types ko ek hi baar fetch karna
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data || []);
//         setProductTypes(data || []); // Assuming product types are similar to categories
//       } catch (error) {
//         console.error("Categories fetch karte waqt error:", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     // Jab bhi category ya product type filter change ho, products ko fetch karna
//     const fetchFilteredProducts = async () => {
//       try {
//         let filteredProducts: Product[] = [];

//         if (selectedCategory && selectedProductType) {
//           // Agar dono filters selected hain, dono ke basis par products fetch karna
//           filteredProducts = await getProductsByCategoryAndType(selectedCategory, selectedProductType);
//         } else if (selectedCategory) {
//           // Agar sirf category selected ho to products category ke basis par fetch karna
//           filteredProducts = await getProductsByCategory(selectedCategory);
//         } else if (selectedProductType) {
//           // Agar sirf product type selected ho to products type ke basis par fetch karna
//           filteredProducts = await getProductsByType(selectedProductType);
//         }

//         onProductsChange(filteredProducts); // Parent ko filtered products bhejna
//       } catch (error) {
//         console.error("Products fetch karte waqt error:", error);
//         onProductsChange([]); // Agar koi error ho to empty array bhejna
//       }
//     };

//     fetchFilteredProducts();
//   }, [selectedCategory, selectedProductType, onProductsChange]);

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategory(category);
//     setIsCategoryDropdownOpen(false);
//   };

//   const handleProductTypeChange = (productType: string) => {
//     setSelectedProductType(productType);
//     setIsProductTypeDropdownOpen(false);
//   };

//   const toggleCategoryDropdown = () => {
//     setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
//   };

//   const toggleProductTypeDropdown = () => {
//     setIsProductTypeDropdownOpen(!isProductTypeDropdownOpen);
//   };

//   return (
//     <div className="w-full h-auto px-4 py-2 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
//       <div className="flex justify-start items-start gap-3 flex-wrap cursor-pointer relative">
//         <div 
//           className="relative px-6 py-3 bg-white border flex justify-between items-center gap-2"
//           onClick={toggleCategoryDropdown}
//         >
//           <div className="text-black text-base leading-normal">
//             {selectedCategory || 'Category'}
//           </div>
//           <FaCaretDown className="text-[#2a254b]" />
//         </div>
//         {isCategoryDropdownOpen && (
//           <div className="absolute top-full left-0 w-full bg-white border mt-1 z-10">
//             {categories.map((category) => (
//               <div 
//                 key={category._id} 
//                 onClick={() => handleCategoryChange(category.name)}
//                 className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
//               >
//                 {category.name}
//               </div>
//             ))}
//           </div>
//         )}

//         <div 
//           className="relative px-6 py-3 bg-white border flex justify-between items-center gap-2"
//           onClick={toggleProductTypeDropdown}
//         >
//           <div className="text-black text-base leading-normal">
//             {selectedProductType || 'Product type'}
//           </div>
//           <FaCaretDown className="text-[#2a254b]" />
//         </div>
//         {isProductTypeDropdownOpen && (
//           <div className="absolute top-full left-0 w-full bg-white border mt-1 z-10">
//             {productTypes.map((type) => (
//               <div 
//                 key={type._id} 
//                 onClick={() => handleProductTypeChange(type.name)}
//                 className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
//               >
//                 {type.name}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="flex justify-start items-center gap-4 mt-2 md:mt-0 cursor-pointer">
//         <div className="text-black text-sm leading-[21px]">Sorting by:</div>
//         <div className="px-6 py-3 bg-white border flex justify-between items-center gap-2">
//           <div className="text-black text-base leading-normal">Date added</div>
//           <FaCaretDown className="text-[#2a254b]" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Filters;
