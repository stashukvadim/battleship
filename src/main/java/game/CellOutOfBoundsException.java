package game;

public class CellOutOfBoundsException extends RuntimeException {
    public CellOutOfBoundsException(int x, int y) {
        super("x = " + x + " y = " + y);
    }
}
