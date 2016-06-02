package com.stashuk.game.smartfox.battleship.model;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static com.stashuk.game.smartfox.battleship.model.CellState.*;
import static com.stashuk.game.smartfox.battleship.model.FireResult.*;
import static com.stashuk.game.smartfox.battleship.utils.VerifyService.coordinatesCorrect;
import static com.stashuk.game.smartfox.battleship.utils.VerifyService.verifyCoordinatesCorrect;

public class Board {
    private final Cell[][] matrix;
    private final Multimap<Integer, Ship> shipMultimap = ArrayListMultimap.create();

    protected Board() {
        matrix = new Cell[10][10];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix.length; j++) {
                matrix[i][j] = new Cell(i, j);
            }
        }
    }

    public Cell getCellAt(int x, int y) {
        return matrix[x][y];
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

    public FireResult fire(int x, int y) {
        verifyFireAllowed(x, y);

        Cell cell = getCellAt(x, y);
        if (cell.getState() == SHIP) {
            cell.setState(DAMAGED);
            Ship ship = cell.getShip();
            if (ship.isDead()) {
                getBorderCellsForShip(ship).forEach(e -> e.setState(MISS));
                return DEAD;
            } else {
                return HIT;
            }
        } else {
            cell.setState(MISS);
            return MISSED;
        }
    }

    public boolean isComplete() {
        return shipMultimap.size() == 10;
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
        String result = "  0 1 2 3 4 5 6 7 8 9 ";
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
                    case DAMAGED:
                        result += "H ";
                        break;
                }
            }
        }
        return result;
    }

    private Set<Cell> getBorderCellsForShip(Ship ship) {
        Set<Cell> adjacentShipCells = new HashSet<>();
        List<Cell> shipCells = ship.getCells();
        shipCells.forEach(e -> getAdjacentCellsForShipCell(e).forEach(adjacentShipCells::add));
        return adjacentShipCells;
    }

    private void verifyFireAllowed(int x, int y) {
        verifyCoordinatesCorrect(x, y);
        if (getCellAt(x, y).getState() == MISS || getCellAt(x, y).getState() == DAMAGED) {
            throw new IllegalMoveException(
                    "x = " + x + ", y = " + y + ". getCellAt(x,y).getState = " + getCellAt(x, y).getState());
        }
    }

    private Set<Cell> getAdjacentCellsForShipCell(Cell cell) {
        Set<Cell> adjacentCells = new HashSet<>();
        for (int x = cell.getX() - 1; x < cell.getX() + 2; x++) {
            for (int y = cell.getY() - 1; y < cell.getY() + 2; y++) {
                if (coordinatesCorrect(x, y) && getCellAt(x, y).getState() == EMPTY) {
                    adjacentCells.add(getCellAt(x, y));
                }
            }
        }
        return adjacentCells;
    }
}
