import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { db, auth } from "../firebase";
import "./HomePage.css";

const HomePage = () => {
  const history = useHistory();
  var [learnerObjects, setLearnerObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  const handleLogout = () => {
    auth.signOut();
    history.push("/");
  };

  useEffect(() => {
    db.child("learners").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setLearnerObjects({
          ...snapshot.val(),
        });
      else setLearnerObjects({});
    });
  }, []);

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
              List Learners
            </h1>

            <h3 style={{ color: "white" }}>
              Average total:{" "}
              {(
                Object.values(learnerObjects).reduce(
                  (a, b) => a + parseInt(b.score),
                  0
                ) / Object.values(learnerObjects).length
              ).toFixed(2)}
            </h3>

            <button
              style={{ backgroundColor: "#77acf1", width: "18%" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <table className="table table-borderless table-stripped">
              <thead className="thead-light">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>View/Edit</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(learnerObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{learnerObjects[id].firstName}</td>
                      <td>{learnerObjects[id].lastName}</td>

                      <td>
                        <Link to="/Contacts">
                          <button
                            className="btn text-primary"
                            // onClick={() => {
                            //   setCurrentId(id)
                            //   console.log(id)
                            // }}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
