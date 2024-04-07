import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SideNavBarItemProps {
  open: boolean;
  path: string;
  label: string;
  icon: ReactNode;
}

const SideNavBarItem = ({ open, path, label, icon }: SideNavBarItemProps) => {
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
        <span
          className={`${
            open ? 'tw-scale-100' : 'tw-scale-0'
          } tw-text-[16px] tw-leading-4 tw-transition-all tw-duration-300`}
        >
          {label}
        </span>
      </NavLink>
      {!open && (
        <span className="tw-absolute tw-left-16 tw-top-[4px] tw-w-auto tw-min-w-max tw-origin-left tw-scale-0 tw-rounded-md tw-bg-surface-dark tw-p-2 tw-text-xs tw-font-bold tw-text-white tw-shadow-md tw-transition-all tw-duration-100 group-hover:tw-scale-100">
          {label}
        </span>
      )}
    </li>
  );
};

export default SideNavBarItem;
