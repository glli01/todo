import React from "react";
import bcrypt from "bcryptjs";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/user/actions/userActions";
import { Link } from "react-router-dom";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Link to={`/login/?email=${email}`}>
        <button
          onClick={() => {
            dispatch(getUser(email, password));
          }}
        >
          login
        </button>
      </Link>
    </div>
  );
};

export default LoginScreen;
