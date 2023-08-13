import { useMemo } from 'react';
import {
    InPortal,
    OutPortal,
    createHtmlPortalNode,
} from 'react-reverse-portal';

import { PlayerToken } from './PlayerToken';

export function PortalReadyPlayerToken({ token, inHand }) {
    const node = useMemo(() => createHtmlPortalNode(), []);

    return (
        <>
            {inHand && <OutPortal node={node} />}
            <InPortal node={node}>
                <PlayerToken {...token} portalNode={node} />
            </InPortal>
        </>
    );
}
