import { createContext, useState } from 'react';

const SizingContext = createContext();

function SizingProvider({ children }) {
    const [scale, setScale] = useState(0);

    return (
        <SizingContext.Provider value={{ scale, setScale }}>
            {children}
        </SizingContext.Provider>
    );
}

export { SizingContext, SizingProvider };
