import type { CSSProperties, ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  classNames?: string;
  styles?: CSSProperties;
  id: string;
  ariaSelected: boolean;
  ariaControls: string;
  tabIndex: number;
  onClick: () => void;
}

const Tab = ({
  children,
  classNames,
  styles,
  id,
  ariaSelected,
  ariaControls,
  tabIndex,
  onClick,
}: TabProps) => {
  return (
    <span
      role="tab"
      id={id}
      className={`tw-cursor-pointer ${classNames !== undefined && classNames}`}
      style={styles !== undefined ? styles : {}}
      aria-selected={ariaSelected}
      aria-controls={ariaControls}
      tabIndex={tabIndex}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default Tab;
