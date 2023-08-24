import { createContext, useState } from 'react';

import locations from '../static/locations.json';

const SizingContext = createContext();

function SizingProvider({ children }) {
    const locationRelativeSize = locations.size;
    const [scale, setScale] = useState(0);
    const locationRadius = locationRelativeSize * scale.width;
    const locationSize = locationRadius * 2;

    function getScaledPosition({ x, y }) {
        return { x: x * scale.width, y: y * scale.height };
    }

    function getPositionOffsetByTokenRadius({ x, y }) {
        return { x: x - locationRadius, y: y - locationRadius };
    }

    return (
        <SizingContext.Provider
            value={{
                scale,
                locationSize,
                locationRadius,
                setScale,
                getScaledPosition,
                getPositionOffsetByTokenRadius,
            }}
        >
            {children}
        </SizingContext.Provider>
    );
}

export { SizingContext, SizingProvider };
