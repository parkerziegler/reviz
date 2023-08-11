interface Props {
  className?: string;
}

const ElementSelectPrompt: React.FC<Props> = ({ className }) => {
  return (
    <p className={className}>
      Select an{' '}
      <code className="text-primary rounded bg-blue-50 px-1 py-0.5">svg</code>{' '}
      element to inspect.
    </p>
  );
};

export default ElementSelectPrompt;
