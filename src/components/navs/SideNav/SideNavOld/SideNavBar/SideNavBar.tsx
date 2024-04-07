import React from 'react';
import { NavLink } from 'react-router-dom';
import SideNavBarItem from '../SideNavBarItem';
import {
  RightArrow,
  Home,
  LineChartUp,
  Daimond,
  Users,
  Reflect,
  Calendar,
  Settings,
  User,
  Door,
} from '@assets/icons/sidenav';

const sideNavItemsTop = [
  {
    path: '/',
    label: 'Dashboard',
    icon: <Home />,
  },
  {
    path: '/trades',
    label: 'Trades',
    icon: <LineChartUp />,
  },
  {
    path: '/leaderboard',
    label: 'Leaderboard',
    icon: <Daimond />,
  },
  {
    path: '/contestants',
    label: 'Contestants',
    icon: <Users />,
  },
  {
    path: '/comparison',
    label: 'Comparison',
    icon: <Reflect />,
  },
  {
    path: '/market-calendar',
    label: 'Market Calendar',
    icon: <Calendar />,
  },
];

const sideNavItemsBottom = [
  {
    path: '/settings',
    label: 'Settings',
    icon: <Settings />,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: <User />,
  },
];

interface SideNavBarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({ open, setOpen }: SideNavBarProps) => {
  return (
    <aside
      className={`tw-fixed tw-left-0 tw-top-0 tw-z-10 tw-hidden tw-h-screen tw-bg-background-dark tw-text-sidenav tw-transition-all tw-duration-300 lg:tw-block ${
        open ? 'tw-w-[287px]' : 'tw-w-[67px]'
      } tw-p-1`}
      aria-label="Side Navigation"
    >
      <div
        className={`
         tw-relative tw-h-full tw-w-full tw-rounded-lg tw-bg-surface-dark tw-pt-6 tw-drop-shadow`}
      >
        <div
          className={`tw-border-border-dark tw-bg-on-primary-dark tw-absolute tw-right-[-24px] tw-flex tw-h-8 tw-w-8 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-border tw-bg-surface-secondary-dark `}
          onClick={() => setOpen((prevState) => !prevState)}
          aria-label="Open menu"
        >
          <span
            className={`${
              open && 'tw-rotate-180'
            } tw-text-xl tw-text-[#9D9E9E] tw-transition-all tw-duration-300`}
          >
            <RightArrow />
          </span>
        </div>
        <div className="tw-pb-4">
          <NavLink
            to="/"
            className={`tw-flex tw-w-[279px] tw-items-center tw-gap-x-1`}
            aria-label="Dayrade home page"
          >
            <span
              className={`tw-flex tw-min-w-[59px] tw-max-w-[59px] tw-items-center tw-justify-center`}
            >
              <img
                src="/logo-nav.png"
                alt="Dayrade Logo"
                width={38}
                height={28}
                aria-label="Goes to Dashboard page"
              />
            </span>
            <span
              className={`tw-scale-0 ${
                open && 'tw-scale-100'
              } tw-transition-all tw-duration-300`}
            >
              Dayrade
            </span>
          </NavLink>
        </div>
        <div
          className={`tw-scale-0 ${
            open && 'tw-scale-100'
          } tw-px-4 tw-transition-all tw-duration-300`}
        >
          <h2 className="tw-text-xl">Navigation</h2>
        </div>
        <nav
          aria-label="main"
          className="tw-flex tw-h-[88%] tw-flex-col tw-justify-between tw-rounded-lg tw-pb-2 tw-pt-1"
        >
          <div className="tw-mx-4 tw-my-2 tw-h-[1px] tw-bg-sidenav"></div>
          <ul role="navigation" className={`sidenavbar-top`}>
            {/* custom-scrollbar  */}
            {sideNavItemsTop.map((item) => (
              <SideNavBarItem
                key={item.path}
                open={open}
                path={item.path}
                label={item.label}
                icon={item.icon}
              />
            ))}
          </ul>
          <div className="tw-mx-4 tw-my-2 tw-h-[1px] tw-bg-sidenav"></div>
          <ul role="navigation" className="tw-h-[120px]">
            {sideNavItemsBottom.map((item) => (
              <SideNavBarItem
                key={item.path}
                open={open}
                path={item.path}
                label={item.label}
                icon={item.icon}
              />
            ))}
            <li className={`tw-group tw-relative tw-py-[6px]`}>
              <button
                className={`tw-flex tw-w-[279px] tw-items-center tw-gap-x-1 tw-text-sidenav hover:tw-text-secondary-dark`}
              >
                <span
                  className={`tw-flex tw-min-w-[57px] tw-max-w-[57px] tw-items-center tw-justify-center`}
                  aria-label="Logout"
                >
                  <Door />
                </span>
                <span
                  className={`${
                    open ? 'tw-inline tw-scale-100' : 'tw-hidden tw-scale-0'
                  } tw-text-[16px] tw-leading-4 tw-transition-transform tw-duration-300`}
                >
                  Logout
                </span>
              </button>
              {!open && (
                <span className="tw-absolute tw-left-16 tw-top-[4px] tw-w-auto tw-min-w-max tw-origin-left tw-scale-0 tw-rounded-md tw-bg-surface-dark tw-p-2 tw-text-xs tw-font-bold tw-text-white tw-shadow-md tw-transition-all tw-duration-100 group-hover:tw-scale-100">
                  Logout
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
