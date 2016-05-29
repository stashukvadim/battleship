public class Board {
    protected int[][] matrix = new int[10][10];


    @Override
    public String toString() {
        String result = "  a b c d e f g h i j ";
        for (int i = 0; i < matrix.length; i++) {
            result += "\n" + i + " ";
            for (int j = 0; j < matrix.length; j++) {
                int anInt = matrix[i][j];
                if (anInt == 0) {
                    result += "_ ";
                }
                if (anInt == 1) {
                    result += "S ";
                }
                if (anInt == -1) {
                    result += "* ";
                }
            }
        }
        return result;
    }

    public void addShip(int x, int y, boolean vertical, int size) {
        for (int i = 0; i < size; i++) {
            if (vertical) {
                matrix[x++][y] = 1;
            } else {
                matrix[x][y++] = 1;
            }
        }
    }

    public void addShip(int x, int y, int size) {
        addShip(x, y, false, size);
    }


    public void putRandomShips() {
        int counter = 0;
//        for (int i = 0; i < matrix.length; i++) {
//            int[] ints = matrix[i];
//            for (int j = 0; j < ints.length; j++) {
//                if (counter < 20) {
//                    matrix[i][j] = 1;
//                }
//                counter++;
//            }
//        }
// TODO: 29.05.2016 add real random ships
        addShip(0, 0, 4);
        addShip(0, 5, 3);
        addShip(2, 0, 3);
        addShip(2, 4, 2);
        addShip(2, 7, 2);
        addShip(4, 0, 2);
        addShip(4, 3, 1);
        addShip(4, 5, 1);
        addShip(4, 7, 1);
        addShip(4, 9, 1);
    }

    public FireResult fire(int x, int y) {
        boolean b = verifyCoordinates(x, y);
        if (!b) {
            throw new IllegalArgumentException("x or y is out of bouds. x = " + x + " y = " + y);
        }
        int cell = matrix[x][y];
        if (cell == 0){
            matrix[x][y] = -1;
            return FireResult.MISS;
        }
        if (cell == 1){
            matrix[x][y] = 2;
            return FireResult.HIT;
        }
        return null;
    }

    private void putRandomShip(int size) {
//        Random random = new Random();
//        boolean isVertical = random.nextBoolean();
//        int x = -1;
//        int y = -1;
//        boolean coordinateCorrect = false;
//        while (coordinateCorrect) {
//            x = random.nextInt(10);
//            y = random.nextInt(10);
//            if (isVertical) {
//                coordinateCorrect = verifyCoordinate(x + size);
//            } else {
//                coordinateCorrect = verifyCoordinate(y + size);
//            }
//        }
//        Ship ship = new Ship(x, y, size, isVertical);

    }

    private boolean verifyCoordinate(int coordinate) {
        return coordinate <= 10;
    }

    private boolean verifyCoordinates(int x, int y) {
        return verifyCoordinate(x) && verifyCoordinate(y);
    }

}
