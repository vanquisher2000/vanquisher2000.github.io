export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  fill,
}) =>
  data.map((d) => (
    <rect
      className="mark"
      key={yValue(d)}
      fill={fill}
      x={0}
      y={yScale(yValue(d))}
      width={xScale(xValue(d))}
      height={yScale.bandwidth()}
    >
      <animate
        attributeName="width"
        from="0"
        to={xScale(xValue(d))}
        dur="0.5s"
        fill="freeze"
        repeatCount="1"
        restart="always"
      />
      <title>{tooltipFormat(xValue(d))}</title>
    </rect>
  ));
