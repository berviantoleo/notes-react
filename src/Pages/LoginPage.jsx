import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="section">
            <div className="box">
              <h2 className="title">
                {locale === 'id'
                  ? 'Silakan masuk untuk melanjutkan ...'
                  : 'Please Login ...'}
              </h2>
              <LoginInput login={onLogin} />
              <p>
                {locale === 'id'
                  ? 'Belum punya akun? '
                  : `Don't have an account? `}
                <Link to="/register">
                  {locale === 'id' ? 'Daftar di sini.' : 'Register here.'}
                </Link>
              </p>
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
