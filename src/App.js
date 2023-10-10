import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    mob: "",
    mail: "",
    age: "",
    gender: "",
    hobbies: [],
  });
  const [error, setError] = useState({
    fname: "",
    lname: "",
    mob: "",
    mail: "",
    age: "",
  });
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState(false);
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const resetData = () => {
    setData({
      fname: "",
      lname: "",
      mob: "",
      mail: "",
      age: "",
      gender: "",
      hobbies: [],
    });
    setError({
      fname: "",
      lname: "",
      mob: "",
      mail: "",
      age: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let flag = true;
    Object.keys(error).forEach((err) => {
      if (error[err] != "") flag = false;
      if (data[err] == "") flag = false;
    });
    setSuccess(flag);
    setAlert(true);
  };
  const handleChangeData = (val, field) => {
    let tempData = { ...data };
    let tempError = { ...error };
    if (field === "hobbies") {
      if (tempData[field].includes(val)) {
        tempData[field].splice(tempData[field].indexOf(val), 1);
      } else {
        tempData[field].push(val);
      }
    } else tempData[field] = val;
    if (field === "fname") {
      if (val === "") {
        tempError[field] = "Field is empty!";
      } else {
        tempError[field] = "";
      }
    } else if (field === "lname") {
      if (val === "") {
        tempError[field] = "Field is empty!";
      } else {
        tempError[field] = "";
      }
    } else if (field === "mob") {
      if (val === "") {
        tempError[field] = "Field is empty!";
      } else if (Number(val) < 1000000000 || Number(val) > 9999999999) {
        tempError[field] = "Invalid mobile number!";
      } else {
        tempError[field] = "";
      }
    } else if (field === "mail") {
      if (val === "") {
        tempError[field] = "Field is empty!";
      } else if (!emailPattern.test(val)) {
        tempError[field] = "Invalid mail!";
      } else {
        tempError[field] = "";
      }
    } else if (field === "age") {
      if (Number(val) < 0 || Number(val) > 150) {
        tempError[field] = "Invalid age!";
      } else tempError[field] = "";
    }
    setData(tempData);
    setError(tempError);
  };
  return (
    <div class="container">
      {alert && (
        <div className="alert-section">
          {!success ? (
            <div className="alert error-alert row row--alignCenter row--justifyCenter">
              Error! Please enter valid data.
              <span className="alert-close" onClick={() => setAlert(false)}>
                X
              </span>
            </div>
          ) : (
            <div className="alert success-alert row row--alignCenter row--justifyCenter">
              Success! <strong>{" " + data["fname"] + ", "}</strong> your data has been saved
              successfully.
              <span className="alert-close" onClick={() => setAlert(false)}>
                X
              </span>
            </div>
          )}
        </div>
      )}
      <form>
        <div className="card ">
          <div className="card__header">
            <div className="card__header-title">
              <h3>Admission Form</h3>
            </div>
          </div>
          <div className="card__body">
            <div className="form-item form-item--vertical">
              <div className="form-item__child form-item__child--required">
                <div className="form-item--horizontal form-item--horizontal-Equal">
                  <div className="form-item__child">
                    <label for="fname">First Name</label>
                    <input
                      type="text"
                      id="fname"
                      placeholder="Jon"
                      onChange={(e) => {
                        handleChangeData(e.target.value, "fname");
                      }}
                    />
                    <span className="error">{error["fname"]}</span>
                  </div>
                  <div className="form-item__child form-item__child--required">
                    <label for="lname">Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      placeholder="Doe"
                      onChange={(e) => {
                        handleChangeData(e.target.value, "lname");
                      }}
                    />
                    <span className="error">{error["lname"]}</span>
                  </div>
                </div>
              </div>
              <div className="form-item__child form-item__child--required">
                <label for="mobileNumber">Mobile Number</label>
                <div className="form-item__child--connected">
                  <select name="" id="">
                    <option value="+91">+91</option>
                    <option disabled value="+92">
                      +92
                    </option>
                  </select>
                  <input
                    type="text"
                    id="mobileNumber"
                    placeholder="XXXXXXXXXX"
                    onChange={(e) => {
                      handleChangeData(e.target.value, "mob");
                    }}
                  />
                </div>
                <span className="error">{error["mob"]}</span>
              </div>
              <div className="form-item__child form-item__child--required">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="jondoe@gmail.com"
                  onChange={(e) => {
                    handleChangeData(e.target.value, "mail");
                  }}
                />
                <span className="error">{error["mail"]}</span>
              </div>
              <div className="form-item__child form-item__child--required">
                <label for="age">Age</label>
                <input
                  type="number"
                  id="age"
                  onChange={(e) => {
                    handleChangeData(e.target.value, "age");
                  }}
                />
                <span className="error">{error["age"]}</span>
              </div>
              <div className="form-item__child ">
                <label>Gender</label>
                <div className="form-item__inner">
                  <input
                    checked={data["gender"] == "Male"}
                    type="radio"
                    id="male"
                    name="Gender"
                    onChange={(e) => {
                      handleChangeData("Male", "gender");
                    }}
                  />
                  <label for="male">Male</label>
                </div>
                <div className="form-item__inner">
                  <input
                    checked={data["gender"] == "Female"}
                    type="radio"
                    id="Female"
                    name="Gender"
                    onChange={(e) => {
                      handleChangeData("Female", "gender");
                    }}
                  />
                  <label for="Female">Female</label>
                </div>
                <div className="form-item__inner">
                  <input
                    checked={data["gender"] == "Other"}
                    type="radio"
                    id="Other"
                    name="Gender"
                    onChange={(e) => {
                      handleChangeData("Other", "gender");
                    }}
                  />
                  <label for="Other">Other</label>
                </div>
                <span className="error">{error["gender"]}</span>
              </div>
              <div className="form-item__child">
                <label>Intrests and Hobbies</label>
                <div className="form-item--horizontal">
                  <div className="form-item__inner">
                    <input
                      onChange={(e) => {
                        handleChangeData("Cricket", "hobbies");
                      }}
                      checked={data["hobbies"].includes("Cricket")}
                      type="checkbox"
                      id="Cricket"
                    />
                    <label for="Cricket">Cricket</label>
                  </div>
                  <div className="form-item__inner">
                    <input
                      onChange={(e) => {
                        handleChangeData("Reading", "hobbies");
                      }}
                      type="checkbox"
                      id="Reading"
                      checked={data["hobbies"].includes("Reading")}
                    />
                    <label for="Reading">Reading</label>
                  </div>
                  <div className="form-item__inner">
                    <input
                      onChange={(e) => {
                        handleChangeData("Music", "hobbies");
                      }}
                      type="checkbox"
                      id="Music"
                      checked={data["hobbies"].includes("Music")}
                    />
                    <label for="Music">Music</label>
                  </div>
                </div>
                <span className="error">{error["hobbies"]}</span>
              </div>
            </div>
          </div>
          <div className="card__footer">
            <div className="row row--justifyEnd row--gapMedium">
              <div className="row__item">
                <button className="btn btn--danger" type="reset" onChange={resetData}>
                  Reset
                </button>
              </div>
              <div className="row__item">
                <button className="btn btn--primary" onClick={(e) => handleSubmit(e)}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
