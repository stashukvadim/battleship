package game.model;

public enum CellState {
    EMPTY, SHIP, MISS, HIT;

    public int toInt() {
        int result = 0;
        switch (this) {
            case EMPTY:
                result = 0;
                break;
            case SHIP:
                result = 1;
                break;
            case MISS:
                result = -1;
                break;
            case HIT:
                result = 2;
                break;
        }
        return result;
    }
}
