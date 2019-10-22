import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Section, Text, Input } from "../Components";
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
    <Section full justify-center flow>
      <Section flex={0.6} style={{ height: "100%" }} normal-padding vertical>
        <Section small-padding horizontal>
          <Text giant-text>
            Preencha os campos até obterem{" "}
            <Text TagType="span" link-foreground>
              essa coloração
            </Text>
          </Text>
        </Section>
        {fields.map(({ name, title, length, validate, transform }) => {
          const valid = validate({ string: form[name], length });
          return (
            <Section sub-padding sub-margin monumental-round normal-shadow>
              <Input
                giant-text
                value={form[name]}
                link-foreground={valid}
                italic-font={!valid}
                disabled-foreground={!valid}
                onChange={inputEvent(text => {
                  setForm({
                    ...form,
                    [name]: (transform && transform(text)) || text
                  });
                })}
              >
                {title}
              </Input>
            </Section>
          );
        })}
        <Section
          disabled-background={!allValid}
          normal-shadow={allValid}
          link-background={allValid}
          sub-padding
          sub-margin
          monumental-round
          pointer-cursor
          pressOut={() => allValid && submit({ ...form, callback: refresh })}
        >
          <Text giant-text secondary-foreground>
            Submeter
          </Text>
        </Section>
        <Section normal-padding />
      </Section>
    </Section>
  );
};
export default SubmitJob;
