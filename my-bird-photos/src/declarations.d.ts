declare module 'react-masonry-css' {
  import * as React from 'react';

  interface MasonryProps {
    breakpointCols: number | Record<string, number>;
    className?: string;
    columnClassName?: string;
    children: React.ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;

  export default Masonry;
}