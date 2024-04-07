import { ReactNode, CSSProperties } from 'react';

interface PageContainerProps {
  children: ReactNode;
  classNames?: string;
  style?: CSSProperties;
}

const PageContainer = ({ children, classNames, style }: PageContainerProps) => {
  return (
    <div
      className={`page-container ${classNames !== undefined && classNames}`}
      style={style !== undefined ? style : {}}
    >
      {children}
    </div>
  );
};

export default PageContainer;
