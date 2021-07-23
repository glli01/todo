import React from "react";
import { useState, useEffect } from "react";
const LoginScreen = () => {
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("password");
  return (
    <div>
      <div>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button>login</button>
    </div>
  );
};

export default LoginScreen;
