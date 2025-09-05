import React, {useState} from 'react';
import AuthPage from './pages/AuthPage';
import SurveyPage from './pages/SurveyPage';

import './App.css';
import {User} from "./types/Auth";

function App() {

    const [user, setUser] = useState<User | null>(null);
    const [view, setView] = useState<'login' | 'register' | 'survey'>('login');

    if(view === 'login' || view === 'register' || !user) {
        return (
            <div>
                <AuthPage
                    isLogin={view === 'login'}
                    onLogin={(u) => {
                        if (u) {
                            setUser(u);
                            setView('survey');
                        } else {
                            setView('login');
                        }
                    }}
                />
                <div className="flex justify-center mt-4">
                    { view === "login" ? "Don't have an account?" : "Have an Account?"}
                    <button className="ml-2" onClick={() => setView(view === 'login' ? 'register' : 'login')}>
                        <p className="text-blue">{view === "login" ? "Register" : "Sign in"}</p>
                    </button>
                </div>
            </div>
        );
    } else {
          return ( <div>
               <SurveyPage userId={user.user_id} />
               <div className="flex justify-center mt-4">
                   <button onClick={() => {
                       setView('login');
                       setUser(null);
                   }}>
                       Sign out
                   </button>
               </div>
           </div>);
    }
}

export default App;
