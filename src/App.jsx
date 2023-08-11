import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './App.module.scss';
import image from './assets/map.png';
import locations from './static/locations.json';

function App() {
    const imageRef = useRef(null);
    const [imageSize, setImageSize] = useState();

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.addEventListener('load', (e) => {
                const { offsetWidth, offsetHeight } = e.target;
                setImageSize({ width: offsetWidth, height: offsetHeight });
            });
        }
    }, [imageRef]);

    return (
        <div className="positioner">
            <div className="container">
                <img ref={imageRef} src={image} alt="Map" className="map" />
                {imageSize &&
                    locations.map((location) => {
                        // const x = location.x * imageSize.width;
                        // const y = location.y * imageSize.height;
                        const size = location.size * imageSize.width * 2;
                        const name = location.name;

                        const style = {
                            width: size,
                            height: size,
                            transform: `translate(-${size / 2}px,-${
                                size / 2
                            }px`,
                            left: location.x * 100 + '%',
                            top: location.y * 100 + '%',
                        };

                        return (
                            <div
                                onClick={() => {
                                    alert(location.name);
                                }}
                                key={name}
                                className="location"
                                style={style}
                            ></div>
                        );
                    })}
            </div>
        </div>
    );
}

export default App;
