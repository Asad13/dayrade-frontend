import { lazy, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';
import Head from '@src/components/common/Head';
import PageContainer from '@components/common/pages/PageContainer';
import SuspenseBoundary from '@components/utils/SuspenseBoundary';
import { Tab, TabPanel, Select } from '@src/ui';
import type { Option } from '@src/ui';

const title = 'Settings';

enum TabValue {
  Profile = 'profile',
  Password = 'password',
  'Sterling key' = 'sterling_key',
  Notifications = 'notifications',
}

const options: Array<Option> = Object.entries(TabValue).map(([key, value]) => ({
  value: value,
  label: key,
}));

const Profile = lazy(() => import('@components/settings/Profile'));
const Password = lazy(() => import('@components/settings/Password'));
const SterlingKey = lazy(() => import('@src/components/settings/SterlingKey'));
const Notifications = lazy(() => import('@components/settings/Notifications'));

export const Component = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const selectedTab = searchParams.get('tab') ?? TabValue.Profile;

  const handleTabSelect = (tab: TabValue) => {
    startTransition(() => {
      setSearchParams({ tab: tab });
    });
  };

  return (
    <>
      <Head title={title} />
      <PageContainer>
        <h1 className="page-heading tw-mb-4 tw-ml-[57px] lg:tw-ml-0">
          Settings
        </h1>
        <div className="settings-page-container">
          <div
            className="tabs-container horizontal-tabs-container"
            aria-label="Settings Tabs"
          >
            {Object.entries(TabValue).map(([key, value]) => (
              <Tab
                key={value}
                classNames={`tab ${selectedTab === value && 'selected-tab'}`}
                id={`tab-${value}`}
                ariaSelected={selectedTab === value}
                ariaControls={`tabpanel-${value}`}
                tabIndex={value === TabValue.Profile ? 0 : -1}
                onClick={() => handleTabSelect(value as TabValue)}
              >
                {key}
              </Tab>
            ))}
          </div>
          <div
            className="tabs-container tabs-select-container"
            aria-label="Select Settings Tabs"
          >
            <Select
              options={options}
              initialSelectedValuePos={0}
              selectValue={(value: string) =>
                handleTabSelect(value as TabValue)
              }
            />
          </div>
          <div className={`tabpanels-container ${isPending && 'loading'}`}>
            <SuspenseBoundary>
              {(selectedTab === TabValue.Profile || selectedTab === null) && (
                <TabPanel
                  id={`tabpanel-${TabValue.Profile}`}
                  ariaLabelledby={`tab-${TabValue.Profile}`}
                >
                  <Profile />
                </TabPanel>
              )}
              {selectedTab === TabValue.Password && (
                <TabPanel
                  id={`tabpanel-${TabValue.Password}`}
                  ariaLabelledby={`tab-${TabValue.Password}`}
                >
                  <Password />
                </TabPanel>
              )}
              {selectedTab === TabValue['Sterling key'] && (
                <TabPanel
                  id={`tabpanel-${TabValue['Sterling key']}`}
                  ariaLabelledby={`tab-${TabValue['Sterling key']}`}
                >
                  <SterlingKey />
                </TabPanel>
              )}
              {selectedTab === TabValue.Notifications && (
                <TabPanel
                  id={`tabpanel-${TabValue.Notifications}`}
                  ariaLabelledby={`tab-${TabValue.Notifications}`}
                >
                  <Notifications />
                </TabPanel>
              )}
            </SuspenseBoundary>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

Component.displayName = 'Settings';
