const TooltipMessage: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <p className="text-primary rounded bg-blue-50 px-2 py-1 font-mono shadow-md">
      {children}
    </p>
  );
};

export default TooltipMessage;
