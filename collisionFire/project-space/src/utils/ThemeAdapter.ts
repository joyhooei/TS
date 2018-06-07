/** 
 * Orchid - ThemeAdapter.ts
 * 
 * Egret EUI 的主题适配器。
 * 
 * @version 20180521
 * @author Egret
 * @license 见 EGRET-README
 */

class ThemeAdapter implements eui.IThemeAdapter {
  public getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
    function onResGet(e: string): void {
      onSuccess.call(thisObject, e)
    }

    function onResError(e: RES.ResourceEvent): void {
      if (e.resItem.url == url) {
        RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null)
        onError.call(thisObject)
      }
    }
    
    if (typeof generateEUI !== 'undefined') {
      egret.callLater(() => {
        onSuccess.call(thisObject, generateEUI)
      }, this)
    }
    else {
      RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError, null)
      RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT)
    }
  }
}

declare var generateEUI: {
  paths: string[],
  skins: any
}
