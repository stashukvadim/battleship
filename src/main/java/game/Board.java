package game;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static game.CellState.*;

public class Board {
    protected Cell[][] matrix;
    protected List<Ship> shipList = new ArrayList<>();

    public Board() {
        matrix = new Cell[10][10];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[i][j] = new Cell(i, j);
            }
        }
    }

    public static boolean coordinateCorrect(int coordinate) {
        return coordinate < 10 && coordinate >= 0;
    }

    private static boolean coordinatesCorrect(int x, int y) {
        return coordinateCorrect(x) && coordinateCorrect(y);
    }

    public static void verifyCoordinatesCorrect(int x, int y) throws CellOutOfBoundsException {
        if (!coordinatesCorrect(x, y)) {
            throw new CellOutOfBoundsException(x, y);
        }
    }

    private static void verifyCellsCorrect(List<Cell> cells) throws IllegalArgumentException {
        for (Cell cell : cells) {
            if (!cell.isAvailable()) {
                throw new IllegalArgumentException("This cell is already occupied " + cell);
            }
        }
    }

    public void addShip(List<Cell> cells) throws IllegalArgumentException {
        verifyCellsCorrect(cells);
        Ship ship = new Ship(cells);
        cells.forEach(e -> {
            e.setShip(ship);
            e.setUnavailable();
            e.setState(SHIP);
            shipList.add(ship);
        });
        getAdjacentCellsForShip(ship).forEach(Cell::setUnavailable);
    }

    public void addShip(int x, int y, boolean vertical, int size) {
        List<Cell> shipCells = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            verifyCoordinatesCorrect(x, y);
            Cell cell = getCellAt(x, y);
            shipCells.add(cell);
            if (vertical) {
                x++;
            } else {
                y++;
            }
        }
        addShip(shipCells);
    }

    public void addShip(int x, int y, int size) {
        addShip(x, y, false, size);
    }

    private Set<Cell> getAdjacentCellsForShip(Ship ship) {
        Set<Cell> adjacentShipCells = new HashSet<>();
        List<Cell> shipCells = ship.getCells();
        shipCells.forEach(e -> getAdjacentCellsForShipCell(e).forEach(adjacentShipCells::add));
        return adjacentShipCells;
    }

    protected void putHardCodedShips() {
        addShip(0, 0, 4);
        addShip(0, 5, 3);
        addShip(2, 0, true, 3);
        addShip(2, 2, 2);
        addShip(2, 5, 2);
        addShip(2, 8, 2);
        addShip(4, 2, 1);
        addShip(4, 4, 1);
        addShip(4, 6, 1);
        addShip(4, 8, 1);
    }

    public FireResult fire(int x, int y) {
        verifyFireAllowed(x, y);
        Cell cell = getCellAt(x, y);
        if (cell.getState() == EMPTY) {
            cell.setState(MISS);
            return FireResult.MISS;
        }
        if (cell.getState() == SHIP) {
            cell.setState(HIT);
            Ship ship = cell.getShip();
            if (ship.isDead()) {
                getAdjacentCellsForShip(ship).forEach(e -> e.setState(MISS));
                return FireResult.DEAD;
            } else {
                return FireResult.HIT;
            }
        }
        throw new IllegalStateException();
    }

    private void verifyFireAllowed(int x, int y) {
        verifyCoordinatesCorrect(x, y);
        if (getCellAt(x, y).getState() == MISS || getCellAt(x, y).getState() == HIT) {
            throw new IllegalMoveException("x = " + x + ", y = ");
        }
    }

    public Cell getCellAt(int x, int y) {
        return matrix[x][y];
    }

    private Set<Cell> getAdjacentCellsForShipCell(Cell cell) {
        Set<Cell> adjacentCells = new HashSet<>();
        for (int x = cell.getX() - 1; x < cell.getX() + 2; x++) {
            for (int y = cell.getY() - 1; y < cell.getY() + 2; y++) {
                if (coordinatesCorrect(x, y)) {
                    if (x == cell.getX() && y == cell.getY()) {
                        continue;
                    }
                    Cell cellAt = getCellAt(x, y);
                    if (cellAt.getState() == EMPTY) {
                        adjacentCells.add(cellAt);
                    }
                }
            }
        }
        return adjacentCells;
    }

    public boolean allShipsDead() {
        for (Ship ship : shipList) {
            if (!ship.isDead()) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String toString() {
        String result = "  a b c d e f g h i j ";
        for (int i = 0; i < matrix.length; i++) {
            result += "\n" + i + " ";
            for (int j = 0; j < matrix.length; j++) {
                Cell cell = matrix[i][j];
                switch (cell.getState()) {
                    case EMPTY:
                        result += "_ ";
                        break;
                    case SHIP:
                        result += "S ";
                        break;
                    case MISS:
                        result += "* ";
                        break;
                    case HIT:
                        result += "H ";
                        break;
                }
            }
        }
        return result;
    }

}
