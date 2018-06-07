class Square extends eui.Component {
	/**
	 * 方块类
	 */
	public fill: eui.Image
	public constructor(y: number, x: number, n: number) {
		super()
		this.skinName = "Exml.Square"
		this.x = x * 92
		this.y = y * 92
		this.width = 92
		this.height = 92
		if (n === 0) {
			this.fill.source = `game-square-1_png`
			this.alpha = 0
		} else {
			this.fill.source = `game-square-${Math.log2(n)}_png`
		}


	}
}