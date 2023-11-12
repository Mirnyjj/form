export const PasswordValidation = ({password, setPasswordValid}) => {
    let newError = null;
    setPasswordValid()
    if (password === '') {
        newError = null;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
      newError = 'Неверный пароль. Пароль должен содержать цифры и латинские буквы верхнего и нижнего регистра без пробела';
    } else if (password.length > 10) {
      newError = 'Неверный пароль. Пароль должен быть не больше 10 символов';
    } else if (password.length < 6) {
      newError = 'Неверный пароль. Пароль должен быть не меньше 6 символов';
    } else if (newError === null && password !== '') {
      setPasswordValid(true);
    }
    return newError;
    }