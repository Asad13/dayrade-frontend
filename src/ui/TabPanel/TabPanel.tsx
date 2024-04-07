import type { CSSProperties, ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  classNames?: string;
  styles?: CSSProperties;
  id: string;
  ariaLabelledby: string;
}

const Tab = ({
  children,
  classNames,
  styles,
  id,
  ariaLabelledby,
}: TabProps) => {
  return (
    <div
      role="tabpanel"
      id={id}
      className={`${classNames !== undefined && classNames}`}
      style={styles !== undefined ? styles : {}}
      tabIndex={0}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
};

export default Tab;
