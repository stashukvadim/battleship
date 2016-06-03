package com.stashuk.game.smartfox.battleship.model;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import static com.stashuk.game.smartfox.battleship.model.CellState.*;
import static com.stashuk.game.smartfox.battleship.model.FireResult.*;
import static com.stashuk.game.smartfox.battleship.utils.Verifications.coordinatesCorrect;
import static com.stashuk.game.smartfox.battleship.utils.Verifications.verifyCoordinatesCorrect;
import static java.util.stream.Collectors.toSet;

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

    public boolean addShip(Ship ship) {
        if (shipMultimap.get(ship.getSize()).size() > 4 - ship.getSize()) {
            throw new IllegalArgumentException(
                    "you can't insert more than " + (5 - ship.getSize()) + " for " + ship.getSize() + "-deck ships");
        }
        //check that all cells are available
        boolean allCellsAvailable = ship.getCells().stream().allMatch(Cell::isAvailable);
        if (!allCellsAvailable){
            return false;
        }

        shipMultimap.put(ship.getSize(), ship);
        ship.getCells().forEach(e -> {
            e.setShip(ship);
            e.setUnavailable();
            e.setState(SHIP);
        });
        getBorderCellsForShip(ship).forEach(Cell::setUnavailable);

        return true;
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
        return shipMultimap.values().stream().allMatch(Ship::isDead);
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
        return ship.getCells().stream()
                   .map(this::getAdjacentCellsForShipCell)
                   .flatMap(Collection::stream)
                   .collect(toSet());
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
        for (int x = cell.getX() - 1; x <= cell.getX() + 1; x++) {
            for (int y = cell.getY() - 1; y <= cell.getY() + 1; y++) {
                if (coordinatesCorrect(x, y) && getCellAt(x, y).getState() == EMPTY) {
                    adjacentCells.add(getCellAt(x, y));
                }
            }
        }
        return adjacentCells;
    }
}
