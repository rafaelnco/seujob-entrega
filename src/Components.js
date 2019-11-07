import React, { useState } from "react";

import PropTypes from "prop-types";

import { applyVariations } from "./Appearance";

const Bare = ({ Tag = "div", ...props }) => <Tag {...applyVariations(props)} />;

const Section = props => <Bare use-mouse flex {...props} />;

const Text = props => <Bare Tag="p" primary-foreground {...props} />;

Text.Span = props => <Bare Tag="span" primary-foreground {...props} />;

const Link = props => <Text Tag="a" no-decoration link-foreground {...props} />;

const Image = props => <Bare Tag="img" normal-round normal-shadow {...props} />;

const Path = props => <Bare Tag="path" primary-fill {...props} />;

const Input = props => (
  <Bare Tag="input" transparent-background full-width no-border {...props} />
);

const Navigator = ({ scene, children, controller }) => {
  return (
    <Section full block relative>
      {children.map((child, index) => (
        <Section
          absolute
          zero-inset
          giant-opacity-transition
          full-opacity={scene === index}
          one-apex={scene === index}
          zero-opacity={scene !== index}
          zero-apex={scene !== index}
        >
          <child.component {...controller} />
        </Section>
      ))}
    </Section>
  );
};

export { Section, Text, Link, Path, Input, Image, Navigator };
