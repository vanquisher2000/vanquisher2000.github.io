export const DoubleMarks = ({
  data,
  xScale1,
  xScale2,
  yScale,
  xValue1,
  xValue2,
  yValue,
  tooltipFormat,
  fill1,
  fill2,
  opacity1,
  opacity2
}) =>
  data.map((d) => (
    <>
    <g opacity={opacity1}>
    <rect
      className="doublemark"
      key={yValue(d)}
      fill={fill1}
      x={0}
      y={yScale(yValue(d))}
      width={xScale1(xValue1(d))}
      height={yScale.bandwidth() / 2.3}
    >
      <animate
        attributeName="width"
        from="0"
        to={xScale1(xValue1(d))}
        dur="0.5s"
        fill="freeze"
      
        restart="always"
      />
      <title>{tooltipFormat(xValue1(d))}</title>
    </rect>
      </g>
    <g opacity = {opacity2}>
    <rect
      className="doublemark"
      key={yValue(d)}
      fill={fill2}
      x={0}
      y={yScale(yValue(d)) + 4}
      width={xScale2(xValue2(d))}
      height={yScale.bandwidth() / 2.3}
    >
      <animate
        attributeName="width"
        from="0"
        to={xScale2(xValue2(d))}
        dur="0.5s"
        fill="freeze"
      
        restart="always"
      />
      <title>{tooltipFormat(xValue2(d))}</title>
    </rect>
      </g>
      </>
  ));
