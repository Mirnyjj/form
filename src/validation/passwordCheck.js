export const PasswordCheck = ({password, checkPassword}) => {
    let newError = null;
    if (checkPassword === '') {
        newError = null;
    } else if (password !== checkPassword) {
    newError = 'Введенные пароли не совпадают';
   } 
   return newError
}