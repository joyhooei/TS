// // class SquareClearController extends egret.DisplayObjectContainer {
// // 	/**
// // 	 * 方块控制器类
// // 	 * @param x 当前点击数字的横坐标
// // 	 * @param y 当前点击数字的纵坐标
// // 	 * @param n 点击后数字的大小
// // 	 * @param T 向上寻路的标识
// // 	 * @param R 向右寻路的标识
// // 	 * @param B 向下寻路的标识
// // 	 * @param L 向左寻路的标识
// // 	 */
// // 	public T = 0;	//	向上寻路的次数
// // 	public R = 0;	//	向右寻路的次数
// // 	public B = 0;	//	向下寻路的次数
// // 	public L = 0;	//	向上寻路的次数
// // 	public tag = 0;	//	路标：0、1、2、3 分别代表：上、下、左、右
// // 	public num: number;
// // 	public pushArray: any[] = [];	//	需要消除的数组
// // 	public indexArray: any[] = [];	//	传进来的数组
// // 	public x: number;	//	传进来的x
// // 	public y: number;	//	传进来的y
// // 	public px: number	//	第一次点击的x值
// // 	public py: number	//	第一次点击的y值
// // 	public maxNum: number	//	当前最大数字
// // 	public chainArray: any[] = []	//	连锁反应要检查的方块顺序数组
// // 	public realChainArray: any[] = []	//	去重后的连锁反应要检查的方块顺序数组
// // 	public rotArray: any[] = [] //	旋转的数组
// // 	public realPushArray: any[] = [] //	去重的push数组
// // 	// public Interface = new Interface //	实例化Interface类
// // 	public bloodExml = new BloodExml()
// // 	/**
// // 	 * 构造函数
// // 	 */
// // 	public constructor(n: number) {
// // 		super()
// // 		this.maxNum = n
// // 	}
// // 	/**
// // 	 * 获得第一次点击时的坐标
// // 	 */
// // 	public init(x: number, y: number): void {
// // 		this.px = x;
// // 		this.py = y;
// // 	}
// // 	/**
// // 	 * 拿到所有相同数字的位置坐标
// // 	 *
// // 	 */
// // 	public seek(x: number, y: number, n: number, a: any[]): boolean {
// // 		//	寻路方法: 上、右、下、左
// // 		//	寻路规则：按顺序查找外扩散1
// // 		this.num = n
// // 		this.indexArray = a
// // 		this.x = x
// // 		this.y = y
// // 		// console.log("ssss!!!@@@!!",x,y)
// // 		if (y != 0) {
// // 			if (this.indexArray[y - 1][x] == n && y >= 0 && this.tag == 0) {
// // 				//	top
// // 				// console.log("top")
// // 				this.tag += 1
// // 				let tn = (y - 1) * 10 + x
// // 				if ((this.py) * 10 + this.px != (y - 1) * 10 + x && !this.inArray(tn, this.pushArray)) {
// // 					this.T += 1
// // 					this.pushArray.push((y - 1) * 10 + x)
// // 				}
// // 			} else {
// // 				this.tag += 1
// // 			}
// // 		} else {
// // 			this.tag += 1
// // 		}
// // 		if (x != 4) {
// // 			if (this.indexArray[y][x + 1] == n && x <= 4 && this.tag == 1) {
// // 				// console.log("right")
// // 				//	right
// // 				this.tag += 1;
// // 				let rn = y * 10 + (x + 1)
// // 				if (y * 10 + (x + 1) != this.py * 10 + (this.px) && !this.inArray(rn, this.pushArray)) {
// // 					this.R += 1;
// // 					this.pushArray.push(y * 10 + (x + 1))
// // 				}
// // 			} else {
// // 				this.tag += 1;
// // 			}
// // 		} else {
// // 			this.tag += 1;
// // 		}
// // 		if (y != 4) {
// // 			if (this.indexArray[y + 1][x] == n && y >= 0 && this.tag == 2) {
// // 				//	bottom
// // 				// console.log("bottom")
// // 				this.tag += 1;
// // 				let bn = (y + 1) * 10 + x
// // 				if ((y + 1) * 10 + x != (this.py) * 10 + this.px && !this.inArray(bn, this.pushArray)) {
// // 					// console.log("bottom")
// // 					this.B += 1;
// // 					this.pushArray.push((y + 1) * 10 + x)
// // 				}
// // 			} else {
// // 				this.tag += 1;
// // 			}
// // 		} else {
// // 			this.tag += 1;
// // 		}
// // 		if (x != 0) {
// // 			if (this.indexArray[y][x - 1] == n && x <= 4 && this.tag == 3) {
// // 				// console.log("left")
// // 				//	left
// // 				let ln = y * 10 + x - 1
// // 				if (y * 10 + x - 1 != this.py * 10 + this.px && !this.inArray(ln, this.pushArray)) {
// // 					this.L += 1;
// // 					this.tag = 0;
// // 					this.pushArray.push(y * 10 + x - 1)
// // 					return true
// // 				}
// // 			} else {
// // 				this.tag = 0;
// // 				return true
// // 			}
// // 		} else {
// // 			this.tag = 0;
// // 			return true
// // 		}
// // 		this.tag = 0;
// // 	}
// // 	/**
// // 	 * 重复调用寻路规则，直到找到最外面的数字相同的方块
// // 	 */
// // 	public sucendUser(): void {
// // 		for (let i = 0; i < this.pushArray.length; i++) {
// // 			this.seek(this.pushArray[i] % 10, (this.pushArray[i] - this.pushArray[i] % 10) / 10, this.num, this.indexArray)
// // 		}
// // 		if (this.pushArray[0] != null) {
// // 			this.pushArray.push(this.py * 10 + this.px)
// // 		}
// // 		// console.log("pushArray1", this.pushArray)
// // 		// $Data.sqeArray = this.pushArray
// // 	}
// // 	/**
// // 	 * 遍历要删除的数组 如果传入值有重复返回true 否则返回false
// // 	 */
// // 	public inArray(n: number, a: any[]): boolean {
// // 		for (var i = 0; i < a.length; i++) {
// // 			if (a[i] == n) {
// // 				return true;
// // 			}
// // 		}
// // 		return false;
// // 	}
// // 	/**
// // 	 * 消除规则
// // 	 */
// // 	public clearRule(n: number): boolean {
// // 		// console.log("sqe", this.sqeArray)
// // 		// console.log("this.T", this.T)
// // 		// console.log("this.R", this.R)
// // 		// console.log("this.B", this.B)
// // 		// console.log("this.L", this.L)
// // 		// console.log("$Data.sqeArray",$Data.sqeArray)
// // 		if (this.T + this.B >= 2) {
// // 			this.T = 0
// // 			this.R = 0
// // 			this.B = 0
// // 			this.L = 0
// // 			//	执行下落规则
// // 			// console.log("列满足消除条件")
// // 			this.dropRule(n)
// // 			return true
// // 		} else if (this.R + this.L >= 2) {
// // 			this.T = 0
// // 			this.R = 0
// // 			this.B = 0
// // 			this.L = 0
// // 			//	行满足消除条件：3个或者以上相同
// // 			// console.log("行满足消除条件")
// // 			this.dropRule(n)
// // 			return true
// // 		} else if (this.T >= 1 && this.R >= 1 || this.B >= 1 && this.R >= 1 || this.B >= 1 && this.L >= 1 || this.T >= 1 && this.L >= 1) {
// // 			this.T = 0
// // 			this.R = 0
// // 			this.B = 0
// // 			this.L = 0
// // 			//	L型满足消除条件
// // 			// console.log("L型满足条件")
// // 			this.dropRule(n)
// // 			return true
// // 		} else {
// // 			this.T = 0
// // 			this.R = 0
// // 			this.B = 0
// // 			this.L = 0
// // 			this.pushArray = []
// // 			return false
// // 		}
// // 	}
// // 	/**
// // 	 * 方块下落规则
// // 	 */
// // 	public dropRule(n: number): void {
// // 		let ss = false;
// // 		for (let i = 0; i < this.pushArray.length; i++) {
// // 			let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
// // 			let oy = this.pushArray[i] % 10
// // 			//	执行下落规则
// // 			this.indexArray[ox].splice(oy, 1, 0)
// // 			//	判断点击数字下方是否被消除 如果消除被点击数字下落
// // 			if (this.py < ox && this.px == oy) {
// // 				// console.log("被消除")
// // 				this.indexArray[ox].splice(oy, 1, n)
// // 				ss = true
// // 			} else if (!ss) {
// // 				// console.log("没有被消除")
// // 				// console.log("n", n)
// // 				this.indexArray[this.py].splice(this.px, 1, n)
// // 				// console.log(this.indexArray[this.py][this.px])
// // 			}
// // 		}
// // 		//	数组正向排序
// // 		this.pushArray.sort(function (x, y) {
// // 			if (x < y) {
// // 				return -1;
// // 			} else if (x > y) {
// // 				return 1;
// // 			} else {
// // 				return 0;
// // 			}
// // 		})
// // 		// console.log("0-1",$Data.sqeArray)
// // 		//	从删除队列中去掉下落后的被点击方块
// // 		for (let i = 0; i < this.pushArray.length; i++) {
// // 			let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
// // 			let oy = this.pushArray[i] % 10
// // 			if (this.indexArray[ox][oy] == n) {
// // 				$Data.sqeNum = this.pushArray[i]
// // 				this.pushArray.splice(i, 1)
// // 			}
// // 		}
// // 		// console.log("0-2",$Data.sqeNum)
// // 		for (let i = 0; i < this.pushArray.length; i++) {
// // 			let ox = (this.pushArray[i] - this.pushArray[i] % 10) / 10;
// // 			let oy = this.pushArray[i] % 10
// // 			for (let j = ox; j >= 0; j--) {
// // 				if (j == 0) {
// // 					this.indexArray[j].splice(oy, 1, Math.ceil(Math.random() * (this.maxNum - 3)))
// // 				} else {
// // 					this.indexArray[j].splice(oy, 1, this.indexArray[j - 1][oy])
// // 				}
// // 				this.chainArray.push(j * 10 + oy)
// // 			}
// // 		}
// // 		// console.log("pushArray", this.pushArray)
// // 		this.rotArray = this.pushArray
// // 		this.pushArray = []
// // 		//	数组去重
// // 		for (let i = 0; i < this.chainArray.length; i++) {
// // 			for (let j = i + 1; j < this.chainArray.length; j++) {
// // 				if (this.chainArray[i] == this.chainArray[j]) {
// // 					j = ++i;
// // 				}
// // 			}
// // 			this.realChainArray.push(this.chainArray[i])
// // 		}
// // 		//	将数组反向向排列
// // 		this.realChainArray.sort(function (x, y) {
// // 			if (x < y) {
// // 				return 1;
// // 			} else if (x > y) {
// // 				return -1;
// // 			} else {
// // 				return 0;
// // 			}
// // 		})
// // 		// this.chainRule()
// // 	}
// //  public drawAgin(x: number, y: number, arrayList: any[]) {
// //     for (let i = 0; i < x * y; i++) {
// //       let allNum = x * y
// //       let arrayListX = Math.floor(i / x)
// //       let arrayListY = i % x
// //       // console.log(arrayList[arrayListX][arrayListY])
// //       this["square" + i] = new NumberExml(arrayList[arrayListX][arrayListY], arrayList)
// //       this["square" + i].x = (i % 5) * 124 + 127
// //       this["square" + i].y = 556 + 124 * arrayListX
// //       this.addChild(this["square" + i])
// //     }
// //   }
// // 	/**
// // 	 * 连锁反应规则
// // 	 */
// // 	public chainRule(): void {
// // 		console.log("连锁反应数组", this.realChainArray)
// // 		// 	// console.log("当前数组", this.indexArray)
// // 		for (let i = 0; i < this.realChainArray.length; i++) {
// // 			let ox = (this.realChainArray[i] - this.realChainArray[i] % 10) / 10;
// // 			let oy = this.realChainArray[i] % 10
// // 			let n = this.indexArray[ox][oy]
// // 			// 		// Interface.squareClear()
// // 			if (this.seek(oy, ox, n, this.indexArray)) {
// // 				this.sucendUser()
// // 				// 			// 	console.log("pushArray", this.pushArray)
// // 				if (this.clearRule(n)) {
// // 					// 				// 	// this.Interface.squareClear(oy, ox, n, this.indexArray, (i % 5) * 124 + 127, 556 + 124 * Math.floor(i / 5))
// // 					for (let i = 0; i < this.rotArray.length; i++) {
// // 						let ox = (this.rotArray[i] - this.rotArray[i] % 10) / 10;
// // 						let oy = this.rotArray[i] % 10
// // 						egret.Tween.get(this["square" + (5 * ox + oy)]).to({ x: (i % 5) * 124 + 127, y: 556 + 124 * Math.floor(i / 5), scaleX: 0, scaleY: 0, rotation: 360 }, 250)
// // 					}
// // 					let key: number
// // 					key = egret.setTimeout(() => {
// // 						for (let i = 0; i < 25; i++) {
// // 							this.removeChild(this["square" + i])
// // 						}
// // 						this.drawAgin(5, 5, this.indexArray)
// // 					}, this, 250);
// // 					egret.Tween.get(this["square" + (5 * oy + ox)]).to({ rotation: 360 }, 250).call(() => {
// // 						let xx = ($Data.sqeNum - $Data.sqeNum % 10) / 10
// // 						let yy = $Data.sqeNum % 10
// // 						this.indexArray[xx][yy] = n + 1
// // 						this.bloodExml.InitChangeBlood(1)
// // 					})
// // 				}
// // 			}
// // 			this.realChainArray = []
// // 			this.chainArray = []
// // 		}
// // 	}
// // 	// 	// this.realChainArray = []
// // 	// 	// this.chainArray = []
// // 	// 	// console.log("eee")
// // }
//  public chainRule(): void {
//     console.log("连锁反应数组", this.realChainArray)
//     // 	// console.log("当前数组", this.indexArray)
//     for (let i = 0; i < this.realChainArray.length; i++) {
//       let ox = (this.realChainArray[i] - this.realChainArray[i] % 10) / 10;
//       let oy = this.realChainArray[i] % 10
//       let n = this.indexArray[ox][oy]
//       if (this.seek(oy, ox, n, this.indexArray)) {
//         
//         console.log("2222222")
//         console.log("pushArray", this.pushArray)
//         console.log("T", this.T)
//         console.log("R", this.R)
//         console.log("B", this.B)
//         console.log("L", this.L)
//         if (this.clearRule(n)) {
//           console.log("!!!!---!!!")
//           // this.squareClear(oy, ox, n, this.squareList, (i % 5) * 124 + 127, 556 + 124 * Math.floor(i / 5))
//           for (let i = 0; i < this.rotArray.length; i++) {
//             let ox = (this.rotArray[i] - this.rotArray[i] % 10) / 10;
//             let oy = this.rotArray[i] % 10
//             console.log("ox", ox)
//             console.log("oy", oy)
//             egret.Tween.get(this["square" + (5 * ox + oy)]).to({ x: (i % 5) * 124 + 127, y: 556 + 124 * Math.floor(i / 5), scaleX: 0, scaleY: 0, rotation: 360 }, 250)
//           }
//           let key: number
//           key = egret.setTimeout(() => {
//             for (let i = 0; i < 25; i++) {
//               this.removeChild(this["square" + i])
//             }
//             this.drawAgin(5, 5, this.indexArray)
//           }, this, 250);
//           egret.Tween.get(this["square" + (5 * oy + ox)]).to({ rotation: 360 }, 250).call(() => {
//             let xx = ($Data.sqeNum - $Data.sqeNum % 10) / 10
//             let yy = $Data.sqeNum % 10
//             this.indexArray[xx][yy] = n + 1
//             this.bloodExml.InitChangeBlood(1)
//           })
//         }
//       }
//       this.realChainArray = []
//       this.chainArray = []
//     }
//   }
//   // 	// this.realChainArray = []
//   // 	// this.chainArray = []
//   // 	// console.log("eee") 
//# sourceMappingURL=SquareClearController.js.map