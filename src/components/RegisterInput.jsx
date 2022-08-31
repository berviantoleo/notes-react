import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput();
  const [email, onEmailChange] = useInput();
  const [password, onPasswordChange] = useInput();

  function onSubmitHandler(event) {
    event.preventDefault();

    register({
      name,
      email,
      password,
    });
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <form onSubmit={onSubmitHandler} className="register-input">
            <div className="field">
              <label className="label">
                {locale === 'id' ? 'Nama' : 'Name'}
              </label>
              <input
                className="input"
                type="text"
                placeholder={locale === 'id' ? 'Nama' : 'Name'}
                value={name}
                onChange={onNameChange}
              />
            </div>
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
              <label className="label">
                {locale === 'id' ? 'Kata Sandi' : 'Password'}
              </label>
              <input
                className="input"
                type="password"
                placeholder={locale === 'id' ? 'Kata Sandi' : 'Password'}
                autoComplete="current-password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>
            <button className="button is-primary">
              {locale === 'id' ? 'Daftar' : 'Register'}
            </button>
          </form>
        );
      }}
    </LocaleConsumer>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
