export const ColorLegend = ({
  tickSpacing = 20,
  tickSize = 7,
  onHover,
  hoveredValue
}) => {
  const categories = ['male', 'female'];
  const colors = ['#8E6C8A', '#E68424'];
  console.log(hoveredValue);
  return categories.map((category, i) => {
    return (
      <g
        className="colorLegend"
        transform={`translate(0,${i * tickSpacing})`}
        onMouseEnter={() => {onHover(category);}}
        onMouseOut={() =>{ onHover(null);}}
        opacity = {hoveredValue && category !== hoveredValue ? 0.2 : 1}
      >
        <circle fill={colors[i]} r={tickSize} />
        <text x={10} dy=".32em">
          {category}
        </text>
      </g>
    );
  });
};
