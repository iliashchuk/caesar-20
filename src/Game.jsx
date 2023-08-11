import { Location } from './components/Location';
import { Map } from './components/Map';
import { SizingContext, SizingProvider } from './context';
import locations from './static/locations.json';
import styles from './Game.module.scss'

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
        </SizingProvider>
    );
}

export default Game;
