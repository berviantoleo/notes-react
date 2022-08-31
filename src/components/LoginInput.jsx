import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function onSubmitHandler(event) {
    event.preventDefault();

    login({
      email,
      password,
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className="login-input">
      <div className="field">
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
        />
      </div>
      <div className="field">
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={onPasswordChange}
        />
      </div>
      <button className="button is-primary">Masuk</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
