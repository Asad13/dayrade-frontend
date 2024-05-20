/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import { Card } from '@src/ui';
import CardTitle from '../../common/CardTitle';
import type { ApexOptions } from 'apexcharts';

interface ChartProps {
  title: string;
  footerTitle: string;
  footerNote: string;
  path?: string;
  amount: number;
}

const Chart = ({
  title,
  footerTitle,
  footerNote,
  path,
  amount,
}: ChartProps) => {
  const [series, setSeries] = useState([
    {
      name: footerTitle,
      data: [10, 41, 35, 51, 49, 62],
    },
  ]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      background: '#212121',
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#CDFF7B'],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: '#FCFCFD',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#FCFCFD',
        },
      },
    },
    annotations: {
      yaxis: [
        {
          label: {
            style: {
              color: '#FCFCFD',
            },
          },
        },
      ],
      xaxis: [
        {
          label: {
            style: {
              color: '#FCFCFD',
            },
          },
        },
      ],
    },
    stroke: {
      curve: 'smooth',
      width: 1.5,
    },
    theme: {
      mode: 'dark',
    },
  });

  return (
    <div className="dashboard-chart-container">
      <Card classNames={`tw-mb-4`}>
        <CardTitle title={title} path={path} />
        <div className="tw-mt-4 tw-flex tw-items-center tw-justify-center">
          <ReactApexChart
            options={options}
            series={series}
            type="line"
            width={'100%'}
            height={250}
          />
        </div>
      </Card>
      <Card classNames={`tw-mb-4`}>
        <div className="title tw-mb-4 tw-flex tw-items-center tw-justify-between">
          <h5 className="heading5">{footerTitle}</h5>
          {path !== undefined && (
            <Link to={path}>
              <span
                className={`tw-rounded-md tw-bg-[#3E3E3F] tw-px-3 tw-py-2 tw-text-sm tw-text-primary-dark tw-transition-all hover:tw-text-secondary-dark`}
              >
                view
              </span>
            </Link>
          )}
        </div>
        <p className="heading3 tw-mb-4">${amount}</p>
        <p className="tw-text-sm tw-text-[#8A92A6]">{footerNote}</p>
      </Card>
    </div>
  );
};

export default Chart;
