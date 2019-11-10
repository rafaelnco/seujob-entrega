import React, { useState } from "react";

import PropTypes from "prop-types";

import { $ } from "barestyle";

import { applyVariations } from "./Appearance";

const Bare = ({ Tag = "div", ...props }) => <Tag {...applyVariations(props)} />;

const Box = props => <Bare use-mouse flex {...props} />;

const Text = props => <Bare Tag="p" primary-foreground {...props} />;

Text.Span = props => <Bare Tag="span" primary-foreground {...props} />;

const Link = props => <Text Tag="a" no-decoration link-foreground {...props} />;

const Image = props => (
  <Bare Tag="img" normal-radius normal-shadow {...props} />
);

const Path = props => <Bare Tag="path" primary-fill {...props} />;

const Input = props => (
  <Bare Tag="input" transparent-background full-width no-border {...props} />
);

const Navigator = ({ scene, children, controller }) => {
  const style = <$ full-flex absolute zero-inset normal-opacity-transition />;
  const see = enabled =>
    enabled ? <$ one-apex full-opacity /> : <$ zero-apex zero-opacity />;
  return (
    <Box full-flex block relative>
      {children.map((child, index) => (
        <Box {...style.props} {...see(scene === index).props}>
          <child.component {...controller} />
        </Box>
      ))}
    </Box>
  );
};

export { Box, Text, Link, Path, Input, Image, Navigator };
