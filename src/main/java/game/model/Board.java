package game.model;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static game.model.CellState.*;
import static game.utils.VerifyService.coordinatesCorrect;
import static game.utils.VerifyService.verifyCoordinatesCorrect;

public class Board {
    protected final Cell[][] matrix;
    protected final Multimap<Integer, Ship> shipMultimap = ArrayListMultimap.create();

    public Board() {
        matrix = new Cell[10][10];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[i][j] = new Cell(i, j);
            }
        }
    }

    public void addShip(Ship ship) {
        if (shipMultimap.get(ship.getSize()).size() > 4 - ship.getSize()) {
            throw new IllegalArgumentException(
                    "you can't insert more than " + (5 - ship.getSize()) + " for " + ship.getSize() + "-deck ships");
        }
        shipMultimap.put(ship.getSize(), ship);
        ship.getCells().forEach(e -> {
            e.setShip(ship);
            e.setUnavailable();
            e.setState(SHIP);
        });
        getBorderCellsForShip(ship).forEach(Cell::setUnavailable);
    }

    private Set<Cell> getBorderCellsForShip(Ship ship) {
        Set<Cell> adjacentShipCells = new HashSet<>();
        List<Cell> shipCells = ship.getCells();
        shipCells.forEach(e -> getAdjacentCellsForShipCell(e).forEach(adjacentShipCells::add));
        return adjacentShipCells;
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
                getBorderCellsForShip(ship).forEach(e -> e.setState(MISS));
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
            throw new IllegalMoveException(
                    "x = " + x + ", y = " + y + ". getCellAt(x,y).getState = " + getCellAt(x, y).getState());
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
        for (Ship ship : shipMultimap.values()) {
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

    public boolean isComplete() {
        return shipMultimap.size() == 10;
    }

    public List<Integer> toIntList() {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                result.add(matrix[i][j].getState().toInt());
            }
        }
        return result;
    }
}
