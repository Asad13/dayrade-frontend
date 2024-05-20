import { Link } from 'react-router-dom';
import { Link as LinkIcon } from '@assets/icons/common';

interface CardTitleProps {
  title: string;
  path?: string;
}

const CardTitle = ({ title, path }: CardTitleProps) => {
  return (
    <div
      className={`tw-flex tw-items-center tw-justify-between tw-border-b tw-border-b-textSecondary tw-pb-1`}
    >
      <h3 className="title tw-text-textSecondary">{title}</h3>
      {path !== undefined && (
        <Link to={path}>
          <span className={`tw-text-textSecondary hover:tw-text-primary-dark`}>
            <LinkIcon />
          </span>
        </Link>
      )}
    </div>
  );
};

export default CardTitle;
