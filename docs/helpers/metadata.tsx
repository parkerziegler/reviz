import BarThumbnail from '../public/bar.png';
import BubbleThumbnail from '../public/bubble.png';
import HistogramThumbnail from '../public/histogram.png';
import ScatterplotThumbnail from '../public/scatterplot.png';
import StackedBarThumbnail from '../public/stacked-bar.png';
import StripPlotThumbnail from '../public/strip-plot.png';
import NYTVaccineVotingThumbnail from '../public/NYT-vaccine-voting.png';
import NPRCovidShiftThumbnail from '../public/NPR-covid-shift.png';

interface ExampleMeta {
  src: StaticImageData;
  alt: string;
}

export const metadata: Record<string, ExampleMeta> = {
  bar: {
    src: BarThumbnail,
    alt: 'The example bar chart used in the Observable Plot documentation on the Bar Mark. The chart shows the frequency of each letter in the English language.',
  },
  bubble: {
    src: BubbleThumbnail,
    alt: "A modified bubble chart from the Observable Plot documentation showing relationships between a vehicle's 0-60, horsepower, and fuel economy.",
  },
  histogram: {
    src: HistogramThumbnail,
    alt: 'A histogram visualizing the stopping times of the first 1000 integers when run through the algorithm underlying the Collatz conjecture.',
  },
  scatterplot: {
    src: ScatterplotThumbnail,
    alt: 'The example scatterplot from the Observable Plot documentation showing the relationship between weight, height, and sex of Olympic athletes.',
  },
  ['stacked-bar']: {
    src: StackedBarThumbnail,
    alt: 'The example stacked bar chart from the Observable Plot documentation on the Stack Transform. The chart, based on data from Florence Nightingale, shows deaths in the Crimean War by month, with each group representing the cause of death.',
  },
  ['strip-plot']: {
    src: StripPlotThumbnail,
    alt: "A modified strip plot based on the Observable Plot documentation of the Tick Mark. The strip plot shows the age distribution of each state's population.",
  },
  ['NPR-covid-shift']: {
    src: NPRCovidShiftThumbnail,
    alt: 'A stacked bar chart from NPR showing how deaths related to Covid-19 have shifted away from urban centers to rural towns over the course of the pandemic.',
  },
  ['NYT-vaccine-voting']: {
    src: NYTVaccineVotingThumbnail,
    alt: 'A scatterplot from the New York Times showing correlations between voting patterns and vaccination status.',
  },
};
