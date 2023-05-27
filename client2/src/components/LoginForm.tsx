import React, {FC, useContext, useState} from 'react';
import {Context} from "../index";
import { observer } from "mobx-react-lite";
import './index.scss'

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context);

    return (
        <>
            {/* <div>
                <input
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="text"
                    placeholder='Email'
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder='Password'
                />
                <button onClick={() => store.login(email, password)}>
                    Sing in
                </button>
                <button onClick={() => store.registration(email, password)}>
                    Sing up
                </button>
            </div> */}


            <div className="container">
                <h2>Authorization</h2>
                <input
                    type="text" className="email" placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                ></input>
                    <br/>
                <input type="text" className="pwd" placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                ></input>
                    <br/>
                    
                <button className="register" onClick={() => store.login(email, password)}>
                    <span>Sing in</span>
                </button>
                
                <button className="signin" onClick={() => store.registration(email, password)}>
                    <span>Sign up</span>
                </button>
            </div>
        </>
    );
};

export default observer(LoginForm);
