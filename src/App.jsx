
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import './App.css'
import { useEffect, useRef } from 'react';

const sendFormData = (formData) => {
  console.log(formData);
};

const fieldsSchema = yup.object()
  .shape({
    email: yup.string()
      .matches(/^[\w]+@[\w-]+\.[a-z]{2,4}$/, 'Невырый email. Допустимый формат почты: example@exam.ru')
      .max(20, 'Невырый email. Должно быть не больше 20 символов'),
    password: yup.string()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, 'Неверный пароль. Пароль должен содержать цифры и латинские буквы верхнего и нижнего регистра без пробела')
      .max(10, 'Неверный пароль. Пароль должен быть не больше 10 символов')
      .min(6, 'Неверный пароль. Пароль должен быть не меньше 6 символов'),
    checkPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Введенные пароли не совпадают')
  })

export const App = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      checkPassword: '',
    },
    resolver: yupResolver(fieldsSchema),
  });

  const emailError = errors.email?.message;
  const passwordError = errors.password?.message;
  const passwordCheckError = errors.checkPassword?.message;

  const submitButtonRef = useRef(null);

  useEffect(() => {
    if (!emailError && !passwordError && !passwordCheckError) {
      submitButtonRef.current.focus();
      console.log(emailError, passwordError, passwordCheckError)
    } [emailError, passwordError, passwordCheckError]
  });

  return (
    <div className='header'>
      <form onSubmit={handleSubmit(sendFormData)}>
        {emailError && <div className='error'>{emailError}</div>}
        {passwordError && <div className='error'>{passwordError}</div>}
        {passwordCheckError && <div className='error'>{passwordCheckError}</div>}
        <input
          name="email"
          placeholder='Введите почту'
          type="text"
          {...register('email')}
        />
        <input
          name='password'
          type='password'
          placeholder='Введите пароль'
          {...register('password')}
        />
        <input
          name='checkPassword'
          type='password'
          placeholder='Повторите пароль'
          {...register('checkPassword')}
        />
        <button ref={submitButtonRef} type="submit" disabled={!!emailError || !!passwordError}>Отправить</button>
      </form>
    </div>
  );
};


export default App
