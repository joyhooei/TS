class Game extends eui.Component {
	public gameBg: eui.Image
	public gameTitleGroup: eui.Group
	public gameTitleScore: eui.Label
	public gameTitleUnit: eui.Image
	public gameTitleTop: eui.Label
	public gameStopIcon: eui.Button
	public gameChessboard: eui.Group
	public collisionArray: any[] = []	// 碰撞数组
	public stageX: number	//	点击的x的坐标
	public stageY: number	//	点击的y的坐标
	public score: number	//	当前分数
	public syntheticNumber: number = 0// 合成次数
	public parkDetailScroller: eui.Scroller
	public parkDetailView: eui.Group
	public creatLenth: number
	public constructor() {
		super()
		this.skinName = "Exml.Game"

		this.parkDetailScroller.viewport = this.parkDetailView
		// Ajax($data.loginURL, {
		// 	postData: true,
		// 	encryptedData: $data.encryptedData,
		// 	iv: $data.iv,
		// 	session_key: $data.session_key,
		// 	game_id: $data.gameId,
		// }).then(res => {
		// 	console.log("登录注册接口", res)
		// 	$data.token = res["data"].token,
		// 		$data.goldNumber = res["data"].gold,
		// 		$data.userID = res["data"].id,
		// 		$data.gameTitleTop = res["data"].max_score
		this.gameTitleTop.text = `top: ${$data.gameTitleTop}`
		this.gameTitleScore.text = `${$data.score}`
		// })
		this.init($data.pageX, $data.pageY)
		this.gameStopIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			AudioManager.playSound('button_mp3')
			$view.stop = new Stop()
			$stage.addChild($view.stop)
			$view.stop.stopStopMask.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				AudioManager.playSound('button_mp3')
				$stage.removeChild($view.stop)
			}, this)
		}, this)

	}


	/**
	* 游戏主页面
	* @param x 方块行个数
	* @param y 方块列个数
	*/
	public init(rx: number, ry: number) {
		let squareList = []
		for (let i = 0; i < ry; i++) {
			squareList[i] = []
			for (let j = 0; j < rx; j++) {
				squareList[i][j] = this.squareRandom()
			}
		}
		Data.observe('squareList', newValue => {
			this.gameChessboard.removeChildren()
			for (let i = 0; i < $data.squareList.length; i++) {
				for (let j = 0; j < $data.squareList[i].length; j++) {
					$data.squareView[i][`${j}`] = new Square(i, j, newValue[i][j])
					this.gameChessboard.addChild($data.squareView[i][`${j}`])
				}
			}
		}, 3, true)
		$data.squareList = squareList

		this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_TAP, e => {

			if (e.target.parent instanceof Square) {
				if (this.gameChessboard.touchEnabled == true) {
					this.gameChessboard.touchEnabled = false
					//	逻辑操作 检查点击方块是否满足条件
					this.stageX = e.target.parent.x	// 在视图层上的X轴坐标
					this.stageY = e.target.parent.y	// 在视图层上的Y轴坐标
					let arrayKey1 = this.stageY / 92	// $data.squareList数组的第一维数组的key
					let arrayKey2 = this.stageX / 92	// $data.squareList数组的第二维数组的key
					this.findSquare(arrayKey1, arrayKey2)
				}

			}
		}, this.gameChessboard)
		this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_BEGIN, e => {
			if (e.target.parent instanceof Square) {
				e.target.parent.fill.source = e.target.parent.fill.source.replace(/(\d)_png$/, '$1--active_png')
			}
		}, this.gameChessboard)
		this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_END, e => {
			if (e.target.parent instanceof Square) {
				e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png')
			}
		}, this.gameChessboard)
		this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, e => {
			if (e.target.parent instanceof Square) {
				e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png')
			}
		}, this.gameChessboard)
		this.gameChessboard.addEventListener(egret.TouchEvent.TOUCH_CANCEL, e => {
			if (e.target.parent instanceof Square) {
				e.target.parent.fill.source = e.target.parent.fill.source.replace(/--active_png$/, '_png')
			}
		}, this.gameChessboard)

	}

	/**
	 * 寻找目标方块的方法
	 */
	public findSquare(x: number, y: number): void {
		//	这个寻找规则需要更改 4个for循环寻找目标方块
		//	有一个arrayKey1 = 0 和 arrayKey1 = 10 的情况
		this.collisionArray = []
		let squareList = $data.squareList
		let level = squareList[x][y] // 所点击方块的level

		if (squareList[x][y] !== 0) {
			//	点击方块 生成一个方块

			// this.gameOver()
			this.creatNumber()
			AudioManager.playSound('error_mp3')

		} else {
			//	上寻
			if (x != 0) {
				for (let i = x - 1; i >= 0; i--) {

					if (squareList[i][y] !== 0) {
						this.collisionArray.push(i * 10 + y)
					}
				}
			}
			//	右训
			if (y != 7) {
				for (let i = y + 1; i <= 7; i++) {
					if (squareList[x][i] !== 0) {
						this.collisionArray.push(x * 10 + i)
					}
				}
			}

			// console.log(y)
			//	下寻
			if (x != 9) {
				for (let i = x + 1; i <= 9; i++) {
					if (squareList[i][y] !== 0) {
						this.collisionArray.push(i * 10 + y)
					}
				}
			}
			//	左寻
			if (y != 0) {
				for (let i = y - 1; i >= 0; i--) {
					if (squareList[x][i] !== 0) {
						this.collisionArray.push(x * 10 + i)
					}
				}
			}
		}
		// console.log("vvvvvvv", this.collisionArray)
		this.disposeCollisionArrat(x, y, this.collisionArray)
	}

	/**
	 * 对碰撞数组进行处理
	 * @param x 点击方块的一维数组的下标
	 * @param y 点击方块的二维数组的下标
	 * @param levelArray 从$data.squareList中提出的 等级数组	levelArray的key 等于this.collisionArray数组的key
	 * @param keyArray 存放相同level的key
	 */
	public disposeCollisionArrat(x: number, y: number, disposeArray: any[]): void {
		let a = []
		let levelArray = []
		let keyArray = []
		a = disposeArray
		// this.collisionArray
		//	生成一个level数组 判断哪些方块需要合成
		for (let i = 0; i < a.length; i++) {
			//  ox 从a中提出的 一维数组的下标
			//  oy 从a中提出的 二维数组的下标
			let ox = (a[i] - a[i] % 10) / 10
			let oy = a[i] % 10
			let level = $data.squareList[ox][oy]
			levelArray.push(level)
		}
		// console.log("levelArray", levelArray)
		//	生成key数组 存放需要合成的方块的key
		let initNumber = Number(levelArray.slice().sort((a, b) => b - a).toString().concat(',0,0,').match(/(\d+),\1,/)[1])
		for (let i = 0; i < levelArray.length; i++) {
			if (levelArray[i] === initNumber) {
				keyArray.push(i)
			}
		}
		//	判断可以合成的方块之间有没有挡着的方块
		let disposeSquare: number
		for (let i = keyArray.length - 1; i >= 0; i--) {
			//	ox disposeSquare数组中提出的 一维数组的下标
			//	ox disposeSquare数组中提出的 二维数组的下标
			disposeSquare = a[keyArray[i]]
			let ox = (disposeSquare - disposeSquare % 10) / 10
			let oy = disposeSquare % 10
			if (oy === y) {
				//	Y轴方向
				if (ox < x) {
					//	Y轴正方向
					for (let j = x - 1; j > ox; j--) {
						if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				} else if (ox > x) {
					//	Y轴负方向
					for (let k = x + 1; k < ox; k++) {
						if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				}
			} else if (ox === x) {
				//	X轴方向
				if (oy > y) {
					//	X轴正方向
					for (let m = y + 1; m < oy; m++) {
						if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				} else if (oy < y) {
					//	X轴负方向
					for (let n = y - 1; n > oy; n--) {
						if ($data.squareList[x][n] !== initNumber && $data.squareList[x][n] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				}
			}
		}



		// //	判断是否有同向的方块
		// let key = true
		// let sameSquare: number
		// let sameList = []
		// // console.log("a", a)
		// // console.log("keyArray", keyArray)
		// for (let i = 0; i < keyArray.length; i++) {
		// 	sameList.push(a[keyArray[i]])
		// }
		// // console.log("sameList", sameList)
		// sameSquare = a[keyArray[0]]
		// let indexX = (sameSquare - sameSquare % 10) / 10
		// let indexY = sameSquare % 10
		// if (indexY == y && indexX < x) {
		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesX < x && coordinatesY == y) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}
		// } else if (indexY == y && indexX > x) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesX > x && coordinatesY == y) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}

		// } else if (indexX == x && indexY > y) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesY > y && coordinatesX == x) {
		// 			key = false
		// 		} else {
		// 			key = true
		// 		}
		// 	}

		// } else if (indexX == x && indexY < y) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesY < y && coordinatesX == x) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}

		// } else {
		// 	key = true
		// }


		// if (!key) {
		// 	for (let i = keyArray.length - 1; i >= 0; i--) {
		// 		a.splice(keyArray[i], 1)
		// 	}
		// }


		// console.log("数组", a)
		let excessiveArray = []
		for (let i = 0; i < a.length; i++) {
			let ox = (a[i] - a[i] % 10) / 10
			let oy = a[i] % 10
			if (initNumber === $data.squareList[ox][oy]) {
				excessiveArray.push(a[i])
			}

		}
		a = excessiveArray
		// console.log("之后的数组", a)
		if (a.length <= 1 && $data.squareList[x][y] === 0) {
			this.floorRepeat(this.collisionArray, x, y, initNumber)
		} else {
			let key = true

			if (key) {
				AudioManager.playSound('synthetic_mp3')
				for (let i = 0; i < a.length; i++) {
					//	进行操作

					let ox = (a[i] - a[i] % 10) / 10
					let oy = a[i] % 10

					egret.Tween.get($data.squareView[ox][oy]).to({ x: this.stageX, y: this.stageY }, 250).call(() => {
						egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(() => {

							let squareList2 = $data.squareList
							squareList2[ox][oy] = 0
							$data.squareList = squareList2
						})
					})
				}
				let score = a.length * initNumber
				let level = this.level(score)
				let totalScore = $data.score
				let maxScore: number
				//	当前游戏总分
				if ($data.squareList[x][y] !== 0) {
					totalScore += 0
					$data.score = totalScore
				} else {
					totalScore += 5 * Math.pow(level, 2)
					$data.score = totalScore
					//	点击次数
					this.syntheticNumber += 1
					if (5 * Math.pow(level, 2) > $data.maxScore) {
						maxScore = 5 * Math.pow(level, 2)
						$data.maxScore = maxScore
					}
				}
				this.gameTitleScore.text = `${$data.score}`
				let squareList1 = $data.squareList
				if ($data.squareList[x][y] === 0) {
					let timeOut = null
					timeOut = setTimeout(() => {
						$data.squareList = squareList1

						this.creatNumber()
						// this.gameOver()
					}, 600);
					squareList1[x][y] = Math.pow(2, level)
				}
			} else {

				this.creatNumber()
				// this.gameOver()
			}
		}
		// }

	}

	/**
	 * 解决点击位置大的方块被挡住 不能让小的合成的功能
	 */
	public floorRepeat(array: any[], x: number, y: number, n: number): void {
		let a = []
		let initNumber: number
		let levelArray = []
		let keyArray = []
		let aaaArray = []
		a = array
		//	生成一个level数组 判断那些方块需要合成
		for (let i = 0; i < a.length; i++) {
			//  ox 从a中提出的 一维数组的下标
			//  oy 从a中提出的 二维数组的下标
			let ox = (a[i] - a[i] % 10) / 10
			let oy = a[i] % 10
			let level = $data.squareList[ox][oy]
			levelArray.push(level)
		}
		for (let i = 0; i < levelArray.length; i++) {
			if (levelArray[i] === n) {
				levelArray[i] = 0
			}
		}
		//	生成key数组 存放需要合成的方块的key
		initNumber = Number(levelArray.slice().sort((a, b) => b - a).toString().concat(',0,0,').match(/(\d+),\1,/)[1])
		for (let i = 0; i < levelArray.length; i++) {
			if (levelArray[i] === initNumber) {
				keyArray.push(i)
			}
		}
		//	判断可以合成的方块之间有没有挡着的方块
		let disposeSquare: number
		for (let i = keyArray.length - 1; i >= 0; i--) {
			//	ox disposeSquare数组中提出的 一维数组的下标
			//	ox disposeSquare数组中提出的 二维数组的下标
			disposeSquare = a[keyArray[i]]
			let ox = (disposeSquare - disposeSquare % 10) / 10
			let oy = disposeSquare % 10
			if (oy === y) {
				//	Y轴方向
				if (ox < x) {
					//	Y轴正方向
					for (let j = x - 1; j > ox; j--) {
						if ($data.squareList[j][y] !== initNumber && $data.squareList[j][y] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				} else if (ox > x) {
					//	Y轴负方向
					for (let k = x + 1; k < ox; k++) {
						if ($data.squareList[k][y] !== initNumber && $data.squareList[k][y] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				}
			} else if (ox === x) {
				//	X轴方向
				if (oy > y) {
					//	X轴正方向
					for (let m = y + 1; m < oy; m++) {
						if ($data.squareList[x][m] !== initNumber && $data.squareList[x][m] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				} else if (oy < y) {
					//	X轴负方向
					for (let n = y - 1; n > oy; n--) {
						if ($data.squareList[x][n] !== initNumber && $data.squareList[x][n] !== 0) {
							a.splice(keyArray[i], 1)
							break
						}
					}
				}
			}
		}

		// //	判断是否有同向的方块
		// let key = true
		// let sameSquare: number
		// let sameList = []
		// for (let i = 0; i < keyArray.length; i++) {
		// 	sameList.push(a[keyArray[i]])
		// }
		// sameSquare = a[keyArray[0]]
		// let indexX = (sameSquare - sameSquare % 10) / 10
		// let indexY = sameSquare % 10
		// if (indexY == y && indexX < x) {
		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesX < x && coordinatesY == y) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}
		// } else if (indexY == y && indexX > x) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesX > x && coordinatesY == y) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}

		// } else if (indexX == x && indexY > y) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesY > y && coordinatesX == x) {
		// 			key = false
		// 		} else {
		// 			key = true
		// 		}
		// 	}

		// } else if (indexX == x && indexY < y) {

		// 	for (let i = 0; i < sameList.length; i++) {
		// 		let coordinatesX = (sameList[i] - sameList[i] % 10) / 10
		// 		let coordinatesY = sameList[i] % 10
		// 		if (coordinatesY < y && coordinatesX == x) {
		// 			key = false
		// 		} else {

		// 			key = true
		// 		}
		// 	}

		// } else {
		// 	key = true
		// }
		// if (!key) {
		// 	for (let i = keyArray.length - 1; i >= 0; i--) {
		// 		a.splice(keyArray[i], 1)
		// 	}
		// }

		console.log("删除操作之后的数组", a)
		let excessiveArray = []
		for (let i = 0; i < a.length; i++) {
			let ox = (a[i] - a[i] % 10) / 10
			let oy = a[i] % 10
			if (initNumber === $data.squareList[ox][oy]) {
				excessiveArray.push(a[i])
			}
		}
		a = excessiveArray
		console.log("a", a)

		if (array.length == 0) {

			this.creatNumber()
			// this.gameOver()
		} else if (n == 0) {
			AudioManager.playSound('error_mp3')

			this.creatNumber()
			// this.gameOver()
		} else if (initNumber !== n || initNumber === 0 && array != []) {
			if (a.length <= 1 && $data.squareList[x][y] === 0) {
				this.floorRepeat(array, x, y, initNumber)
			} else {
				let key: boolean
				key = true
				// let indexX = (a[0] - a[0] % 10) / 10
				// let indexY = a[0] % 10
				// console.log(indexX, indexY)
				// console.log(x, y)
				// if (indexY == y && indexX < x) {
				// 	for (let i = 0; i < a.length; i++) {
				// 		let coordinatesX = (a[i] - a[i] % 10) / 10
				// 		let coordinatesY = a[i] % 10
				// 		if (coordinatesX < x && coordinatesY == y) {
				// 			console.log("向上同向")
				// 			key = false
				// 		} else {

				// 			key = true
				// 		}
				// 	}
				// } else if (indexY == y && indexX > x) {

				// 	for (let i = 0; i < a.length; i++) {
				// 		let coordinatesX = (a[i] - a[i] % 10) / 10
				// 		let coordinatesY = a[i] % 10
				// 		if (coordinatesX > x && coordinatesY == y) {
				// 			console.log("向下同向")
				// 			key = false
				// 		} else {

				// 			key = true
				// 		}
				// 	}

				// } else if (indexX == x && indexY > y) {

				// 	for (let i = 0; i < a.length; i++) {
				// 		let coordinatesX = (a[i] - a[i] % 10) / 10
				// 		let coordinatesY = a[i] % 10
				// 		if (coordinatesY > y && coordinatesX == x) {
				// 			console.log("向右同向")
				// 			key = false
				// 		} else {
				// 			key = true
				// 		}
				// 	}

				// } else if (indexX == x && indexY < y) {

				// 	for (let i = 0; i < a.length; i++) {
				// 		let coordinatesX = (a[i] - a[i] % 10) / 10
				// 		let coordinatesY = a[i] % 10
				// 		if (coordinatesY < y && coordinatesX == x) {
				// 			console.log("向左同向")
				// 			key = false
				// 		} else {

				// 			key = true
				// 		}
				// 	}

				// } else {
				// 	key = true
				// }
				if (key) {
					AudioManager.playSound('synthetic_mp3')
					for (let x = 0; x < a.length; x++) {
						for (let y = 0; y < a.length; y++) {
						}
					}
					for (let i = 0; i < a.length; i++) {
						//	进行操作

						let ox = (a[i] - a[i] % 10) / 10
						let oy = a[i] % 10

						egret.Tween.get($data.squareView[ox][oy]).to({ x: this.stageX, y: this.stageY }, 250).call(() => {
							egret.Tween.get($data.squareView[ox][oy]["fill"]).to({ scaleX: 0, scaleY: 0 }, 250).call(() => {

								let squareList2 = $data.squareList
								squareList2[ox][oy] = 0
								$data.squareList = squareList2
							})
						})
					}
					let score = a.length * initNumber
					let level = this.level(score)
					let totalScore = $data.score
					let maxScore: number
					//	当前游戏总分
					if ($data.squareList[x][y] !== 0) {
						totalScore += 0
						$data.score = totalScore
					} else {
						totalScore += 5 * Math.pow(level, 2)
						$data.score = totalScore
						//	点击次数
						this.syntheticNumber += 1
						if (5 * Math.pow(level, 2) > $data.maxScore) {
							maxScore = 5 * Math.pow(level, 2)
							$data.maxScore = maxScore
						}
					}
					this.gameTitleScore.text = `${$data.score}`
					let squareList1 = $data.squareList
					if ($data.squareList[x][y] === 0) {
						let timeOut = null
						timeOut = setTimeout(() => {
							$data.squareList = squareList1

							this.creatNumber()
							// this.gameOver()
						}, 600);
						squareList1[x][y] = Math.pow(2, level)
					}
				} else {
					// this.gameOver()
					this.creatNumber()

				}
			}
		} else {
			this.floorRepeat(array, x, y, initNumber)
		}
	}

	/**
	 * 根据方块分数计算方块等级
	 */
	public level(n: number): number {
		let level = Math.floor(Math.log2(n))
		return level
	}

	/**
	 * 点击操作生成方块
	 */
	public creatSquare() {
		let creatArray = []
		for (let i = 0; i < $data.squareList.length; i++) {
			for (let j = 0; j < $data.squareList[i].length; j++) {
				if ($data.squareList[i][j] === 0) {
					creatArray.push(i * 10 + j)
				}
			}
		}
		this.creatLenth = creatArray.length > 0 ? creatArray.length : 0
		let randomLent = Math.floor(Math.random() * (this.creatLenth - 1))
		let randomNumber = creatArray[randomLent]
		let randomX = (randomNumber - randomNumber % 10) / 10
		let randomY = randomNumber % 10
		let squareList4 = $data.squareList
		squareList4[randomX][randomY] = this.againRandom()
		$data.squareList = squareList4
	}

	/**
	 * 方块生成权重
	 */
	public squareRandom(): number {
		let rand = Math.random()
		if (rand <= .83) {
			return 0
		} else if (rand > .83 && rand <= .89) {
			return 2
		} else if (rand > .89 && rand < .93) {
			return 4
		} else if (rand > .93 && rand < .96) {
			return 8
		} else if (rand > .96 && rand < .99) {
			return 16
		} else {
			return 32
		}
	}

	/**
	 * 方块重新生成权重
	 */
	public againRandom(): number {
		let rand = Math.random()
		if (rand <= .35) {
			return 2
		} else if (rand > .35 && rand <= .58) {
			return 4
		} else if (rand > .58 && rand < .76) {
			return 8
		} else if (rand > .76 && rand < .89) {
			return 16
		} else if (rand > .89 && rand < 1) {
			return 32
		}
	}
	/**
	 * 方块生成
	 */
	public creatNumber(): void {
		let num = Math.floor(Math.random() * 2)
		let key: boolean = true
		console.log("this.creatLenth", this.creatLenth)
		if (this.creatLenth <= 3) {
			num = 1
		}
		for (let i = 0; i <= num; i++) {
			this.creatSquare()
		}
		for (let i = 0; i < $data.squareList.length; i++) {
			for (let j = 0; j < $data.squareList[i].length; j++) {
				if ($data.squareList[i][j] == 0) {
					key = true
					break
				} else {
					key = false
				}
			}
		}
		if (!key && this.creatLenth == 0) {
			console.log('--------------')
			let level = this.level($data.maxScore)
			// console.log("maxScore", $data.maxScore)
			let gold = $data.gold
			if ($data.maxScore === 0) {
				level = 2
			}
			gold = this.syntheticNumber + 10 * (level - 2)
			$data.gold = gold
			$dispatch(TYPES.GAME_OVER)
			//	清空上局金币和分数
			$data.maxScore = 0
			$data.score = 0
		}
		let timeOut2 = null
		timeOut2 = setTimeout(() => {
			this.gameChessboard.touchEnabled = true
		}, 500)
	}

	/**
	 * gameOver
	 */



	public gameOver(): void {


	}
}