import { useParams } from 'react-router-dom';
import Head from '@src/components/common/Head';
import PageContainer from '@components/common/pages/PageContainer';
import PageHeading from '@components/common/pages/PageHeading';
import Chart from '@components/dashboard/Charts/Chart';
import PersonalInfo from '@components/dashboard/PersonalInfo';

const title = 'Chart';

const data = {
  'usd-balance': {
    title: 'Profit',
    footerTitle: 'USD Balance',
    footerNote: 'Available to pay out',
    amount: 367,
  },
  'total-pnl': {
    title: 'Profit',
    footerTitle: 'Total Pnl',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
  'total-shares-traded': {
    title: 'Profit',
    footerTitle: 'Total Shares Traded',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
  'realized-pnl': {
    title: 'Profit',
    footerTitle: 'Realized Pnl',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
  'unrealized-pnl': {
    title: 'Profit',
    footerTitle: 'Unrealized Pnl',
    footerNote: 'Available to pay out',
    amount: 367,
  },
  'no-of-stocks-traded': {
    title: 'Profit',
    footerTitle: 'No Of Stocks Traded',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
  'no-of-trades': {
    title: 'Profit',
    footerTitle: 'No Of Trades',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
  'total-notional-traded': {
    title: 'Profit',
    footerTitle: 'Total Notional Traded',
    footerNote: 'Transactions in this month',
    amount: 367,
  },
};

export const Component = () => {
  const { chart } = useParams();

  return (
    <>
      <Head title={title} />
      <PageContainer>
        <PageHeading title={title} />
        <main className={`dashboard-main-container`}>
          <PersonalInfo />
          {chart !== undefined && (
            <Chart {...data[chart as keyof typeof data]} />
          )}
        </main>
      </PageContainer>
    </>
  );
};

Component.displayName = 'Dashboard';
