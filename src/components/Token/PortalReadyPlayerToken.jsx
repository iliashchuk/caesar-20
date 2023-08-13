import { useMemo } from 'react';
import {
    InPortal,
    OutPortal,
    createHtmlPortalNode,
} from 'react-reverse-portal';

import { PlayerToken } from './PlayerToken';

export function PortalReadyPlayerToken({ token, ihHand }) {
    const node = useMemo(() => createHtmlPortalNode(), []);

    return (
        <>
            {ihHand && <OutPortal node={node} />}
            <InPortal node={node}>
                <PlayerToken {...token} portalNode={node} />
            </InPortal>
        </>
    );
}
