package game;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static game.CellState.*;
import static game.Ship.Direction;
import static game.Ship.Direction.HORIZONTAL;
import static game.Ship.Direction.VERTICAL;
import static game.Ship.Size;
import static game.Ship.Size.*;

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

    private static void verifyCoordinatesCorrect(int x, int y) {
        if (!coordinatesCorrect(x, y)) {
            throw new CellOutOfBoundsException(x, y);
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

    public void addShip(int x, int y, Direction direction, Size size) {
        Set<Cell> shipCells = new HashSet<>();
        int xCoord = x;
        int yCoord = y;
        for (int i = 0; i < size.value(); i++) {
            verifyCoordinatesCorrect(xCoord, yCoord);
            Cell cell = getCellAt(xCoord, yCoord);
            if (cell.isAvailable() || cell.getState() != SHIP) {
                shipCells.add(cell);
                if (direction == VERTICAL) {
                    xCoord++;
                } else {
                    yCoord++;
                }
            } else
                throw new IllegalArgumentException("Cell x = " + xCoord + ", y = " + yCoord + " is already occupied.");
        }
        Ship ship = new Ship(x, y, direction, size.value());
        shipCells.forEach(e -> {
            e.setState(SHIP);
            e.setShip(ship);
            e.setAvailable(false);
        });
        ship.setCellList(shipCells);
        Set<Cell> adjacentCells = getAdjacentCellsForShip(ship);
        ship.setBoundedCells(adjacentCells);
        adjacentCells.forEach(e -> e.setAvailable(false));
        shipList.add(ship);
    }

    public void addShip(int x, int y, Size size) {
        addShip(x, y, HORIZONTAL, size);
    }

    private Set<Cell> getAdjacentCellsForShip(Ship ship) {
        Set<Cell> adjacentShipCells = new HashSet<>();
        Set<Cell> shipCells = ship.getCellList();
        shipCells.forEach(e -> getAdjacentCellsForShipCell(e).forEach(adjacentShipCells::add));
        return adjacentShipCells;
    }

    protected void putHardCodedShips() {
        addShip(0, 0, FOUR);
        addShip(0, 5, THREE);
        addShip(2, 0, VERTICAL, THREE);
        addShip(2, 2, TWO);
        addShip(2, 5, TWO);
        addShip(2, 8, TWO);
        addShip(4, 2, ONE);
        addShip(4, 4, ONE);
        addShip(4, 6, ONE);
        addShip(4, 8, ONE);
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
                ship.getBoundedCells().forEach(e -> e.setState(MISS));
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
        return shipList.isEmpty();
    }
}
