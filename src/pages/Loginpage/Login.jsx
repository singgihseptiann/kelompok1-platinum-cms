import React, { useState } from "react";
import { useDispatch } from "react-redux";
import loginAssets from "../../assets/login.png";
import "../../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { registerAuth } from "../../store/Auth";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    setLoad(true);
    try {
      const res = await axios.post("https://api-car-rental.binaracademy.org/admin/auth/login", {
        email: form.email,
        password: form.password,
      });

      if (res.status === 201) {
        const { access_token, role } = res.data;

        if (role !== "Admin") {
          setLoad(false);
          setError("Anda tidak memiliki izin untuk masuk.");
          setTimeout(() => {
            setError("");
          }, 2500);
          return;
        }

        setSuccess("Berhasil Login!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        dispatch(registerAuth({ access_token, role }));
        localStorage.setItem("token", access_token);
      }
    } catch (error) {
      setError("Email atau password yang anda masukkan salah atau Anda tidak memiliki izin untuk masuk.");
      setTimeout(() => {
        setError("");
      }, 2500);
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-left">
          <img src={loginAssets} alt="" />
        </div>

        <div className="login-right">
          <div className="login-logo"></div>
          <h1>Welcome, Admin BCR</h1>

          <div className="login-input">
            <div className="email">
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" placeholder="Example: johndee@gmail.com" name="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="password">
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" placeholder="6+ characters" name="password" value={form.password} onChange={handleChange} />
            </div>
            <button disabled={load} onClick={handleSubmit}>
              {load ? "Loading..." : "Sign In"}
            </button>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
