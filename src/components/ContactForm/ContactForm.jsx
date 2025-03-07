import { useId } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";

import css from "./ContactForm.module.css";
import { nanoid } from "nanoid";
import * as Yup from "yup";

const CONTACT_FORM_INITIAL_VALUES = {
  name: "",
  number: "",
};

const CONTACT_FORM_VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm({ onAdd }) {
  const nameId = useId();
  const numberId = useId();
  const handleSubmit = (values, actions) => {
    onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={CONTACT_FORM_INITIAL_VALUES}
      validationSchema={CONTACT_FORM_VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      <Form className={css.ContactForm}>
        <div>
          <label htmlFor={nameId}>Name</label>
          <Field id={nameId} type="text" name="name" />
          <ErrorMessage
            className={css.ErrorMessage}
            name="name"
            component="span"
          />
        </div>
        <div>
          <label htmlFor={numberId}>Number</label>
          <Field id={numberId} type="text" name="number" />
          <ErrorMessage
            className={css.ErrorMessage}
            name="number"
            component="span"
          />
        </div>
        <button type="submit">Add task</button>
      </Form>
    </Formik>
  );
}
