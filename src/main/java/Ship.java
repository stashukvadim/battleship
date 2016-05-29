public class Ship {
    private int size;
    private boolean isVertical;
    private int x;
    private int y;
    private boolean isDamaged;
    private boolean isDead;

    public Ship(int x, int y, int size, boolean isVertical) {
        this.size = size;
        this.isVertical = isVertical;
        this.x = x;
        this.y = y;
    }

    public Ship(int x, int y, int size) {
        this.size = size;
        this.x = x;
        this.y = y;
    }

    public void setDamaged(boolean damaged) {
        isDamaged = damaged;
    }

    public void setDead(boolean dead) {
        isDead = dead;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public boolean isDamaged() {
        return isDamaged;
    }

    public boolean isDead() {
        return isDead;
    }

    public int getSize() {
        return size;
    }

    public boolean isVertical() {
        return isVertical;
    }
}
