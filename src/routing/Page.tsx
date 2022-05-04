import React from 'react';
import { useFormikContext, Form } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { PageProps, IFormData } from './types';

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const { values, submitForm } = useFormikContext();
  const formValues = values as IFormData;
  let location = useLocation();
  let navigate = useNavigate();

  function getRoutes() {
    return [location.pathname];
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <Form>
        {props.children}
        <button
          className="btn"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
            navigate(`${props.nextPage}`);
          }}
        >
          {' '}
          Next
        </button>
      </Form>
    </div>
  );
}
