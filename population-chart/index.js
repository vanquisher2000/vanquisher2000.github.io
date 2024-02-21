import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  scaleBand,
  scaleLinear,
  max,
  format,
} from 'd3';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { DoubleMarks } from './DoubleMarks';
import { Dropdown } from './Dropdown';
import { ColorLegend } from './ColorLegend';

const width = window.innerWidth;
const height = window.innerHeight- 10;
const margin = {
  top: 10,
  right: 30,
  bottom: 65,
  left: 150,
};
const xAxisLabelOffset = 50;

const options = [
  { value: 'total', label: '男女:total' },
  { value: 'male', label: '男性:male' },
  { value: 'female', label: '女性:female' },
  { value: 'both', label: '男性＆女性' },
];

//const initialValue = "total";

const App = () => {
  const data = useData();
  const initialXAttribute = 'both';
  const [xAttribute, setXAttribute] = useState(
    initialXAttribute
  );
  const xValue = (d) => d[xAttribute];
  const yValue = (d) => d.pref;

  const [hoveredValue, setHoveredValue] = useState(null);
  console.log(hoveredValue);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  let rectColor = '';
  if (xAttribute === 'total') {
    rectColor = '#137B80';
  } else if (xAttribute === 'male') {
    rectColor = '#8E6C8A';
  } else if (xAttribute === 'female') {
    rectColor = '#E68424';
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const colorLegendLabel = 'Gender';

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) =>
    siFormat(tickValue).replace('G', 'B');

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  if (xAttribute != 'both') {
    return (
      <>
        <label for="x-select">Choose a catagory:</label>
        <Dropdown
          options={options}
          id="x-select"
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <svg width={width} height={height} charset="UTF-8">
          <g
            transform={`translate(${margin.left},${margin.top})`}
          >
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
            />
            <AxisLeft yScale={yScale} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              人口
            </text>

            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              fill={rectColor}
            />
          </g>
        </svg>
      </>
    );
  } else {
    const xValue1 = (d) => d.male;

    const xValue2 = (d) => d.female;

    const xScale1 = scaleLinear()
      .domain([0, max(data, xValue1)])
      .range([0, innerWidth]);

    const xScale2 = scaleLinear()
      .domain([0, max(data, xValue2)])
      .range([0, innerWidth]);

    return (
      <>
        <label for="x-select">Choose a gender:</label>
        <Dropdown
          options={options}
          id="x-select"
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />

        <svg width={width} height={height} charset="UTF-8">
          <g transform={`translate(${20},${height - 120})`}>
            <text
              className="colorLegend-label"
              x={17}
              y={-15}
              textAnchor="middle"
            >
              {colorLegendLabel}
            </text>
            <ColorLegend
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
            />
          </g>
          <g
            transform={`translate(${margin.left},${margin.top})`}
          >
            <AxisBottom
              xScale={xScale1}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
            />
            <AxisLeft yScale={yScale} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              人口
            </text>
            <DoubleMarks
              data={data}
              xScale1={xScale1}
              xScale2={xScale2}
              yScale={yScale}
              xValue1={xValue1}
              xValue2={xValue2}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
              fill1="#8E6C8A"
              fill2="#E68424"
              opacity1={hoveredValue === 'female' ? 0.2 : 1}
              opacity2={hoveredValue === 'male' ? 0.2 : 1}
            />
          </g>
        </svg>
      </>
    );
  }
};
const rootElement = document.getElementById('root');
ReactDOM.