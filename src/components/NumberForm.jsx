import React, { useEffect, useContext } from 'react';
// import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
// import axios from 'axios';
import texts from '../data-configs/texts.json';
import codes from '../data-configs/countries.json';

import socketContext from '../contexts/socketContext.js';

const getCode = (countryName) => codes.countries.find((c) => c.name === countryName).code;


const NumberForm = () => {
  useEffect(() => document.getElementById('number').focus());
  // const dispatch = useDispatch();
  const api = useContext(socketContext);
  return (
    <div className="container-fluid p-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <h1 className="mb-4 text-center fw-normal">{texts.mainHeader}</h1>
          <Formik
            initialValues={{
              code: getCode('Russia'),
              number: '',
            }}
            validationSchema={yup.object({
              number: yup.string()
                .required(texts.required)
                .matches(/^\d+$/, texts.numbersOnly)
                .min(3, texts.count)
                .max(10, texts.count)
            })}
            onSubmit={ async ({ code, number }, { setSubmitting }) => {
              const numberWithCode = `${code}${number}`;
              const phoneData = { phone: numberWithCode}
              // const { data } = await axios.post('/phones', phoneData);
              // console.log(data);
              // dispatch(addNumber(data));
              try {
                api.addPhone(phoneData);
              } catch(err) {
                console.log(err.message);
              }
              setSubmitting(false);
            }}
          >
            {({
              errors,
              touched,
              isSubmitting,
            }) => (
              <Form>
                <div className="d-flex input-group">
                  <label htmlFor="code" className="form-label visually-hidden">{texts.code}</label>
                  <select id="code" name="code" className="btn w-25 text-center btn-secondary">
                    <option value="+7">{getCode('Russia')}</option>
                    <option value="+49">{getCode('Germany')}</option>
                    <option value="+996">{getCode('Kyrgyzstan')}</option>
                  </select>
                    <label htmlFor="number" className="form-label visually-hidden">{texts.phone}</label>
                    <Field
                      type="tel"
                      id="number"
                      name="number"
                      className={
                        errors.number && touched.number
                        ? 'form-control is-invalid'
                        : 'form-control'
                      }
                      placeholder={texts.placeholder}
                    />
                    <ErrorMessage name="number">
                      {(msg) => <div className="invalid-tooltip">{msg}</div>}
                    </ErrorMessage>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn btn-success mt-4 w-100">{texts.add}</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NumberForm;
