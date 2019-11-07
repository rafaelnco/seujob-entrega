import React, { useState } from "react";

function useMouse({ hoverIn, hoverOut, pressIn, pressOut }) {
  const [pressed, setPressed] = useState(false);
  return {
    onMouseEnter: () => {
      if (hoverIn) hoverIn();
    },
    onMouseDown: () => {
      if (pressIn) pressIn();
      setPressed(true);
    },
    onMouseUp: () => {
      if (pressed && pressOut) pressOut();
      setPressed(false);
    },
    onMouseLeave: () => {
      if (pressed) setPressed(false);
      if (hoverOut) hoverOut();
    }
  };
}

useMouse.consumer = ["hoverIn", "hoverOut", "pressIn", "pressOut"];

export { useMouse };
