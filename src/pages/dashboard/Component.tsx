import Head from '@src/components/common/Head';
import PageContainer from '@components/common/pages/PageContainer';
import PageHeading from '@components/common/pages/PageHeading';
import Charts from '@components/dashboard/Charts';
import PersonalInfo from '@components/dashboard/PersonalInfo';

const title = 'Dashboard';

export const Component = () => {
  return (
    <>
      <Head title={title} />
      <PageContainer>
        <PageHeading title={title} />
        <main className={`dashboard-main-container`}>
          <PersonalInfo />
          <Charts />
        </main>
      </PageContainer>
    </>
  );
};

Component.displayName = 'Dashboard';
