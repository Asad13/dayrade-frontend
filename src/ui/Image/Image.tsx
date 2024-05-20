import { CSSProperties } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
  classNames?: string;
  style?: CSSProperties;
}

const Image = ({
  src,
  alt,
  width,
  height,
  loading,
  classNames,
  style,
}: ImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={classNames !== undefined ? classNames : ''}
      style={style}
      loading={loading ?? 'lazy'}
    />
  );
};

export default Image;
