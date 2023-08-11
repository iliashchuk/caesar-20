import { createContext, useState } from 'react';

import locations from '../static/locations.json';

const SizingContext = createContext();

function SizingProvider({ children }) {
    const locationRelativeSize = locations[0].size;
    const [scale, setScale] = useState(0);
    const locationSize = locationRelativeSize * scale.width * 2;

    return (
        <SizingContext.Provider value={{ scale, setScale, locationSize }}>
            {children}
        </SizingContext.Provider>
    );
}

export { SizingContext, SizingProvider };
