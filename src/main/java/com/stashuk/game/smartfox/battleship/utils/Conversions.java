package com.stashuk.game.smartfox.battleship.utils;

import com.stashuk.game.smartfox.battleship.model.Board;

import java.util.ArrayList;
import java.util.List;

public class Conversions {
    public static int[][] intMatrixFromList(List<Integer> list) {
        int[][] result = new int[10][10];
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                result[i][j] = list.get(i * 10 + j);
            }
        }
        return result;
    }

    public static boolean[][] booleanMatrixFromList(List<Integer> list) {
        boolean[][] result = new boolean[10][10];
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                result[i][j] = list.get(i * 10 + j) == 1;
            }
        }
        return result;
    }


    public static List<Integer> boardToIntList(Board board) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {
                result.add(board.getCellAt(i, j).getState().intCode());
            }
        }
        return result;
    }

    public static int xFrom(int cellId) {
        return cellId / 10;
    }

    public static int yFrom(int cellId) {
        return cellId % 10;
    }
}
