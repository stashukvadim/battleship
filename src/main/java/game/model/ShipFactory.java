package game.model;

import java.util.ArrayList;
import java.util.List;

import static game.utils.VerifyService.verifyCoordinatesCorrect;

public class ShipFactory {
    public static Ship shipFor(int x, int y, boolean vertical, int size, Board board) {
        List<Cell> shipCells = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            verifyCoordinatesCorrect(x, y);
            Cell cell = board.getCellAt(x, y);
            shipCells.add(cell);
            if (vertical) {
                x++;
            } else {
                y++;
            }
        }
        return new Ship(shipCells);
    }

    public static Ship shipFor(int x, int y, int size, Board board) {
        return shipFor(x, y, false, size, board);
    }
}
