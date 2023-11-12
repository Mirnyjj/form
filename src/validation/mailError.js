
export const EmailValidation = ({email, setEmailValid}) => {
let newError = null;
setEmailValid()
if (email === '') {
    newError = false;
    console.log(newError, email)
} else if (!/^[\w]+@[\w-]+\.[a-z]{2,4}$/.test(email)) {
  newError = 'Невырый email. Допустимый формат почты: example@exam.ru';
} else if (email.length > 20) {
  newError = 'Невырый email. Должно быть не больше 20 символов';
} else if (newError !== false && email.length !== 0) {
  console.log(newError, email)
  setEmailValid(true)
}
return newError;
}