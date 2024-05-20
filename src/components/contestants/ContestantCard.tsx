import { Link } from 'react-router-dom';
import { Image } from '@src/ui';

interface ContestantCardProps {
  id: string;
  first_name: string;
  last_name: string;
  profile_pic: string | null;
  twitch_handle: string;
  rank: number;
  amount: number;
}

const ContestantCard = ({
  id,
  first_name,
  last_name,
  profile_pic,
  twitch_handle,
  rank,
  amount,
}: ContestantCardProps) => {
  return (
    <Link to={`/user/${id}`}>
      <div
        className={`tw-w-[140px] tw-rounded-[10px] tw-border tw-border-textSecondary tw-bg-surface-dark tw-p-2 tw-shadow-card tw-transition-all hover:tw-scale-105 hover:tw-border-primary-dark sm:tw-w-[173px]`}
      >
        <div className="tw-mb-2 tw-flex tw-items-center tw-justify-center">
          <Image
            classNames={`tw-rounded-lg tw-w-full tw-max-w-[124px] sm:tw-max-w-[157px] tw-h-auto`}
            src={profile_pic ?? '/images/avatar.png'}
            alt={''}
            width={157}
            height={157}
            loading="eager"
          />
        </div>
        <div>
          <h4
            className={`heading4 tw-mb-1 tw-leading-4 md:tw-leading-[18px] lg:tw-leading-5`}
          >
            <span className={`tw-block tw-w-full tw-overflow-hidden`}>
              {first_name}
            </span>
            <span className={`tw-block tw-w-full tw-overflow-hidden`}>
              {last_name}
            </span>
          </h4>
          <p className={`text2 tw-mb-3 tw-text-primary-dark`}>
            @{twitch_handle}
          </p>
          <div>
            <span
              className={`text2 tw-mr-2 tw-rounded tw-bg-primary-dark tw-px-2 tw-py-1 tw-text-surface-dark`}
            >
              #{rank}
            </span>
            <span
              className={`text2 tw-rounded tw-bg-primary-dark tw-px-2 tw-py-1 tw-text-surface-dark`}
            >
              {amount}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ContestantCard;
