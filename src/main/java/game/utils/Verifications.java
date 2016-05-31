package game.utils;

import game.Board;
import game.Cell;

import java.util.ArrayList;
import java.util.List;

public class Verifications {
    private final boolean[][] matrix;
    private final boolean[][] seen = new boolean[10][10];
    private Board board = new Board();

    public Verifications(boolean[][] matrix) {
        this.matrix = matrix;
    }

    private static boolean correctCoordinates(int x, int y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    private static void verifyCorners(int[][] matrix, int x, int y) {
        boolean correct = true;
        if (correctCoordinates(x - 1, y - 1) && matrix[x - 1][y - 1] == 1) {
            correct = false;
        }
        if (correctCoordinates(x + 1, y + 1) && matrix[x + 1][y + 1] == 1) {
            correct = false;
        }
        if (correctCoordinates(x - 1, y + 1) && matrix[x - 1][y + 1] == 1) {
            correct = false;
        }
        if (correctCoordinates(x + 1, y - 1) && matrix[x + 1][y - 1] == 1) {
            correct = false;
        }
        if (!correct) {
            throw new IllegalArgumentException("x or y is incorrect. x = " + x + ", y = " + y);
        }
    }

    public Board verifyMatrixIsValidBoard() {
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
        board.addShip(cells);
    }

    public boolean isVertical(int x, int y) {
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

    public Board getBoard() {
        return board;
    }
}
