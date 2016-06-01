package game.utils;

public class Verifications {
    public static boolean correctCoordinates(int x, int y) {
        return x >= 0 && x < 10 && y >= 0 && y < 10;
    }
}
