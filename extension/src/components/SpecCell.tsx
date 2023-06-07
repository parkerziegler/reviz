import cs from "classnames";

interface SpecCellProps {
  header?: boolean;
}

const SpecCell: React.FC<React.PropsWithChildren<SpecCellProps>> = ({
  header = false,
  children,
}) => {
  return (
    <p
      className={cs(
        "border-b border-slate-400 px-2 py-1 font-mono odd:border-r",
        header ? "bg-slate-600 text-white" : "odd:text-slate-400"
      )}
    >
      {children}
    </p>
  );
};

export default SpecCell;
