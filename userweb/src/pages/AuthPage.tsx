import React from 'react';
import {QuestionField} from "../components/QuestionField";
import {User, UserForm} from "../types/Auth";
import {Login, Register} from "../services/AuthService";

type AuthPageProps = {
    isLogin?: boolean;
    onLogin: (user: User | null) => void;
};

export const AuthPage: React.FC<AuthPageProps> = ({ isLogin = true, onLogin }: AuthPageProps) => {

    const title = isLogin ? 'Login' : 'Register';

    const [email, setEmail] = React.useState('');

    const [password, setPassword] = React.useState('');


    const submit = async (e: React.FormEvent)=> {
        e.preventDefault();

        //login/register logic
        console.log('submitting', email, password);
        try {
            const form = {email, password} as UserForm;
            if (isLogin) {
                const res = await Login(form);
                if (!res.ok) throw new Error(`Login failed: ${res.status}`);
                const user = (await res.json()) as User;
                onLogin(user);
                console.log('login', user);
            } else {
                const res = await Register(form);
                if (!res.ok) throw new Error(`Register failed: ${res.status}`);
                // After successful registration, instruct parent to go to login
                onLogin(null);
                console.log('register success');
            }
        } catch (error) {
            console.log(error);
        }  finally {
            console.log('done');
        }
    }


    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="card w-full max-w-md">
                <h1 className="text-2xl font-semibold text-slate-800 mb-4">{title}</h1>
                <form onSubmit={submit} className="flex flex-col gap-y-4">
                    <QuestionField question="Email" placeholder="you@example.com" type="email" onChange={setEmail} />
                    <QuestionField question="Password" placeholder="••••••••" type="password" onChange={setPassword} />
                    <button type="submit" className="btn-primary w-full">{title}</button>
                </form>
            </div>
        </div>
    );
};

export default AuthPage;