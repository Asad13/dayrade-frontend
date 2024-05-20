import Head from '@src/components/common/Head';
import PageContainer from '@components/common/pages/PageContainer';
import PageHeading from '@components/common/pages/PageHeading';
import ContestantCard from '@src/components/contestants/ContestantCard';

const title = 'Contestants';

const data = [
  {
    id: 'abc',
    first_name: 'John',
    last_name: 'Doe',
    profile_pic: null,
    twitch_handle: 'john_doe',
    rank: 1,
    amount: 500.67,
  },
  {
    id: 'def',
    first_name: 'John',
    last_name: 'Doe',
    profile_pic: null,
    twitch_handle: 'john_doe',
    rank: 2,
    amount: 357.33,
  },
];

export const Component = () => {
  // will fetch data in loader and pagination in state
  return (
    <>
      <Head title={title} />
      <PageContainer>
        <PageHeading title={title} />
        <main className={`tw-flex tw-flex-wrap tw-gap-4`}>
          {data !== undefined && data != null && data.length != 0 ? (
            data.map((contestant) => (
              <ContestantCard
                key={contestant.id}
                id={contestant.id}
                first_name={contestant.first_name}
                last_name={contestant.last_name}
                profile_pic={contestant.profile_pic}
                twitch_handle={contestant.twitch_handle}
                rank={contestant.rank}
                amount={contestant.amount}
              />
            ))
          ) : (
            <p className={`tw-w-full tw-text-center tw-text-error-dark`}>
              No contestants found
            </p>
          )}
        </main>
      </PageContainer>
    </>
  );
};

Component.displayName = 'Contestants';
