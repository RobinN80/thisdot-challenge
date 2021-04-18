

export const usersFiltered = () => users.filter(USER => {
    USER.login.toLowercase().includes(value.toLocaleLowerCase()? USER.login: null);
});