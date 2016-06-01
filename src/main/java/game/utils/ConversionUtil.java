package game.utils;

import java.util.List;

public class ConversionUtil {
    public static int[][] int2DArrayFromList(List<Integer> list) {
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

    public static int intForCoordinates(int x, int y) {
        return x * 10 + y;
    }

    public static int xFromInt(int cellId) {
        return cellId / 10;
    }

    public static int yFromInt(int cellId) {
        return cellId % 10;
    }
}
