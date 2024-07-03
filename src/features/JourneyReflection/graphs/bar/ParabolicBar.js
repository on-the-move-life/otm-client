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
  const { x, y, width, height, controlPointOffset } = props;

  const fillColor = `${
    (height >= 50 && height <= 100 && '#F5C563') ||
    (height < 50 && '#FA5757') ||
    (height > 100 && '#5ECC7B')
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
              stroke={`${
                (height >= 50 && height <= 100 && '#F5C563') ||
                (height < 50 && '#ca4245') ||
                (height > 100 && '#387D4B')
              }`}
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
              stroke={`${
                (height >= 50 && height <= 100 && '#F5C563') ||
                (height < 50 && '#ca4245') ||
                (height > 100 && '#267540')
              }`}
              fillOpacity={0.7}
            />
          );
      })}
    </>
  );
};

export default ParabolicBar;
