import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Text, Input } from "../Components";
import {
  transformText,
  validateText,
  validateLink,
  transformTitle
} from "../validate";

const inputEvent = handler => ({ target }) => handler(target.value);

const fields = [
  {
    name: "title",
    title: "Título da vaga",
    length: 20,
    validate: validateText,
    transform: transformTitle
  },
  {
    name: "detail1",
    title: "Remuneração / Modalidade",
    length: 25,
    validate: validateText,
    transform: transformText
  },
  {
    name: "detail2",
    title: "Localização",
    length: 25,
    validate: validateText,
    transform: transformText
  },
  {
    name: "detail3",
    title: "Modalidade",
    length: 25,
    validate: validateText,
    transform: transformText
  },
  {
    name: "link1",
    title: "Link Empresa",
    length: 80,
    validate: validateLink
  },
  {
    name: "link2",
    title: "Link Challenge",
    length: 80,
    validate: validateLink
  },
  {
    name: "link3",
    title: "Link Contato",
    length: 80,
    validate: validateLink
  }
];

const SubmitJob = ({ submit, refresh }) => {
  const [form, setForm] = useState(
    Object.assign({}, ...fields.map(({ name }) => ({ [name]: "" })))
  );
  const [allValid, setAllValid] = useState(false);
  useEffect(() => {
    if (!fields.some(({ name }) => !name)) {
      setAllValid(
        fields.filter(({ name, validate, length }) =>
          validate({ string: form[name], length })
        ).length === fields.length
      );
    }
  }, [form]);
  return (
    <Box full-flex justify-center flow>
      <Box flex={0.6} style={{ height: "100%" }} normal-padding vertical>
        <Box small-padding horizontal>
          <Text giant-text>
            Preencha os campos até obterem{" "}
            <Text.Span link-foreground>essa coloração</Text.Span>
          </Text>
        </Box>
        {fields.map(({ name, title, length, validate, transform }) => {
          const valid = validate({ string: form[name], length });
          return (
            <Box sub-padding sub-margin monumental-radius normal-shadow>
              <Input
                giant-text
                value={form[name]}
                placeholder={title}
                link-foreground={valid}
                italic-font={!valid}
                disabled-foreground={!valid}
                onChange={inputEvent(text => {
                  setForm({
                    ...form,
                    [name]: (transform && transform(text)) || text
                  });
                })}
              />
            </Box>
          );
        })}
        <Box
          disabled-background={!allValid}
          normal-shadow={allValid}
          link-background={allValid}
          sub-padding
          sub-margin
          monumental-radius
          pointer-cursor
          pressOut={() => allValid && submit({ ...form, callback: refresh })}
        >
          <Text giant-text secondary-foreground>
            Submeter
          </Text>
        </Box>
        <Box normal-padding />
      </Box>
    </Box>
  );
};
export default SubmitJob;
