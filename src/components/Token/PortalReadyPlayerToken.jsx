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
            <InPortal node={node}>
                <PlayerToken {...token} portalNode={node} />
            </InPortal>
            {inHand && <OutPortal node={node} rotation={0} />}
        </>
    );
}
