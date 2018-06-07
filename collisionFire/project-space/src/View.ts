/** 
 * Orchid - View.ts
 * 
 * 声明本项目中使用到的视图。
 * 在此处声明的视图可以实现 IDE 自动提示。
 * 
 * @version 20180521
 * @author Winterwrath
 * @license 见 ORCHID-README
 */

class $view {
  public static hallLoading: HallLoading
  // public static interface: Interface
  public static game: Game
  public static home: Home
  public static stop: Stop
  public static tutorial: Tutorial
  public static clear: Clearing
  public static rankList: RankList
  public static addIcon: AddCoin
  public static shareing: Share
  public static help: HomeHelp
  // public static gameLoading: GameLoading
  // public static gameOver: GameOver
  // public static park: Park
  // public static quitGame: QuitGame
  // public static room: Room
  // public static share: Share
}

window['$view'] = $view
