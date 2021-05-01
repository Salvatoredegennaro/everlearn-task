import React, { useEffect, useState } from "react";

const ContactForm = (props) => {
  const initialFieldValues = {
    firstName: "",
    lastName: "",
    email: "",
    score: "",
  };


  
  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId === "")
      setValues({
        ...initialFieldValues,
      })
    else
      setValues({
        ...props.learnerObjects[props.currentId],
      });
  }, [props.currentId, props.learnerObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          placeholder="first name"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="last name"
            name="lastName"
            value={values.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div className="input-group-text">
            <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input
            className="form-control"
            placeholder="email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="score"
          name="score"
          value={values.score}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={props.currentId === '' ? 'Save' : 'Update'}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};



export default ContactForm;
