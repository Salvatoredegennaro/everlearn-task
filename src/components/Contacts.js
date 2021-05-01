/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */

import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import { db } from "../firebase";
import Arrow from "./1-2-arrow-png-image.png";
import { Link } from "react-router-dom";

const Contacts = () => {
  var [learnerObjects, setLearnerObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    db.child("learners").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setLearnerObjects({
          ...snapshot.val(),
        });
      else setLearnerObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    if (currentId === "")
      db.child("learners").push(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    else
      db.child(`learners/${currentId}`).set(obj, (err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
  };

  const onDelete = (key) => {
    if (window.confirm("are you sure you want to delete this operation?")) {
      db.child(`learners/${key}`).remove((err) => {
        if (err) console.log(err);
        else setCurrentId("");
      });
    }
  };

  return (
    <>
      <div style={{ background: "aliceblue" }}>
        <div
          style={{
            background:
              "radial-gradient( ellipse at left bottom, rgba(22, 24, 47, 1) 0%, rgba(38, 20, 72, 0.9) 59%, rgba(17, 27, 75, 0.9) 100% )",
          }}
          className="jumbotron jumbotron-fluid"
        >
          <div className="container">
            <h1 style={{ color: "white" }} className="display-4 text-center">
              Learner Details
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <ContactForm
              addOrEdit={addOrEdit}
              currentId={currentId}
              learnerObjects={learnerObjects}
            />
          </div>
          <div className="col-md-6">
            <table className="table table-borderless table-stripped">
              <thead className="thead-light">
                <tr>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>email</th>
                  <th>score</th>
                  <th>edit</th>
                </tr>
              </thead>

              <tbody>
                {Object.keys(learnerObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{learnerObjects[id].firstName}</td>
                      <td>{learnerObjects[id].lastName}</td>
                      <td>{learnerObjects[id].email}</td>
                      <td>{learnerObjects[id].score}</td>
                      <td>
                        <a
                          className="btn text-primary"
                          onClick={() => {
                            setCurrentId(id);
                          }}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </a>
                        <a
                          className="btn text-danger"
                          onClick={() => {
                            onDelete(id);
                          }}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Link to="/HomePage">
          <div>
            <img src={Arrow} alt="" style={{ height: "20px", width: "50px" }} />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Contacts;
