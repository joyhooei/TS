///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                               //
//                                     ;;,                ..,,,,,..                                                              //
//                                    ;'.            .,,`            ,`        .;:.    `.   .,.       ;.             ,,.         //
//                         `,;., `` :,.            .:                 .     .;.           ,,.                     `;,.           //
//                       ,;, `,:,,.      .         ;:                 .`   .;.          ,:,:,`     .;.      ``` .,:.             //
//                    .;:.                 .       ;,                 ,    .;`        .,.  ;.    ,,.     .;.. `,,                //
//                  ,:.                    ,      ;,                 ;.     `,,.`..:,.     .,.,`   ..,,,` ..,. .:,.              //
//               .;,                       :     .;,               ,;.                                                           //
//              ,.                        .,     ;,`            .;,.                                        .                    //
//             ;.                         '.    ;, .         .;,.           .:,,      `..                   .                    //
//            `.                        .;.    '.    .::,,,,.          `.:,             ;.                  :                    //
//            ..                      .;,    ,,;.`   ..             .;,.               `'.                  :                    //
//            `.   .,:::,,..,,,...  .;.   `;..          .       `,:,                .,:.                    ,                    //
//             :;,.              .;, `...;.               . `,:,                .;:,                       ..                    //
//           .,`.,         ``,;:.     .,.  `..`          .;,`...         `.,,,.                            :                     //
//          ..       ```                         `..`.;,.                                                .,                      //
//          ,                                    `.:.  `..                                             ,:.                       //
//           .`                              `.:,`          ..`                                     .;,`                         //
//              .`                      `.,,.                    .,`                            `,;:.                            //
//                 ...       ``..,::,,.                               ...                  `.::,.                                //
//                                                                          ..,,,::,,:,:,.`                                      //
//                                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Interface extends eui.Component {
  public interfaceBg: eui.Image
  public interfaceTop: eui.Label
  public interfaceScore: eui.Label
  public interfaceStopIcon: eui.Button
  public interfaceFlush: eui.Button
  public interfaceGoldNum: eui.Label
  public interfaceVsqGold: eui.Image
  public squareList: any[] = []; // 方块列表
  public square0: NumberExml;	// 方块1
  public square1: NumberExml;	// 方块2
  public square2: NumberExml;	// 方块3
  public square3: NumberExml;	// 方块4
  public square4: NumberExml;	// 方块5
  public square5: NumberExml;	// 方块6
  public square6: NumberExml;	// 方块7
  public square7: NumberExml;	// 方块8
  public square8: NumberExml;	// 方块9
  public square9: NumberExml;	// 方块10
  public square10: NumberExml;	// 方块11
  public square11: NumberExml;	// 方块12
  public square12: NumberExml;	// 方块13
  public square13: NumberExml;	// 方块14
  public square14: NumberExml;	// 方块15
  public square15: NumberExml;	// 方块16
  public square16: NumberExml;	// 方块17
  public square17: NumberExml;	// 方块18
  public square18: NumberExml;	// 方块19
  public square19: NumberExml;	// 方块20
  public square20: NumberExml;	// 方块21
  public square21: NumberExml;	// 方块22
  public square22: NumberExml;	// 方块23
  public square23: NumberExml;	// 方块24
  public square24: NumberExml;	// 方块25
  public bloodExml: BloodExml; // 血条视图
  // public squareController = new SquareClearController(5)	// 例化方块控制器类



  /**
     * 方块控制器类
     * @param x 当前点击数字的横坐标
     * @param y 当前点击数字的纵坐标
     * @param n 点击后数字的大小
     * @param T 向上寻路的标识
     * @param R 向右寻路的标识
     * @param B 向下寻路的标识
     * @param L 向左寻路的标识
     */
  public T = 0;	//	向上寻路的次数
  public R = 0;	//	向右寻路的次数
  public B = 0;	//	向下寻路的次数
  public L = 0;	//	向上寻路的次数
  public tag = 0;	//	路标：0、1、2、3 分别代表：上、下、左、右
  public num: number;
  public pushArray: any[] = [];	//	需要消除的数组
  public indexArray: any[] = [];	//	传进来的数组
  public x: number;	//	传进来的x
  public y: number;	//	传进来的y
  public px: number	//	第一次点击的x值
  public py: number	//	第一次点击的y值
  public maxNum: number	//	当前最大数字
  public chainArray: any[] = []	//	连锁反应要检查的方块顺序数组
  public realChainArray: any[] = []	//	去重后的连锁反应要检查的方块顺序数组
  public rotArray: any[] = [] //	旋转的数组
  public realPushArray: any[] = [] //	去重的push数组
  // public Interface = new Interface //	实例化Interface类



  public constructor() {
    super()
    this.skinName = 'Exml.Interface'
    this.InitMap()
    this.maxNum = 5
    this.interfaceStopIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

    }, this)

    this.interfaceFlush.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {

    }, this)
  }

  /**
     * 获得第一次点击时的坐标
     */
  public init(x: number, y: number): void {
    this.px = x;
    this.py = y;
  }



  /**
   * 初始化界面
   */
  public InitMap() {
    this.bloodExml = new BloodExml()
    this.bloodExml.x = 50
    this.bloodExml.y = 100
    this.addChild(this.bloodExml)
  }
  /**
	 * 页面加载随机生成方块
	 * @param n 方块最大的数字
	 * @param rx 方块矩阵列
	 * @param ry 方块矩阵行
	 */
  public randomSquare(n: number, rx: number, ry: number): void {
    for (let i = 0; i < rx; i++) {
      this.squareList[i] = new Array();
      for (let j = 0; j < ry; j++) {
        this.squareList[i].push(Math.ceil(Math.random() * n))
      }
    }
    this.drawAgin(rx, ry, this.squareList)
    // console.log("this.squareList", this.squareList)
  }
  /**
   * 根据数组进行绘制
   * @param x 方块行
   * @param y 方块列
   * @param arrayList 生成的随机数组
   * x 55   y   482    w  640   h   640  
   */
  public drawAgin(x: number, y: number, arrayList: any[]) {
    for (let i = 0; i < x * y; i++) {
      let allNum = x * y
      let arrayListX = Math.floor(i / x)
      let arrayListY = i % x
      // console.log(arrayList[arrayListX][arrayListY])
      this["square" + i] = new NumberExml(arrayList[arrayListX][arrayListY], arrayList)
      this["square" + i].x = (i % 5) * 124 + 127
      this["square" + i].y = 556 + 124 * arrayListX
      this.addChild(this["square" + i])

      this["square" + i].changeImageRes.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
        this.bloodExml.InitChangeBlood(2)
        var touch_x = this["square" + i].x;
        var touch_y = this["square" + i].y;
        var array_x = Math.floor((touch_x - 69) / 124);
        var array_y = Math.floor((touch_y - 498) / 124);
        let changeNum = this.squareList[array_y][array_x] += 1
        this["square" + i].changeImageRes.source = RES.getRes(`interface-number-${changeNum}_png`)
        this.squareClear(array_x, array_y, changeNum, this.squareList, touch_x, touch_y)
      }, this)
    }
  }

  /**
	 * 方块消除规则
	 */

  public squareClear(x: number, y: number, n: number, a: any[], tx: number, ty: number): void {
   
  }


	/**
	 * 连锁反应规则
   * @param realChainArray 连锁反应需要检查的方块列表
	 */
  public chainRule(): void {
    console.log("this.realChainArray", this.realChainArray)
  }



	/**
	 * 拿到所有相同数字的位置坐标
	 *
	 */
  public seek(x: number, y: number, n: number, a: any[]): boolean {
    //	寻路方法: 上、右、下、左
    //	寻路规则：按顺序查找外扩散1
    this.num = n
    this.indexArray = a
    this.x = x
    this.y = y
    // console.log("ssss!!!@@@!!",x,y)
    if (y != 0) {
      if (this.indexArray[y - 1][x] == n && y >= 0 && this.tag == 0) {

        //	top
        // console.log("top")
        this.tag += 1
        let tn = (y - 1) * 10 + x
        if ((this.py) * 10 + this.px != (y - 1) * 10 + x && !this.inArray(tn, this.pushArray)) {
          this.T += 1
          this.pushArray.push((y - 1) * 10 + x)
        }
      } else {
        this.tag += 1
      }
    } else {
      this.tag += 1
    }
    if (x != 4) {
      if (this.indexArray[y][x + 1] == n && x <= 4 && this.tag == 1) {
        // console.log("right")
        //	right
        this.tag += 1;
        let rn = y * 10 + (x + 1)
        if (y * 10 + (x + 1) != this.py * 10 + (this.px) && !this.inArray(rn, this.pushArray)) {
          this.R += 1;
          this.pushArray.push(y * 10 + (x + 1))
        }
      } else {
        this.tag += 1;
      }
    } else {
      this.tag += 1;
    }
    if (y != 4) {
      if (this.indexArray[y + 1][x] == n && y >= 0 && this.tag == 2) {
        //	bottom
        // console.log("bottom")
        this.tag += 1;
        let bn = (y + 1) * 10 + x
        if ((y + 1) * 10 + x != (this.py) * 10 + this.px && !this.inArray(bn, this.pushArray)) {
          // console.log("bottom")
          this.B += 1;
          this.pushArray.push((y + 1) * 10 + x)
        }
      } else {
        this.tag += 1;
      }
    } else {
      this.tag += 1;
    }
    if (x != 0) {
      if (this.indexArray[y][x - 1] == n && x <= 4 && this.tag == 3) {
        // console.log("left")
        //	left
        let ln = y * 10 + x - 1
        if (y * 10 + x - 1 != this.py * 10 + this.px && !this.inArray(ln, this.pushArray)) {
          this.L += 1;
          this.tag = 0;
          this.pushArray.push(y * 10 + x - 1)
          return true
        }
      } else {
        this.tag = 0;
        return true
      }
    } else {
      this.tag = 0;
      return true
    }
    this.tag = 0;
  }

	/**
	 * 重复调用寻路规则，直到找到最外面的数字相同的方块
	 */
  public sucendUser(): void {

    for (let i = 0; i < this.pushArray.length; i++) {
      this.seek(this.pushArray[i] % 10, (this.pushArray[i] - this.pushArray[i] % 10) / 10, this.num, this.indexArray)
    }
    if (this.pushArray[0] != null) {
      this.pushArray.push(this.py * 10 + this.px)
    }
    console.log("pushArray1", this.pushArray)
    // $Data.sqeArray = this.pushArray
  }

	/**
	 * 遍历要删除的数组 如果传入值有重复返回true 否则返回false
	 */
  public inArray(n: number, a: any[]): boolean {
    for (var i = 0; i < a.length; i++) {
      if (a[i] == n) {
        return true;
      }
    }
    return false;
  }

	/**
	 * 消除规则
	 */
  public clearRule(n: number): boolean {
    if (this.T + this.B >= 2) {
      this.T = 0
      this.R = 0
      this.B = 0
      this.L = 0
      //	执行下落规则
      // console.log("列满足消除条件")

      return true
    } else if (this.R + this.L >= 2) {
      this.T = 0
      this.R = 0
      this.B = 0
      this.L = 0
      //	行满足消除条件：3个或者以上相同
      // console.log("行满足消除条件")
      return true
    } else if (this.T >= 1 && this.R >= 1 || this.B >= 1 && this.R >= 1 || this.B >= 1 && this.L >= 1 || this.T >= 1 && this.L >= 1) {
      this.T = 0
      this.R = 0
      this.B = 0
      this.L = 0
      //	L型满足消除条件
      // console.log("L型满足条件")
      return true
    } else {
      this.T = 0
      this.R = 0
      this.B = 0
      this.L = 0
      this.pushArray = []
      return false
    }

  }

  /**
   * 连锁反应逻辑
   * 1.当用户点击之后执行消除的方法后 那么会获取到所有所关联的位置 坐标   
   * 2.将每一个所关联的坐标进行从大到小排序  之后进行模拟寻路操作 如果不可消除的位置  将数组内位置删除掉   直到找到可消除  或者当前数组遍历结束  都没有可消除的内容
   * 3.当找到可消除的内容  那么将所有针对于当前这个可消除的坐标所关联的位置  加入到数组中   然后进行去重    重新模拟2操作
   */

	/**
	 * 方块下落规则
	 */
  public dropRule(n: number): void {
    
  }




	// /**
	//  * 方块下落规则
	//  */
  // public dropRule(n: number): void {
  //   let ss = false;
  //   console.log("pushArray",this.pushArray)
  //   for (let i = 0; i < this.pushArray.length; i++) {
  //     let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
  //     let oy = this.pushArray[i] % 10
  //     //	执行下落规则
  //     // this.indexArray[ox].splice(oy, 1, 0)

  //     //	判断点击数字下方是否被消除 如果消除被点击数字下落
  //     if (this.py < ox && this.px == oy) {
  //       console.log("被消除")
  //       this.indexArray[ox].splice(oy, 1, n)
  //       ss = true
  //     } else if (!ss) {
  //       console.log("没有被消除")
  //       // console.log("n", n)
  //       this.indexArray[this.py].splice(this.px, 1, n)
  //       // console.log(this.indexArray[this.py][this.px])
  //     }
  //   }


  //   //	数组正向排序
  //   this.pushArray.sort(function (x, y) {
  //     if (x < y) {
  //       return -1;
  //     } else if (x > y) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   })
  //   // console.log("0-1",$Data.sqeArray)
  //   //	从删除队列中去掉下落后的被点击方块
  //   for (let i = 0; i < this.pushArray.length; i++) {
  //     let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
  //     let oy = this.pushArray[i] % 10
  //     if (this.indexArray[ox][oy] == n) {
  //       $Data.sqeNum = this.pushArray[i]

  //       this.pushArray.splice(i, 1)
  //     }
  //   }

  //   // console.log("0-2",$Data.sqeNum)
  //   for (let i = 0; i < this.pushArray.length; i++) {
  //     let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
  //     let oy = this.pushArray[i] % 10
  //     for (let j = ox; j >= 0; j--) {
  //       if (j == 0) {
  //         this.indexArray[j].splice(oy, 1, Math.ceil(Math.random() * (this.maxNum - 3)))
  //       } else {
  //         this.indexArray[j].splice(oy, 1, this.indexArray[j - 1][oy])
  //       }
  //       this.chainArray.push(j * 10 + oy)
  //     }
  //   }
  //   // console.log("pushArray", this.pushArray)
  //   this.rotArray = this.pushArray
  //   this.pushArray = []
  //   //	数组去重
  //   for (let i = 0; i < this.chainArray.length; i++) {
  //     for (let j = i + 1; j < this.chainArray.length; j++) {
  //       if (this.chainArray[i] == this.chainArray[j]) {
  //         j = ++i;
  //       }
  //     }
  //     this.realChainArray.push(this.chainArray[i])
  //   }
  //   //	将数组反向向排列
  //   this.realChainArray.sort(function (x, y) {
  //     if (x < y) {
  //       return 1;
  //     } else if (x > y) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   })
  // }








}


