package game;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.data.SFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

import java.util.ArrayList;
import java.util.List;

public class AddShipCellHandler extends BaseClientRequestHandler {
    @Override
    public void handleClientRequest(User user, ISFSObject params) {
        trace("in AddShipCellHandler");
        trace("user = " + user);
        trace("params = " + params);
        int cellId = Integer.valueOf(params.getUtfString("cellId"));
        trace("cellId = " + cellId);

        ISFSObject resObj = new SFSObject();
        GameExtension gameExt = (GameExtension) getParentExtension();

        Board board = new Board("b");
        board.putHardCodedShips();
        resObj.putIntArray("board", intListFromMatrix(board));

        send("board", resObj, user);
    }

    private byte[] getByteArrayFromMatrix(Board boardForUserTurn) {
        byte[] result = new byte[100];
        Cell[][] matrix = boardForUserTurn.getMatrix();
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                result[i * 10 + j] = cellStateToByte(matrix[i][j].getState());
            }
        }
        return result;
    }

    private List<Integer> intListFromMatrix(Board board) {
        List<Integer> result = new ArrayList<>();
        Cell[][] matrix = board.getMatrix();
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                result.add((int) cellStateToByte(matrix[i][j].getState()));
            }
        }
        return result;
    }

    private byte cellStateToByte(CellState state) {
        byte result = 0;
        switch (state) {
            case EMPTY:
                result = 0;
                break;
            case SHIP:
                result = 1;
                break;
            case MISS:
                result = -1;
                break;
            case HIT:
                result = 2;
                break;
        }
        return result;
    }
}
