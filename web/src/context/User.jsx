import { createContext, useEffect, useState } from 'react';
import { v4 as uuid4 } from 'uuid';

const User = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState('');
    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(storedUser);
        } else {
            const newUser = uuid4();
            setUser(newUser);
            localStorage.setItem('user', newUser);
        }
    }, []);

    return <User.Provider value={{ user }}>{children}</User.Provider>;
}

export { User, UserProvider };
