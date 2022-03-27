import React, {FC} from 'react';
import {IContextMenu, IMessage} from '../../types/types'
import {isSelf} from '../../utils/general.utils';

interface IContextMenuProps {
    contextMenu: IContextMenu;
    msg: IMessage;
    type: 'personal' | 'group';
}

const ContextMenu: FC<IContextMenuProps> = ({contextMenu, msg, type}) => {

    const showContextMenu = () => type === 'group'
        && isSelf(msg)

    if (!contextMenu ||
        contextMenu.messageId !== msg.messageId) return <></>

    return (
        <div
            className="context_menu"
            style={{position: 'absolute', top: contextMenu.x + '', left: contextMenu.y + ''}}
            onClick={e => e.stopPropagation()}
        >
            Menu
            <ul>
                {
                    showContextMenu()
                    && msg.seenBy
                    && msg.seenBy.map(member => (
                        <li key={member}>
                            {member}
                        </li>
                    ))
                }
            </ul>
        </div>

    );
};

export default ContextMenu;
