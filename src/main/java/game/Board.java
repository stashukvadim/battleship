package game;

import java.util.ArrayList;
import java.util.List;

import static game.CellState.*;

public class Board {
    protected Cell[][] matrix;
    protected List<Ship> shipList = new ArrayList<>();

    public Board() {
        matrix = new Cell[10][10];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[i][j] = new Cell(i, j, null);
            }
        }
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

    public void addShip(Ship ship) {
        shipList.add(ship);
        int x = ship.getX();
        int y = ship.getY();
        for (int i = 0; i < ship.getSize(); i++) {
            Cell cell = getCellAt(x, y);
            cell.setShip(ship);
            cell.setState(SHIP);
            if (ship.isVertical()) {
                x++;
            } else {
                y++;
            }
        }
    }

    protected void putHardCodedShips() {
        addShip(new Ship(0, 0, 4, this));
        addShip(new Ship(0, 5, 3, this));
        addShip(new Ship(2, 0, true, 3, this));
        addShip(new Ship(2, 2, 2, this));
        addShip(new Ship(2, 5, 2, this));
        addShip(new Ship(2, 8, 2, this));
        addShip(new Ship(4, 2, 1, this));
        addShip(new Ship(4, 4, 1, this));
        addShip(new Ship(4, 6, 1, this));
        addShip(new Ship(4, 8, 1, this));
        // TODO: 29.05.2016  add putRandomShipsMethod
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
            ship.hit();
            if (ship.isDead()) {
//                markAdjacentMissForShipAt(cell);
//                ship.getCellList().forEach(e-> e.setState());
                return FireResult.DEAD;
            } else {
                return FireResult.HIT;
            }
        }
        throw new IllegalStateException();
    }

    private void verifyFireAllowed(int x, int y) {
        boolean coordinatesCorrect = verifyCoordinates(x, y);
        if (coordinatesCorrect && getCellAt(x, y).getState() == MISS || getCellAt(x, y).getState() == HIT) {
            throw new IllegalMoveException("x = " + x + ", y = ");
        }
    }

//    private void markAdjacentMissForShipAt(Cell cell) {
//        getAdjacentCellsForShipAt(cell).forEach(c -> c.setState(MISS));
//    }

    public Cell getCellAt(int x, int y) {
        return matrix[x][y];
    }

    public static boolean verifyCoordinate(int coordinate) {
        return coordinate < 10 && coordinate >= 0;
    }

    private boolean verifyCoordinates(int x, int y) {
        return verifyCoordinate(x) && verifyCoordinate(y);
    }

//    private Set<Cell> getAdjacentCellsForShipAt(Cell cell) {
//        Ship ship = cell.getShip();
//        Set<Cell> shipCells = new HashSet<>();
//        int x = ship.getX();
//        int y = ship.getY();
//        int size = ship.getSize();
//        for (int i = 0; i < size; i++) {
//            shipCells.add(getCellAt(x, y));
//            if (ship.isVertical()) {
//                x++;
//            } else {
//                y++;
//            }
//        }
//
//        Set<Cell> adjacentShipCells = new HashSet<>();
//        shipCells.forEach(e -> getAdjacentCellsForCell(e).forEach(adjacentShipCells::add));
//
//        return adjacentShipCells;
//    }

//    private Set<Cell> getAdjacentCellsForCell(Cell cell) {
//        Set<Cell> adjacentCells = new HashSet<>();
//
//        for (int x = cell.getX() - 1; x < cell.getX() + 2; x++) {
//            for (int y = cell.getY() - 1; y < cell.getY() + 2; y++) {
//                if (verifyCoordinates(x, y)) {
//                    if (x == cell.getX() && y == cell.getY()) {
//                        continue;
//                    }
//                    adjacentCells.add(getCellAt(x, y));
//                }
//            }
//        }
//        return adjacentCells;
//    }
}
