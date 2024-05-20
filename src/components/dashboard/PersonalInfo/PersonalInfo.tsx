import { Card, Image } from '@src/ui';
import CardTitle from '../common/CardTitle';
import { countries } from '@assets/data/countries';

const data = {
  twitch_id: 'twitch_handle',
  name: 'Frank Whiteaker',
  profile_pic: null,
  job_title: 'Desginer',
  bio: 'Pretium maecenas arcu, euismod velit viverra. Venenatis ultrices senectus pellentesque pulvinar aenean eget.',
  country: 'CA',
};

const PersonalInfo = () => {
  return (
    <aside className={`dashboard-personal-info-container`}>
      <div>
        <Card classNames={`tw-mb-4`}>
          <CardTitle title="Profile" path="/profile" />
          <div className="tw-mt-4 tw-flex tw-items-center tw-justify-center">
            <Image
              classNames={`tw-rounded-sm tw-w-full tw-max-w-[257px] tw-h-auto`}
              src={data.profile_pic ?? '/images/avatar.png'}
              alt={''}
              width={257}
              height={265}
              loading="eager"
            />
          </div>
        </Card>
        <Card classNames={`tw-mb-4`}>
          <p className="tw-mb-4">@{data.twitch_id}</p>
          <h3 className="title">{data.name}</h3>
        </Card>
      </div>
      <div>
        <Card classNames={`tw-mb-4`}>
          <CardTitle title="About" />
          <div className="tw-border-b tw-border-b-textSecondary tw-py-4">
            <h3 className="title tw-mb-3 tw-text-primary-dark">
              {data.job_title}
            </h3>
            <p className="tw-text-[16px] tw-leading-7 tw-text-[#8A92A6]">
              {data.bio}
            </p>
          </div>
          <div className="tw-mt-4 tw-flex tw-items-center">
            <span className="flag-country-select-icon-container">
              <img
                className="flag-country-select-icon"
                src={`/flags/${data.country.toLowerCase()}.svg`}
                alt={countries[data.country]}
              />
            </span>
            <span className="tw-text-lg">{countries[data.country]}</span>
          </div>
        </Card>
      </div>
    </aside>
  );
};

export default PersonalInfo;
