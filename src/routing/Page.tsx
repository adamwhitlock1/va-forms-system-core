import React, { useContext, useEffect } from 'react';
import { Form, FormikContextType, useFormikContext } from 'formik';
import { useNavigate, To, useSearchParams } from 'react-router-dom';
import { IFormData, PageProps } from './types';
import { RouterContext } from './RouterContext';

const validatePage = (
  children: JSX.Element[],
  state: FormikContextType<unknown>
): boolean => {
  const values = state.values as IFormData;
  const touchedValues = state.touched as IFormData;
  const childFields = getChildFieldNames(children);
  console.log(childFields);

  console.log('-------------NEED SOME SPACE----------------');
  console.log(state);

  childFields.map((value) => {
    if (value.split('.').length > 1) {
      console.log('Complex Object');
      console.log(values[`${value.split('.')[0]}`]);
      touchedValues[`${value.split('.')[0]}`] =
        values[`${value.split('.')[0]}`];
    } else {
      console.log('Simple Object');
      console.log(values[`${value}`]);
      touchedValues[`${value}`] = values[`${value}`];
    }
  });

  state.touched = touchedValues;

  return false;
};

const getChildFieldNames = (
  children: JSX.Element[],
  childFieldNames: string[] = []
): string[] => {
  if (children.length > 0) {
    if (typeof children === 'object') {
      children.map((childField) => {
        if (childField.props?.name) {
          childFieldNames.push(childField.props.name);
        }

        if (childField.props?.children) {
          getChildFieldNames(childField.props?.children, childFieldNames);
        }
      });
    }
  }

  return childFieldNames;
};

/**
 * Renders the page contents
 *
 * @beta
 */
export default function Page(props: PageProps): JSX.Element {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editPage = searchParams.get('edit');
  const sourceAnchor = searchParams.get('source');

  const { nextRoute, previousRoute } = useContext(RouterContext);
  const state = useFormikContext();

  useEffect(() => {
    console.log(state);
    // if(state.errors !== {}){
    //   console.log(state.errors);
    // }
    // else{
    //   console.log("STATE.ERRORS HAVE BEEN CLEARED")
    // }
  });

  return (
    <div>
      <h3>{props.title}</h3>
      <Form>
        {props.children}

        {editPage && (
          <div>
            <button
              onClick={(event) => {
                event.preventDefault();
                navigate(
                  `/review-and-submit${
                    sourceAnchor ? `#${sourceAnchor}` : ''
                  }` as To
                );
              }}
              className="btn next"
            >
              Back to Review page
            </button>
          </div>
        )}
        {previousRoute && (
          <button
            className="btn usa-button-secondary prev"
            onClick={() => {
              navigate(previousRoute as To);
            }}
          >
            <i className="fas fa-angle-double-left"></i> Previous
          </button>
        )}

        {nextRoute && (
          // IF THIS BUTTON DOES NOT ACT AS A SUBMISSION, THE FORMIK
          // AUTOMATIC VALIDATION WILL NOT TRIGGER BECAUSE THE FIELDS
          // ARE NOT BEING TOUCHED.
          // type="button"  THIS WILL NOT SET ALL FIELDS TO TOUCHED
          <button
            className="btn usa-button-primary next"
            type="submit" // IF YOU DON'T HAVE THIS, IT WILL DEFAULT TO 'submit' ANYWAY
            onClick={(event) => {
              event.preventDefault(); // THIS ALSO PREVENTS FEILDS FROM BEING SET TO TOUCHED

              const isValid = validatePage(
                props.children as JSX.Element[],
                state
              );

              if (isValid) {
                navigate(nextRoute as To);
              }
            }}
          >
            Next <i className="fas fa-angle-double-right"></i>
          </button>
        )}
      </Form>
    </div>
  );
}
