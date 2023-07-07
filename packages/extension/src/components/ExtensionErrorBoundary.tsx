import * as React from 'react';

interface Props {
  fallback: (message: string) => React.ReactNode;
}

interface State {
  hasError: boolean;
  message: string;
}

class ExtensionErrorBoundary extends React.Component<
  React.PropsWithChildren<Props>,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback(this.state.message);
    }

    return this.props.children;
  }
}

export default ExtensionErrorBoundary;
