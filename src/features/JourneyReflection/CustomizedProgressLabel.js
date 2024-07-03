export const CustomizedProgressLabel = ({ chartWidth }) => {
  const fontSize = 11;

  return (
    <>
      <text
        className="bg-red-500"
        width={'full'}
        dy={9}
        dx={110}
        textAnchor="start"
        fill="#666" // Set the text color
        fontSize={fontSize} // Set the font size
      >
        PROGRESS OVER TIME
      </text>
    </>
  );
};
