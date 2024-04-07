import { CSSProperties } from 'react';

interface PageHeadingProps {
  title: string;
  containerClassNames?: string;
  containerStyle?: CSSProperties;
  classNames?: string;
  style?: CSSProperties;
}

const PageHeading = ({
  title,
  containerClassNames,
  containerStyle,
  classNames,
  style,
}: PageHeadingProps) => {
  return (
    <div
      className={`page-heading-container ${
        containerClassNames !== undefined && containerClassNames
      }`}
      style={containerStyle !== undefined ? containerStyle : {}}
    >
      <h1
        className={`page-heading ${classNames !== undefined && classNames}`}
        style={style !== undefined ? style : {}}
      >
        {title}
      </h1>
    </div>
  );
};

export default PageHeading;
