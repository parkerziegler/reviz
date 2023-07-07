import type { Metadata } from 'next';

import RevizHistogram from '../../../src/components/charts/Histogram';
import Visualization from '../../../src/components/shared/Visualization';

export const metadata: Metadata = {
  title: 'reviz: Histogram',
  description:
    'The reviz compiler can reverse engineer histograms from the DOM, such as this example from Parker Ziegler on Observable.',
};

const Histogram: React.FC = () => {
  return (
    <Visualization
      href="https://observablehq.com/@parkerziegler/playing-with-the-collatz-conjecture"
      title="From Parker Ziegler on Observable — Playing with the Collatz Conjecture"
    >
      <RevizHistogram />
    </Visualization>
  );
};

export default Histogram;
