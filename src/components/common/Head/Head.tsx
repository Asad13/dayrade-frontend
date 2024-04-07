import { Helmet } from 'react-helmet';
import { APP_NAME } from '@constants/app';

interface HeadProps {
  title?: string;
}

const Head = ({ title }: HeadProps) => {
  return (
    <Helmet>
      <title>
        {APP_NAME} {title !== undefined ? `- ${title}` : ''}
      </title>
    </Helmet>
  );
};

export default Head;
