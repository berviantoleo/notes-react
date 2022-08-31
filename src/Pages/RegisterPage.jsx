import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate('/');
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
                  ? 'Yuk, register di sini ...'
                  : 'Register here ...'}
              </h2>
              <RegisterInput register={onRegisterHandler} />
              <p>
                {locale === 'id' ? 'Kembali ke' : 'Back to'}{' '}
                <Link to="/">{locale === 'id' ? 'Masuk' : 'Login'}</Link>
              </p>
            </div>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
