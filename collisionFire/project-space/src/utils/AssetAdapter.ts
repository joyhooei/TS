/** 
 * Orchid - ThemeAdapter.ts
 * 
 * Egret RES 的资源适配器。
 * 
 * @version 20180521
 * @author Egret
 * @license 见 EGRET-README
 */

class AssetAdapter implements eui.IAssetAdapter {
  public getAsset(source: string, compFunc: Function, thisObject: any): void {
    function onGetRes(data: any): void {
      compFunc.call(thisObject, data, source)
    }
    
    if (RES.hasRes(source)) {
      let data = RES.getRes(source)
      if (data) {
        onGetRes(data)
      }
      else {
        RES.getResAsync(source, onGetRes, this)
      }
    }
    else {
      RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE)
    }
  }
}
