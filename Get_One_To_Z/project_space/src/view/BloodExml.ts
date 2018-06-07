class BloodExml extends eui.Component {
	public interfaceBloodGroup: eui.Group
	public interfaceBlood0: eui.Image
	public interfaceBlood1: eui.Image
	public interfaceBlood2: eui.Image
	public interfaceBlood3: eui.Image
	public interfaceBlood4: eui.Image
	public interfaceBlood5: eui.Image
	public interfaceBloodBorder: eui.Image
	public constructor() {
		super()
		this.skinName = "Exml.BloodExml"
	}
	/**
	 * @param type   1 加  2 减
	 */
	public InitChangeBlood(type:number){
		switch (type) {
			case 1 :
				if($Data.bloodNum < 5){
					$Data.bloodNum ++ 
				}
				for(let i = 1 ; i <= $Data.AbsBloodNum ; i++){
					if(i <= $Data.bloodNum){
						this["interfaceBlood"+i].visible = true
					}else{
						this["interfaceBlood"+i].visible = false
					}
				}
			break
			case 2 :
				if($Data.bloodNum > 0){
					$Data.bloodNum -- 
					for(let i = 1 ; i <= $Data.AbsBloodNum ; i++){
						if(i <= $Data.bloodNum){
							this["interfaceBlood"+i].visible = true
						}else{
							this["interfaceBlood"+i].visible = false
						}
					}
				}else{
					console.log("game_over")
				}
			break
		}
		
	}
}