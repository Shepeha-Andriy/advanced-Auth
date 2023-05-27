import React, {FC, useContext, useEffect, useState} from 'react';
import LoginForm from "./components/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {IUser} from "./models/IUser";
import UserService from "./services/UserService";

const App: FC = () => {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [store])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Loading...</div>
    }

    if (!store.isAuth) {
        return (
            <div>
                <LoginForm/>
            </div>
        );
    }

    return (
        <div className='app'>
            <h2>{store.isAuth ? `User authorized ${store.user.email}` : 'LOG IN'}</h2>
            <h2>{store.user.isActivated ? 'Account confirmed by mail' : 'YOU NEED CONFIRM ACCOUNT!!!!'}</h2>
            <div className='buttons'>
                <button onClick={() => store.logout()}>Log out</button>
                <button onClick={getUsers}>Get users</button>
            </div>
            
            <div className='users'>
                {users.map(user =>
                    <div className='user' key={user.email}>{user.email}</div>
                )}
            </div>
        </div>
    );
};

export default observer(App);
