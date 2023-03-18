import React, { useState } from "react";
import "./Userprofile.css";
function UserProfile() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Save the email and password to the server or local storage
  };

  const handleResetPassword = () => {
    // Reset the password logic here
  };

  return (
    <div className="user-profile">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleResetPassword}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default UserProfile;