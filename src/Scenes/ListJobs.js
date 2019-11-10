import React from "react";
import PropTypes from "prop-types";
import { Box, Text, Link, Image } from "../Components";

const ReactMarkdown = require("react-markdown");

const ListJobs = ({ filter, posts }) => {
  return (
    <Box full-flex flow justify-center>
      <Box style={{ flex: 0.8 }} vertical>
        {(
          (filter &&
            posts.filter(
              ({ title }) =>
                title.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            )) ||
          posts
        ).map(({ body, title }, index) => (
          <Box key={title + index} sub-padding vertical bigger-text>
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
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default ListJobs;
