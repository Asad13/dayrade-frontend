// import { useEffect, useCallback } from 'react';
import { axiosPrivate } from '@src/utils/axiosInstances';
import { useQuery } from '@tanstack/react-query';
import Chart from './Chart/Chart';

type DataItem = {
  title: string;
  footerTitle: string;
  footerNote: string;
  path: string;
  amount: number;
};

const data1: DataItem[] = [
  {
    title: 'Profit',
    footerTitle: 'USD Balance',
    footerNote: 'Available to pay out',
    path: '/charts/usd-balance',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'Total Pnl',
    footerNote: 'Transactions in this month',
    path: '/charts/total-pnl',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'Total Shares Traded',
    footerNote: 'Transactions in this month',
    path: '/charts/total-shares-traded',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'Realized Pnl',
    footerNote: 'Transactions in this month',
    path: '/charts/realized-pnl',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'Unrealized Pnl',
    footerNote: 'Available to pay out',
    path: '/charts/unrealized-pnl',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'No Of Stocks Traded',
    footerNote: 'Transactions in this month',
    path: '/charts/no-of-stocks-traded',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'No Of Trades',
    footerNote: 'Transactions in this month',
    path: '/charts/no-of-trades',
    amount: 367,
  },
  {
    title: 'Profit',
    footerTitle: 'Total Notional Traded',
    footerNote: 'Transactions in this month',
    path: '/charts/total-notional-traded',
    amount: 367,
  },
];

const fetchData = async () => {
  try {
    const { data } = await axiosPrivate.get('/v1/trade/summaries');

    return data as any;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Charts = () => {
  const { data, isLoading /*refetch*/ } = useQuery({
    queryKey: ['dashboard', 'charts'],
    queryFn: fetchData,
  });

  // // Function to refetch data every minute
  // const fetchEveryMinute = useCallback(() => {
  //   refetch();
  // }, [refetch]);

  // useEffect(() => {
  //   // Fetch data initially
  //   fetchEveryMinute();

  //   // Set up interval to fetch data every minute
  //   const intervalId = setInterval(fetchEveryMinute, 60000);

  //   // Clear interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [fetchEveryMinute]);

  if (isLoading) return <div>Loading Dashboard...</div>;
  // if (isError) return <div>Error fetching data</div>;

  return (
    <div className="dashboard-charts-container">
      {data.status === false && data.data == null ? (
        <p>{data.message}</p>
      ) : (
        data1.map((chart) => <Chart key={chart.path} {...chart} />)
      )}
    </div>
  );
};

export default Charts;
