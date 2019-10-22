import React from "react";
import PropTypes from "prop-types";
import { Section, Text, Link, Image } from "../Components";

const ReactMarkdown = require("react-markdown");

const ListJobs = ({ filter, posts }) => {
  return (
    <Section full flow justify-center>
      <Section style={{ flex: 0.8 }} vertical>
        {(
          (filter &&
            posts.filter(
              ({ title }) =>
                title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            )) ||
          posts
        ).map(({ body, title }, index) => (
          <Section key={title + index} sub-padding vertical bigger-text>
            <ReactMarkdown
              source={title}
              renderers={{
                paragraph: Text,
                linkReference: Link
              }}
            />
            <ReactMarkdown
              source={body}
              renderers={{
                link: Link,
                image: Image
              }}
            />
          </Section>
        ))}
      </Section>
    </Section>
  );
};
export default ListJobs;
