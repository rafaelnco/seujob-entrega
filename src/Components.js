import React, { useState } from "react";

import PropTypes from "prop-types";

import { applyVariations } from "./Appearance";

const Section = ({
  _DefaultTagType = "div",
  TagType = _DefaultTagType,
  hoverIn,
  hoverOut,
  pressIn,
  pressOut,
  style,
  ...props
}) => {
  const [pressed, setPressed] = useState(false);
  const handlers = {
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
      if (pressed) {
        if (pressOut) pressOut();
        setPressed(false);
      }
      if (hoverOut) hoverOut();
    }
  };
  return (
    <TagType
      {...handlers}
      {...props}
      style={Object.assign(
        TagType === _DefaultTagType && { display: "flex" },
        applyVariations(props),
        style
      )}
    />
  );
};

const Navigator = ({ scene, children, controller }) => {
  return (
    <Section full style={{ display: "block", position: "relative" }}>
      {children.map((child, index) => (
        <Section
          style={{
            opacity: `${~~(scene === index)}`,
            zIndex: ~~(scene === index),
            transition: `opacity 600ms`,
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
        >
          <child.component {...controller} />
        </Section>
      ))}
    </Section>
  );
};

const Input = ({ children, style, ...props }) => (
  <Section
    TagType="input"
    placeholder={children}
    transparent-background
    {...props}
    style={{
      width: "100%",
      border: "none",
      ...style
    }}
  />
);

const Text = props => <Section TagType="p" primary-foreground {...props} />;

const Link = props => (
  <Text TagType="a" no-decoration link-foreground {...props} />
);

const Image = props => (
  <Section TagType="img" normal-round normal-shadow {...props} />
);

const Path = props => <Section TagType="path" primary-fill {...props} />;

export { Section, Text, Link, Path, Input, Image, Navigator };
