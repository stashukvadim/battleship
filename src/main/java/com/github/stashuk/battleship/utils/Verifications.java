package com.github.stashuk.battleship.utils;

import com.github.stashuk.battleship.model.CellOutOfBoundsException;

public class Verifications {
    public static boolean correctCoordinates(int x, int y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }

    public static boolean coordinateCorrect(int coordinate) {
        return coordinate < 10 && coordinate >= 0;
    }

    public static boolean coordinatesCorrect(int x, int y) {
        return coordinateCorrect(x) && coordinateCorrect(y);
    }

    public static void verifyCoordinatesCorrect(int x, int y) throws CellOutOfBoundsException {
        if (!coordinatesCorrect(x, y)) {
            throw new CellOutOfBoundsException(x, y);
        }
    }
}
