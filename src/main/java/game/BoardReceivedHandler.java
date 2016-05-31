package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import game.utils.ConversionUtil;
import game.utils.Verifications;

import java.util.List;

public class BoardReceivedHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        GameExtension gameExt = (GameExtension) getParentExtension();
        trace("in BoardReceivedHandler. User = " + user);
        List<Integer> board = (List<Integer>) params.getIntArray("board");
        trace("board = " + board);
        boolean[][] booleans = ConversionUtil.booleanMatrixFromList(board);

        Board verifiedBoard = null;
        SFSObject resObj = new SFSObject();
        try {
            verifiedBoard = new Verifications(booleans).verifyMatrixIsValidBoard();
        } catch (IllegalArgumentException e) {
            resObj.putBool("boardCorrect", false);
            trace("received board is incorrect!");
        }
        if (verifiedBoard != null) {
            trace("received board is correct");

            user.setProperty("board", verifiedBoard);
            resObj.putBool("boardCorrect", true);
        }

        send("boardCheckResult", resObj, user);
    }
}
