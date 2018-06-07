// This file is exported by Orchid PSD Exporter v1.1.0
class Tutorial extends eui.Component {
  public tutorialTutorialBg: eui.Image
  public tutorialTutorialPrompt: eui.Image
  public tutorialHallReturnicon: eui.Button

  public constructor () {
    super()
    this.skinName = 'Exml.Tutorial'

    this.tutorialHallReturnicon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
      AudioManager.playSound('button_mp3')
      $stage.removeChild($view.tutorial)
    }, this)
  }
}
