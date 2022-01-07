import * as React from 'react';
import Head from 'next/head';
import cs from 'classnames';

import { withViewer } from '../../components/Viewer';

import styles from './NPR-covid-shift.module.css';

const NPRCovidShift: React.FC = () => {
  return (
    <>
      <Head>
        <title>
          reviz: NPR — America&apos;s 200,000 COVID-19 Deaths: Small Cities And
          Towns Bear A Growing Share
        </title>
      </Head>
      <svg width="650" height="366">
        <g transform="translate(37, 0)">
          <g
            className={styles['axis']}
            transform="translate(0, 336)"
            fill="none"
            fontSize="10"
            fontFamily="sans-serif"
            textAnchor="middle"
          >
            <path
              className="domain"
              stroke="currentColor"
              d="M0.5,6V0.5H593.5V6"
            ></path>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(10.835548172757482,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                Feb. 26
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(30.536544850498345,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(50.23754152823921,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(69.93853820598008,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(89.63953488372094,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                Mar. 25
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(109.3405315614618,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(129.04152823920268,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(148.74252491694352,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(168.4435215946844,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                Apr. 22
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(188.14451827242527,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(207.84551495016612,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(227.546511627907,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(247.24750830564787,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                May 20
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(266.9485049833887,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(286.64950166112953,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(306.3504983388704,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(326.0514950166113,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                June 17
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(345.75249169435216,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(365.45348837209303,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(385.15448504983385,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(404.8554817275747,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                July 15
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(424.5564784053156,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(444.2574750830565,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(463.95847176079735,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(483.6594684385382,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                Aug. 12
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(503.36046511627904,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(523.06146179402,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(542.7624584717609,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(562.4634551495017,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em">
                Sept. 9
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(582.1644518272426,0)"
            >
              <line stroke="currentColor" y2="6"></line>
              <text fill="currentColor" y="9" dy="0.71em"></text>
            </g>
          </g>
          <g
            className={cs(styles['axis'], styles['y'])}
            fill="none"
            fontSize="10"
            fontFamily="sans-serif"
            textAnchor="end"
          >
            <path
              className="domain"
              stroke="currentColor"
              d="M-6,336.5H0.5V0.5H-6"
            ></path>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,336.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                0%
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,275.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                20%
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,214.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                40%
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,153.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                60%
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,92.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                80%
              </text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,31.5)"
            >
              <line stroke="currentColor" x2="-6"></line>
              <text fill="currentColor" x="-9" dy="0.32em">
                100%
              </text>
            </g>
          </g>
          <g
            className={cs(styles['y'], styles['grid'])}
            fill="none"
            fontSize="10"
            fontFamily="sans-serif"
            textAnchor="end"
          >
            <path
              className="domain"
              stroke="currentColor"
              d="M593,336.5H0.5V0.5H593"
            ></path>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,336.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,275.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,214.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,153.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,92.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
            <g
              className={styles['tick']}
              opacity="1"
              transform="translate(0,31.5)"
            >
              <line stroke="currentColor" x2="593"></line>
              <text fill="currentColor" x="-3" dy="0.32em"></text>
            </g>
          </g>
          <g className="bar" transform="translate(1.9700996677740932, 0)">
            <rect
              y="336"
              width="17.730897009966778"
              height="0"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="336"
              width="17.730897009966778"
              height="0"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="305"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="336"
              textAnchor="middle"
            ></text>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="336"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="183.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(21.671096345514957, 0)">
            <rect
              y="317"
              width="17.730897009966778"
              height="19"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="279"
              width="17.730897009966778"
              height="38"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="248"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="326.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="298"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="155"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(41.37209302325582, 0)">
            <rect
              y="336"
              width="17.730897009966778"
              height="0"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="311"
              width="17.730897009966778"
              height="25"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="280"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="336"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="323.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="171"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(61.07308970099669, 0)">
            <rect
              y="330"
              width="17.730897009966778"
              height="6"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="298"
              width="17.730897009966778"
              height="32"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="267"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="333"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="314"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="164.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(80.77408637873755, 0)">
            <rect
              y="328"
              width="17.730897009966778"
              height="8"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="295"
              width="17.730897009966778"
              height="33"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="264"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="332"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="311.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="163"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(100.47508305647841, 0)">
            <rect
              y="326"
              width="17.730897009966778"
              height="10"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="295"
              width="17.730897009966778"
              height="31"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="264"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="331"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="310.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="163"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(120.17607973421929, 0)">
            <rect
              y="327"
              width="17.730897009966778"
              height="9"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="290"
              width="17.730897009966778"
              height="37"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="259"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined hidden"
              x="8.865448504983389"
              y="331.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="308.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="160.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(139.87707641196013, 0)">
            <rect
              y="323"
              width="17.730897009966778"
              height="13"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="278"
              width="17.730897009966778"
              height="45"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="247"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="329.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="300.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="154.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(159.578073089701, 0)">
            <rect
              y="321"
              width="17.730897009966778"
              height="15"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="271"
              width="17.730897009966778"
              height="50"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="240"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="328.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="296"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="151"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(179.27906976744188, 0)">
            <rect
              y="321"
              width="17.730897009966778"
              height="15"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="266"
              width="17.730897009966778"
              height="55"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="235"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="328.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="293.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="148.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(198.98006644518273, 0)">
            <rect
              y="318"
              width="17.730897009966778"
              height="18"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="258"
              width="17.730897009966778"
              height="60"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="227"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="327"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="288"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="144.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(218.6810631229236, 0)">
            <rect
              y="321"
              width="17.730897009966778"
              height="15"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="275"
              width="17.730897009966778"
              height="46"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="244"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="328.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="298"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="153"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(238.38205980066448, 0)">
            <rect
              y="312"
              width="17.730897009966778"
              height="24"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="242"
              width="17.730897009966778"
              height="70"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="211"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="324"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="277"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="136.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(258.08305647840535, 0)">
            <rect
              y="310"
              width="17.730897009966778"
              height="26"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="240"
              width="17.730897009966778"
              height="70"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="209"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="323"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="275"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="135.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(277.7840531561462, 0)">
            <rect
              y="309"
              width="17.730897009966778"
              height="27"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="236"
              width="17.730897009966778"
              height="73"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="205"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="322.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="272.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="133.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(297.48504983388705, 0)">
            <rect
              y="307"
              width="17.730897009966778"
              height="29"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="235"
              width="17.730897009966778"
              height="72"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="204"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="321.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="271"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="133"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(317.1860465116279, 0)">
            <rect
              y="305"
              width="17.730897009966778"
              height="31"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="230"
              width="17.730897009966778"
              height="75"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="199"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="320.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="267.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="130.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(336.8870431893688, 0)">
            <rect
              y="314"
              width="17.730897009966778"
              height="22"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="256"
              width="17.730897009966778"
              height="58"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="225"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="325"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="285"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="143.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(356.58803986710967, 0)">
            <rect
              y="305"
              width="17.730897009966778"
              height="31"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="221"
              width="17.730897009966778"
              height="84"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="190"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="320.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="263"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="126"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(376.2890365448505, 0)">
            <rect
              y="303"
              width="17.730897009966778"
              height="33"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="218"
              width="17.730897009966778"
              height="85"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="187"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="319.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="260.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="124.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(395.99003322259136, 0)">
            <rect
              y="302"
              width="17.730897009966778"
              height="34"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="203"
              width="17.730897009966778"
              height="99"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="172"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="319"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="252.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="117"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(415.69102990033224, 0)">
            <rect
              y="290"
              width="17.730897009966778"
              height="46"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="187"
              width="17.730897009966778"
              height="103"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="156"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="313"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="238.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="109"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(435.3920265780731, 0)">
            <rect
              y="294"
              width="17.730897009966778"
              height="42"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="184"
              width="17.730897009966778"
              height="110"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="153"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="315"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="239"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="107.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(455.093023255814, 0)">
            <rect
              y="291"
              width="17.730897009966778"
              height="45"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="186"
              width="17.730897009966778"
              height="105"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="155"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="313.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="238.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="108.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(474.79401993355486, 0)">
            <rect
              y="287"
              width="17.730897009966778"
              height="49"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="184"
              width="17.730897009966778"
              height="103"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="153"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="311.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="235.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="107.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(494.4950166112957, 0)">
            <rect
              y="282"
              width="17.730897009966778"
              height="54"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="181"
              width="17.730897009966778"
              height="101"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="150"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="309"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="231.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="106"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(514.1960132890366, 0)">
            <rect
              y="277"
              width="17.730897009966778"
              height="59"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="174"
              width="17.730897009966778"
              height="103"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="143"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="306.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="225.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="102.5"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(533.8970099667774, 0)">
            <rect
              y="277"
              width="17.730897009966778"
              height="59"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="177"
              width="17.730897009966778"
              height="100"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="146"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="306.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="227"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="104"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(553.5980066445183, 0)">
            <rect
              y="278"
              width="17.730897009966778"
              height="58"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="173"
              width="17.730897009966778"
              height="105"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="142"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="307"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="225.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="102"
              textAnchor="middle"
            ></text>
          </g>
          <g className="bar" transform="translate(573.2990033222592, 0)">
            <rect
              y="273"
              width="17.730897009966778"
              height="63"
              style={{ fill: 'rgb(139, 192, 191' }}
              className="smallrural-towns"
            ></rect>
            <rect
              y="169"
              width="17.730897009966778"
              height="104"
              style={{ fill: 'rgb(23, 128, 126' }}
              className="medium-cities"
            ></rect>
            <rect
              y="31"
              width="17.730897009966778"
              height="138"
              style={{ fill: 'rgb(234, 170, 97' }}
              className="large-cities"
            ></rect>
            <text
              className="undefined"
              x="8.865448504983389"
              y="304.5"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="221"
              textAnchor="middle"
            ></text>
            <text
              className="undefined"
              x="8.865448504983389"
              y="100"
              textAnchor="middle"
            ></text>
          </g>
        </g>
      </svg>
    </>
  );
};

export default withViewer(NPRCovidShift, {
  href: 'https://www.npr.org/sections/health-shots/2020/09/22/914578634/americas-200-000-covid-19-deaths-small-cities-and-towns-bear-a-growing-share',
  title:
    "From NPR: America's 200,000 COVID-19 Deaths: Small Cities And Towns Bear A Growing Share",
  data: {},
});
