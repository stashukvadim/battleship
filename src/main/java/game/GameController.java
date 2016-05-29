package game;

import java.util.InputMismatchException;
import java.util.Scanner;

public class GameController {
    private Board board1;
    private Board board2;
    private Board whoseTurn;

    public GameController() {
        board1 = new Board("Board1");
        board2 = new Board("Board2");
        whoseTurn = board1;
        board1.addShip(1, 1, true, 2);
        board2.addShip(0, 0, 4);
    }

    public void fire(int x, int y) {
        FireResult fireResult = whoseTurn.fire(x, y);
        System.out.println(fireResult);
        printBoards();
        if (fireResult == FireResult.MISS) {
            whoseTurn = whoseTurn == board1 ? board2 : board1;
        }
    }

    public void startGame() {
        Scanner scanner = new Scanner(System.in);
        printBoards();
        while (!gameOver()) {
            try {
                int x = scanner.nextInt();
                int y = scanner.nextInt();
                fire(x, y);
            } catch (InputMismatchException e) {
                System.out.println("Input is incorrect! Type x y with space between.");
                scanner.nextLine();
            }
        }
        System.out.println("Winner board is ");
        System.out.println(getWinner());
    }

    private boolean gameOver() {
        return board1.allShipsDead() || board2.allShipsDead();
    }

    private Board getWinner() {
        return board1.allShipsDead() ? board2 : board1;
    }

    private void printBoards() {
        System.out.println("Board1");
        System.out.println(board1);
        System.out.println("Board2");
        System.out.println(board2);
    }
}
