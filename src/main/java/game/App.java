package game;

public class App {
    public static void main(String[] args) {
//        GameController gameController = new GameController();
//        gameController.startGame();
        System.out.println("<table>");
        for (int i = 0; i < 10; i++) {
            System.out.println("<tr>");
            for (int j = 0; j < 10; j++) {
                System.out.println("<td class ='tableData' id=" + '"' + (i * 10 + j) + '"' +'>' + "some data!" + "</td>");
            }
            System.out.println("</tr>");
        }
        System.out.println("</table>");
    }
}
