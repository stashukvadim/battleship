package game;

import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.exceptions.SFSException;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.smartfoxserver.v2.extensions.ExtensionLogLevel;

public class UserLeftHandler extends BaseServerEventHandler {
    @Override
    public void handleServerEvent(ISFSEvent isfsEvent) throws SFSException {
        trace(ExtensionLogLevel.WARN, "User left room!");
    }
}
