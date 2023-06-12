import cs from "classnames";

interface Props {
  className?: string;
}

const Heading: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <h2 className={cs("border-b border-b-primary text-base", className)}>
      {children}
    </h2>
  );
};

export default Heading;
