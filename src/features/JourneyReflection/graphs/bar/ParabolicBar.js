const getParabolicPath = ({ x, y, width, height, controlPointOffset, item }) =>
  `M${x - controlPointOffset},${y + height}
   Q${x + width / 2},${y - height + 2 * height * item * 0.11} ${
     x + width + controlPointOffset
   },${y + height} 
   Z`;

const getNormalParabolicPath = ({ x, y, width, height, controlPointOffset }) =>
  `M${x - controlPointOffset},${y + height}
   Q${x + width / 2},${y - height} ${x + width + controlPointOffset},${
     y + height
   } 
   Z`;

const ParabolicBar = (props) => {
  const { x, y, width, height, controlPointOffset, Count } = props;

  const fillColor = `${
    (Count > 0 && Count <= 5 && '#FA5757') ||
    (Count > 5 && Count <= 10 && '#ed4928') ||
    (Count > 10 && Count <= 15 && '#F5C563') ||
    (Count > 15 && Count <= 20 && '#5ECC7B') ||
    (Count > 20 && '#7E87EF')
  }`;

  const fillStroke = `${
    (Count > 0 && Count <= 5 && '#ca4245') ||
    (Count > 5 && Count <= 10 && '#ed4928') ||
    (Count > 10 && Count <= 15 && '#F5C563') ||
    (Count > 15 && Count <= 20 && '#387D4B') ||
    (Count > 20 && '#7E87EF')
  }`;

  const Arr = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {Arr.map((item, index) => {
        if (item > 1) {
          return (
            <path
              key={index}
              d={getParabolicPath({
                x,
                y,
                width,
                height,
                controlPointOffset,
                item,
              })}
              fill={fillColor}
              stroke={fillStroke}
              fillOpacity={0}
            />
          );
        } else
          return (
            <path
              key={index}
              d={getNormalParabolicPath({
                x,
                y,
                width,
                height,
                controlPointOffset,
              })}
              fill={fillColor}
              stroke={fillStroke}
              fillOpacity={0.7}
            />
          );
      })}
    </>
  );
};

export default ParabolicBar;
