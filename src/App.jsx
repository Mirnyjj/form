import { useEffect, useRef, useState } from 'react';
import './App.css'
import { useStore } from './hooks/useStore';
import { EmailValidation } from './validation/mailError';
import { PasswordCheck } from './validation/passwordCheck';
import { PasswordValidation } from './validation/passwordError';

const sendFormData = (formData) => {
  console.log(formData);
}

function App() {
  const { getState, updateState } = useStore();
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const submitButtonRef = useRef(null);
  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData(getState());
  }


  const { email, checkPassword, password } = getState();
  const onChange = ({ target }) => {
    updateState(target.name, target.value);
  }
  console.log(emailValid, passwordValid)
  useEffect(() => {
    if (emailValid || passwordValid || password === checkPassword) {
      submitButtonRef.current.focus();
      console.log(emailValid, passwordValid)
    } [emailValid, passwordValid, checkPassword]
  });

  return (
    <div className='header'>
      <form onSubmit={onSubmit}>
        <div className='error'>
          <div>
            <EmailValidation
              email={email}
              setEmailValid={setEmailValid} />
          </div>
          <div>
            <PasswordValidation
              password={password}
              setPasswordValid={setPasswordValid} />
          </div>
          <div>
            <PasswordCheck
              password={password}
              checkPassword={checkPassword} />
          </div>
        </div>
        <input
          name='email'
          type='email'
          placeholder='Введите почту'
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Введите пароль'
          value={password}
          onChange={onChange}
        />
        <input
          name='checkPassword'
          type='password'
          placeholder='Повторите пароль'
          value={checkPassword}
          onChange={onChange}
        />
        <button
          type='submit'
          disabled={!emailValid || !passwordValid || password !== checkPassword}
          ref={submitButtonRef}>
          Зарегистрироваться
        </button>
      </form>

    </div>
  )
}

export default App
