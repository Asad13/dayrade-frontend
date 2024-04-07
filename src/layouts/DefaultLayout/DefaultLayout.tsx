import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '@src/components/navs/SideNav/SideNavBar';
// import Header from '@components/common/Header';
// import Footer from '@components/common/Footer';

const DefaultLayout = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <SideNavBar open={open} setOpen={setOpen} />
      <div
        className={`${
          open ? 'lg:tw-ml-[287px]' : 'lg:tw-ml-[67px]'
        } tw-transition-all tw-duration-300`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default DefaultLayout;
