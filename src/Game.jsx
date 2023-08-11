import styles from './Game.module.scss';
import { Hand } from './components/Hand';
import { Location } from './components/Location';
import { Map } from './components/Map';
import { SizingContext, SizingProvider } from './context';
import locations from './static/locations.json';

function Game() {
    return (
        <SizingProvider>
            <div className={styles.container}>
                <Map />
                <SizingContext.Consumer>
                    {({ scale }) =>
                        scale &&
                        locations.map((location) => (
                            <Location key={location.name} location={location} />
                        ))
                    }
                </SizingContext.Consumer>
            </div>
            <Hand />
        </SizingProvider>
    );
}

export default Game;
