class NumberExml extends eui.Component {
	public changeImageRes: eui.Image
	public indexArray: any[]
	public constructor(n: number, array: any[]) {
		super()
		this.skinName = "Exml.NumberExml"
		this.changeImage(n)
		this.indexArray = array
	}
	public changeImage(n: number) {
		switch (n) {
			case 1:
				this.changeImageRes.source = RES.getRes("interface-number-1_png")
				break
			case 2:
				this.changeImageRes.source = RES.getRes("interface-number-2_png")
				break
			case 3:
				this.changeImageRes.source = RES.getRes("interface-number-3_png")
				break
			case 4:
				this.changeImageRes.source = RES.getRes("interface-number-4_png")
				break
			case 5:
				this.changeImageRes.source = RES.getRes("interface-number-5_png")
				break
			case 6:
				this.changeImageRes.source = RES.getRes("interface-number-6_png")
				break
			case 7:
				this.changeImageRes.source = RES.getRes("interface-number-7_png")
				break
			case 8:
				this.changeImageRes.source = RES.getRes("interface-number-8_png")
				break
			case 9:
				this.changeImageRes.source = RES.getRes("interface-number-9_png")
				break
			case 10:
				this.changeImageRes.source = RES.getRes("interface-number-10_png")
				break
			case 11:
				this.changeImageRes.source = RES.getRes("interface-number-11_png")
				break
			case 12:
				this.changeImageRes.source = RES.getRes("interface-number-12_png")
				break
			case 13:
				this.changeImageRes.source = RES.getRes("interface-number-13_png")
				break
			case 14:
				this.changeImageRes.source = RES.getRes("interface-number-14_png")
				break
			case 15:
				this.changeImageRes.source = RES.getRes("interface-number-15_png")
				break
		}
	}
}