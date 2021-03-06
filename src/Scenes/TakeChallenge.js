import React from "react";
import PropTypes from "prop-types";
import { Box, Text, Path } from "../Components";
import { unit } from "../Appearance";

const TakeChallenge = () => {
  return (
    <Box full-flex>
      <Box vertical align-center justify-center full-flex>
        <svg
          className="rotating"
          xmlns="http://www.w3.org/2000/svg"
          width={unit(15)}
          height={unit(15)}
          viewBox="0 0 24 24"
        >
          <Path
            disabled-fill
            d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
          />
        </svg>
        <Text monumental-text>Aguarde</Text>
      </Box>
    </Box>
  );
};
export default TakeChallenge;
