package game.model;

import java.util.ArrayList;
import java.util.List;

import static game.utils.Verifications.correctCoordinates;

public class BoardFactory {
    private boolean[][] matrix;
    private boolean[][] seen;
    private Board board = new Board();

    public Board newEmptyBoard() {
        return new Board();
    }

    public Board boardFromMatrix(boolean[][] matrix) {
        if (matrix.length != 10 || matrix[0].length != 10) {
            throw new IllegalArgumentException();
        }
        this.matrix = matrix;
        seen = new boolean[10][10];

        return verifyMatrixIsValidBoard();
    }


    private Board verifyMatrixIsValidBoard() {
        for (int x = 0; x < 10; x++) {
            for (int y = 0; y < 10; y++) {
                boolean isShip = matrix[x][y];
                boolean alreadySeen = seen[x][y];
                if (isShip && !alreadySeen) {
                    seen[x][y] = true;
                    boolean isVertical = isVertical(x, y);
                    if (isVertical) {
                        explore(x, y, true);
                    } else {
                        explore(x, y, false);
                    }
                }
            }
        }
        if (!board.isComplete()) {
            throw new IllegalArgumentException();
        }
        return board;
    }

    private void explore(int x, int y, boolean exploreBottom) {
        List<Cell> cells = new ArrayList<>();
        cells.add(board.getCellAt(x, y));
        while (true) {
            if (exploreBottom) {
                x++;
            } else {
                y++;
            }
            if (correctCoordinates(x, y)) {
                boolean isShip = matrix[x][y];
                if (isShip) {
                    seen[x][y] = true;
                    cells.add(board.getCellAt(x, y));
                } else {
                    break;
                }
            } else {
                break;
            }
        }
        board.addShip(new Ship(cells));
    }

    private boolean isVertical(int x, int y) {
        boolean right = false;
        boolean bottom = false;
        if (correctCoordinates(x, y + 1)) {
            right = matrix[x][y + 1];
        }
        if (correctCoordinates(x + 1, y)) {
            bottom = matrix[x + 1][y];
        }
        if (right && bottom) {
            throw new IllegalArgumentException();
        }
        return bottom;
    }
}
