interface Props {
  color: string;
}

const ColorValue: React.FC<Props> = ({ color }) => {
  return (
    <div className="stack-h stack-h-xs shrink-0 items-center">
      {color !== "none" ? (
        <span className="h-3 w-3" style={{ backgroundColor: color }} />
      ) : null}
      <p>{color}</p>
    </div>
  );
};

export default ColorValue;
