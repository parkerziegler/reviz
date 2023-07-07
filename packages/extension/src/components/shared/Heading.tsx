import cs from 'classnames';

interface Props {
  className?: string;
}

const Heading: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <h2
      className={cs(
        'border-b-primary border-b border-dotted text-sm',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
