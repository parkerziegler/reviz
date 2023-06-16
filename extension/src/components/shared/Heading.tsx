import cs from "classnames";

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
        "border-b border-dotted border-b-primary text-sm",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
