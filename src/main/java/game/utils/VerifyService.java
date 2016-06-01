package game.utils;

import game.model.Cell;
import game.model.CellOutOfBoundsException;

import java.util.List;

public class VerifyService {
    public static boolean coordinateCorrect(int coordinate) {
        return coordinate < 10 && coordinate >= 0;
    }

    public static boolean coordinatesCorrect(int x, int y) {
        return coordinateCorrect(x) && coordinateCorrect(y);
    }

    public static void verifyCoordinatesCorrect(int x, int y) throws CellOutOfBoundsException {
        if (!coordinatesCorrect(x, y)) {
            throw new CellOutOfBoundsException(x, y);
        }
    }

    public static void verifyCellsCorrect(List<Cell> cells) throws IllegalArgumentException {
        for (Cell cell : cells) {
            if (!cell.isAvailable()) {
                throw new IllegalArgumentException("This cell is already occupied " + cell);
            }
        }
    }
}
