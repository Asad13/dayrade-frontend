import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SideNavBarItemProps {
  path: string;
  label: string;
  icon: ReactNode;
}

const SideNavBarItem = ({ path, label, icon }: SideNavBarItemProps) => {
  return (
    <li className={`tw-group tw-relative`}>
      <NavLink
        to={path}
        className={({ isActive, isPending }) => {
          let classNames = `tw-flex tw-w-[279px] tw-items-center tw-gap-x-1 tw-py-3`;

          classNames += isPending
            ? ' sidenavitem-pending'
            : isActive
              ? ' sidenavitem-active'
              : ' tw-text-sidenav hover:tw-text-secondary-dark';
          return classNames;
        }}
      >
        <span
          className={`tw-flex tw-min-w-[57px] tw-max-w-[57px] tw-items-center tw-justify-center`}
          aria-label={`Goes to ${label} page`}
        >
          {icon}
        </span>
        <span className={`tw-text-[16px] tw-leading-4`}>{label}</span>
      </NavLink>
    </li>
  );
};

export default SideNavBarItem;
