import type { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  classNames?: string;
  styles?: CSSProperties;
  id?: string;
}

const Card = ({ children, classNames, styles, id }: CardProps) => {
  return (
    <div
      id={id}
      className={`tw-rounded-lg tw-bg-surface-dark tw-p-4 tw-shadow-card ${
        classNames !== undefined && classNames
      }`}
      style={styles !== undefined ? styles : {}}
    >
      {children}
    </div>
  );
};

export default Card;
