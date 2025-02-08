// import React from 'react';
// import Image from 'next/image';

// const ImageOnly: React.FC = () => {
//   return (
//     <div className="relative w-full bg-white">
//       <Image 
//         src="/image-only.png"
//         alt="Background"
//         width={1440}
//         height={400}
//         objectFit="cover"
//         quality={100}
//       />
//     </div>
//   );
// };

// export default ImageOnly;

import React from 'react';
import Image from 'next/image';

const ImageOnly: React.FC = () => {
  return (
    <div className="relative w-full bg-white">
      <Image 
        src="/image-only.png"  // Corrected file path
        alt="Background"
        width={1440}
        height={400}
        style={{ objectFit: 'cover' }}  // Using objectFit correctly
        quality={100}
      />
    </div>
  );
};

export default ImageOnly;