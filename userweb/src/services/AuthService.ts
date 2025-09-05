import {UserForm} from "../types/Auth";


export  const Login = (user: UserForm) => {

    const response = fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    console.log(response);
    return response;
}

export const Register = (user: UserForm) => {
    const response = fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    console.log(response);
    return response;
}
