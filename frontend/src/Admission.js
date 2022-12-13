import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Admission.css";
import { Redirect } from "react-router-dom";

function Admission() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [age, setAge] = useState(null);
  const [batch, setBatch] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setName(null);
    setEmail(null);
    setPhone(null);
    setAddress(null);
    setCountry(null);
    setState(null);
    setCity(null);
    setAge(null);
    setBatch(null);
  };

  const isInvalid = (data) => {
    const phone = data.phone;
    const age = parseInt(data.age);
    if (age < 18 || age > 65) {
      return true;
    }
    if (phone.length != 10) {
      return true;
    }
  };

  const completeEnrollment = (e) => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      city: city,
      state: state,
      country: country,
      batch: batch,
      age: age,
    };
    try {
      if (isInvalid(data)) {
        window.location.reload();
        resetState();
        throw "invalid details";
      }
      axios
        .post("http://localhost:8000/EnrollAndPayment", data)
        .then((response) => {
          setSuccess(true);
          {
            alert("Enrollment and payment successful");
            window.location.reload();
          }
          resetState();
        })
        .catch((error) => {
          {
            alert("Registration Failed");
            window.location.reload();
          }
          console.log(error.toJSON());
          resetState();
        });
    } catch (error) {
      console.log("error occured");
      {
        alert("Enter valid credentials. Age must be between 18 to 65");
      }
      resetState();
    }
    console.log(data);
    if (e) e.preventDefault();
  };

  return (
    <div className="signup">
      <form
        className="signup_container"
        onSubmit={(e) => {
          completeEnrollment(e);
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Admission form
        </h1>

        <label className="signup_label" for="name">
          Name
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Name"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label className="signup_label" for="email">
          Email
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Email"
          name="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label className="signup_label" for="phone">
          Phone number
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Phone number"
          name="phone"
          required
          onChange={(e) => setPhone(e.target.value)}
        ></input>

        <label className="signup_label" for="age">
          Age
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Age"
          name="age"
          required
          onChange={(e) => setAge(e.target.value)}
        ></input>

        <label className="signup_label" for="address">
          Address
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter street number and locality"
          name="address"
          required
          onChange={(e) => setAddress(e.target.value)}
        ></input>

        <label className="signup_label" for="city">
          City
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter City"
          name="city"
          required
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <label className="signup_label" for="state">
          State
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter State"
          name="state"
          required
          onChange={(e) => setState(e.target.value)}
        ></input>

        <label className="signup_label" for="country">
          Country
        </label>
        <input
          className="signup_input"
          type="text"
          placeholder="Enter Country"
          name="country"
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>

        <label className="signup_label" for="Batch">
          Batch
        </label>
        <select
          className="batch_input"
          value={batch}
          onChange={(e) => {
            setBatch(e.target.value);
          }}
        >
          <option value="6-7 AM">6-7 AM</option>
          <option value="7-8 AM">7-8 AM</option>
          <option value="8-9 AM">8-9 AM</option>
          <option value="5-6 PM">5-6 PM</option>
        </select>

        <input
          type="submit"
          value="Enroll and Complete Payment"
          className="signup_btn"
        />
      </form>
    </div>
  );
}
export default Admission;
