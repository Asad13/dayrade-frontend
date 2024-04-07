import React, { useRef } from 'react';
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
import { useOnClickOutside } from '@hooks/useOnClickOutside';

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
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutsie = () => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      setOpen(false);
    }
  };

  useOnClickOutside(ref, handleClickOutsie);

  return (
    <aside
      className={`tw-fixed tw-left-0 tw-top-0 tw-z-40 tw-h-screen tw-text-sidenav lg:tw-p-1`}
      aria-label="Side Navigation"
    >
      <div
        ref={ref}
        className={`tw-flex tw-h-full tw-flex-col-reverse lg:tw-rounded-lg ${
          open ? 'tw-w-[279px] tw-bg-surface-dark' : 'tw-w-0 lg:tw-w-[57px]'
        }`}
      >
        <div
          className={`tw-group tw-peer tw-h-[93%] ${
            open ? 'tw-w-[279px]' : 'tw-w-0 lg:tw-w-[57px]'
          } tw-transition-all tw-duration-300 lg:hover:tw-w-[279px]`}
        >
          <div
            className={`
        tw-h-full tw-w-full tw-bg-surface-dark tw-pb-2 tw-pt-6 tw-drop-shadow lg:tw-rounded-b-lg`}
          >
            <div className="tw-pb-4">
              <NavLink
                to="/"
                className={`tw-flex tw-items-center tw-gap-x-1`}
                aria-label="Dayrade home page"
              >
                <span
                  className={`tw-flex ${
                    open ? 'tw-scale-100' : 'tw-scale-0 lg:tw-scale-100'
                  } tw-min-w-[59px] tw-max-w-[59px] tw-items-center tw-justify-center tw-transition-all tw-duration-300`}
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
                  } heading2 tw-transition-all tw-duration-300 lg:group-hover:tw-scale-100`}
                >
                  Dayrade
                </span>
              </NavLink>
            </div>
            <div
              className={`tw-scale-0 ${
                open && 'tw-scale-100'
              } tw-px-4 tw-transition-all tw-duration-300 lg:group-hover:tw-scale-100`}
            >
              <h2 className="tw-text-xl">Navigation</h2>
            </div>
            <nav
              aria-label="main"
              className="tw-flex tw-h-[88%] tw-flex-col tw-justify-between tw-rounded-lg tw-pb-2 tw-pt-1"
            >
              <div className="tw-mx-4 tw-my-2 tw-h-[1px] tw-bg-sidenav"></div>
              <ul role="navigation" className={`sidenavbar-top`}>
                {sideNavItemsTop.map((item) => (
                  <SideNavBarItem
                    key={item.path}
                    path={item.path}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </ul>
              <div className="tw-mx-4 tw-my-2 tw-h-[1px] tw-bg-sidenav"></div>
              <ul
                role="navigation"
                className="tw-h-[120px] tw-overflow-x-hidden"
              >
                {sideNavItemsBottom.map((item) => (
                  <SideNavBarItem
                    key={item.path}
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
                    <span className={`tw-text-[16px] tw-leading-4`}>
                      Logout
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          className={`${
            open
              ? 'tw-w-[279px] tw-bg-surface-dark tw-drop-shadow'
              : 'tw-w-[57px] lg:tw-bg-surface-dark lg:tw-drop-shadow'
          } tw-flex tw-h-[7%] tw-items-center tw-justify-end tw-transition-all tw-duration-300 lg:tw-rounded-t-lg lg:peer-hover:tw-w-[279px]`}
        >
          <div className="tw-flex tw-h-full tw-w-[57px] tw-items-center tw-justify-center">
            <div
              className={`tw-border-border-dark tw-bg-on-primary-dark tw-flex tw-h-8 tw-w-8 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-border tw-bg-surface-secondary-dark `}
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
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
