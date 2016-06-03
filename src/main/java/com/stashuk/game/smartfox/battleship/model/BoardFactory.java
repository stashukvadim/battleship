package com.stashuk.game.smartfox.battleship.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static com.stashuk.game.smartfox.battleship.utils.Verifications.correctCoordinates;

public class BoardFactory {
    private boolean[][] matrix = new boolean[10][10];
    private boolean[][] seen;
    private Board board = new Board();

    public Board newEmptyBoard() {
        return new Board();
    }

    public Board boardFromMatrix(boolean[][] matrix) {
        if (matrix.length != 10 || matrix[0].length != 10) {
            throw new IllegalArgumentException();
        }
        for (int i = 0; i < 10; i++) {
            System.arraycopy(matrix[i], 0, this.matrix[i], 0, matrix.length);
        }
        this.matrix = matrix;
        seen = new boolean[10][10];

        return verifyMatrixIsValidBoard();
    }

    public Board newRandomBoard() {
        board = new Board();
        for (int i = 4; i >= 1; i--) {
            for (int j = 5 - i; j > 0; j--) {
                putRandomShip(i);
            }
        }
        return board;
    }

    private void putRandomShip(int shipSize) {
        Random random = new Random();
        boolean shipSet = false;
        while (!shipSet) {
            boolean isVertical = random.nextBoolean();
            int xMaxRand = isVertical ? 11 - shipSize : 10;
            int yMaxRand = isVertical ? 10 : 11 - shipSize;
            try {
                Ship ship = ShipFactory
                        .shipFor(random.nextInt(xMaxRand), random.nextInt(yMaxRand), isVertical, shipSize, board);
                boolean added = board.addShip(ship);
                if (added) {
                    shipSet = true;
                }
            } catch (IllegalArgumentException | CellOutOfBoundsException ignored) {
            }
        }
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
