package game.model;

public enum CellState {
    EMPTY(0), SHIP(1), MISS(-1), DAMAGED(2);

    private int code;

    CellState(int code) {
        this.code = code;
    }
        public int intCode() {
        return code;
    }
}
