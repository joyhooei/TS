var egret = window.egret;window.Exml={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.styles = undefined;
generateEUI.skins = {}
generateEUI.paths['resource/exml/AddCoin.exml'] = window.Exml.AddCoin = (function (_super) {
	__extends(AddCoin, _super);
	var AddCoin$Skin1 = 	(function (_super) {
		__extends(AddCoin$Skin1, _super);
		function AddCoin$Skin1() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","add-tuijian--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","add-tuijian--disabled_png")
					])
			];
		}
		var _proto = AddCoin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "add-tuijian_png";
			t.percentWidth = 100;
			return t;
		};
		return AddCoin$Skin1;
	})(eui.Skin);

	function AddCoin() {
		_super.call(this);
		this.skinParts = ["addMask","addBackground","addTuijian","addTuijianBox"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.addTuijianBox_i()];
	}
	var _proto = AddCoin.prototype;

	_proto.addTuijianBox_i = function () {
		var t = new eui.Group();
		this.addTuijianBox = t;
		t.height = 1624;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.addMask_i(),this.addBackground_i(),this.addTuijian_i()];
		return t;
	};
	_proto.addMask_i = function () {
		var t = new eui.Rect();
		this.addMask = t;
		t.fillAlpha = 0.50;
		t.fillColor = 0x000000;
		t.height = 1624;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.addBackground_i = function () {
		var t = new eui.Image();
		this.addBackground = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "add-background_png";
		t.x = 75;
		t.y = 402;
		return t;
	};
	_proto.addTuijian_i = function () {
		var t = new eui.Button();
		this.addTuijian = t;
		t.height = 125;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 402;
		t.x = 174;
		t.y = 878;
		t.skinName = AddCoin$Skin1;
		return t;
	};
	return AddCoin;
})(eui.Skin);generateEUI.paths['resource/exml/BlockHomePage.exml'] = window.NewFile = (function (_super) {
	__extends(NewFile, _super);
	function NewFile() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 750;
		this.width = 1624;
	}
	var _proto = NewFile.prototype;

	return NewFile;
})(eui.Skin);generateEUI.paths['resource/exml/Clearing.exml'] = window.Exml.Clearing = (function (_super) {
	__extends(Clearing, _super);
	var Clearing$Skin2 = 	(function (_super) {
		__extends(Clearing$Skin2, _super);
		function Clearing$Skin2() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-game-return--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-game-return--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-game-return_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin2;
	})(eui.Skin);

	var Clearing$Skin3 = 	(function (_super) {
		__extends(Clearing$Skin3, _super);
		function Clearing$Skin3() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-challenge--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-challenge--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-challenge_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin3;
	})(eui.Skin);

	var Clearing$Skin4 = 	(function (_super) {
		__extends(Clearing$Skin4, _super);
		function Clearing$Skin4() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-more-game--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-more-game--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-more-game_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin4;
	})(eui.Skin);

	var Clearing$Skin5 = 	(function (_super) {
		__extends(Clearing$Skin5, _super);
		function Clearing$Skin5() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-share-record--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-share-record--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-share-record_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin5;
	})(eui.Skin);

	var Clearing$Skin6 = 	(function (_super) {
		__extends(Clearing$Skin6, _super);
		function Clearing$Skin6() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-rank-list--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-rank-list--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-rank-list_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin6;
	})(eui.Skin);

	var Clearing$Skin7 = 	(function (_super) {
		__extends(Clearing$Skin7, _super);
		function Clearing$Skin7() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-play-again--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-play-again--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-play-again_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin7;
	})(eui.Skin);

	var Clearing$Skin8 = 	(function (_super) {
		__extends(Clearing$Skin8, _super);
		function Clearing$Skin8() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","clearing-goldcoin--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","clearing-goldcoin--disabled_png")
					])
			];
		}
		var _proto = Clearing$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "clearing-goldcoin_png";
			t.percentWidth = 100;
			return t;
		};
		return Clearing$Skin8;
	})(eui.Skin);

	function Clearing() {
		_super.call(this);
		this.skinParts = ["clearingMask","clearingGameReturn","clearingResult","clearingScore","clearingBest","clearingFriendBest","clearingChallenge","clearingMoreGame","clearingShareRecord","clearingRankList","clearingPlayAgain","clearingAddGold","clearingGoldcoin"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.clearingMask_i(),this.clearingGameReturn_i(),this.clearingResult_i(),this.clearingScore_i(),this.clearingBest_i(),this.clearingFriendBest_i(),this.clearingChallenge_i(),this.clearingMoreGame_i(),this.clearingShareRecord_i(),this.clearingRankList_i(),this.clearingPlayAgain_i(),this.clearingAddGold_i(),this.clearingGoldcoin_i()];
	}
	var _proto = Clearing.prototype;

	_proto.clearingMask_i = function () {
		var t = new eui.Rect();
		this.clearingMask = t;
		t.fillAlpha = 0.80;
		t.fillColor = 0x000000;
		t.height = 1624;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.clearingGameReturn_i = function () {
		var t = new eui.Button();
		this.clearingGameReturn = t;
		t.height = 64;
		t.width = 64;
		t.x = 57;
		t.y = 176;
		t.skinName = Clearing$Skin2;
		return t;
	};
	_proto.clearingResult_i = function () {
		var t = new eui.Image();
		this.clearingResult = t;
		t.source = "clearing-result_png";
		t.x = 287;
		t.y = 346;
		return t;
	};
	_proto.clearingScore_i = function () {
		var t = new eui.Label();
		this.clearingScore = t;
		t.fontFamily = "SimHei";
		t.height = 72.5010070800781;
		t.size = 72.5010070800781;
		t.text = "0分";
		t.textAlign = "center";
		t.textColor = 0xF1ECD8;
		t.width = 426.501007080078;
		t.x = 166;
		t.y = 444;
		return t;
	};
	_proto.clearingBest_i = function () {
		var t = new eui.Image();
		this.clearingBest = t;
		t.source = "clearing-best_png";
		t.x = 142;
		t.y = 687;
		return t;
	};
	_proto.clearingFriendBest_i = function () {
		var t = new eui.Label();
		this.clearingFriendBest = t;
		t.fontFamily = "SimHei";
		t.height = 42;
		t.size = 42;
		t.text = "0分";
		t.textAlign = "center";
		t.textColor = 0xF1ECD8;
		t.width = 216;
		t.x = 320;
		t.y = 685;
		return t;
	};
	_proto.clearingChallenge_i = function () {
		var t = new eui.Button();
		this.clearingChallenge = t;
		t.height = 60;
		t.width = 105;
		t.x = 532;
		t.y = 676;
		t.skinName = Clearing$Skin3;
		return t;
	};
	_proto.clearingMoreGame_i = function () {
		var t = new eui.Button();
		this.clearingMoreGame = t;
		t.height = 130;
		t.width = 130;
		t.x = 505;
		t.y = 1175;
		t.skinName = Clearing$Skin4;
		return t;
	};
	_proto.clearingShareRecord_i = function () {
		var t = new eui.Button();
		this.clearingShareRecord = t;
		t.height = 130;
		t.width = 130;
		t.x = 311;
		t.y = 1175;
		t.skinName = Clearing$Skin5;
		return t;
	};
	_proto.clearingRankList_i = function () {
		var t = new eui.Button();
		this.clearingRankList = t;
		t.height = 130;
		t.width = 130;
		t.x = 115;
		t.y = 1175;
		t.skinName = Clearing$Skin6;
		return t;
	};
	_proto.clearingPlayAgain_i = function () {
		var t = new eui.Button();
		this.clearingPlayAgain = t;
		t.height = 120;
		t.width = 520;
		t.x = 115;
		t.y = 956;
		t.skinName = Clearing$Skin7;
		return t;
	};
	_proto.clearingAddGold_i = function () {
		var t = new eui.Label();
		this.clearingAddGold = t;
		t.fontFamily = "SimHei";
		t.height = 60;
		t.size = 60;
		t.text = "+0";
		t.textAlign = "center";
		t.textColor = 0xF1ECD8;
		t.width = 183;
		t.x = 232;
		t.y = 580;
		return t;
	};
	_proto.clearingGoldcoin_i = function () {
		var t = new eui.Button();
		this.clearingGoldcoin = t;
		t.height = 72;
		t.width = 74;
		t.x = 404;
		t.y = 574;
		t.skinName = Clearing$Skin8;
		return t;
	};
	return Clearing;
})(eui.Skin);generateEUI.paths['resource/exml/Game.exml'] = window.Exml.Game = (function (_super) {
	__extends(Game, _super);
	var Game$Skin9 = 	(function (_super) {
		__extends(Game$Skin9, _super);
		function Game$Skin9() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","game-stop-icon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","game-stop-icon--disabled_png")
					])
			];
		}
		var _proto = Game$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "game-stop-icon_png";
			t.percentWidth = 100;
			return t;
		};
		return Game$Skin9;
	})(eui.Skin);

	function Game() {
		_super.call(this);
		this.skinParts = ["gameBg","background","gameTitleScore","gameTitleUnit","gameTitleTop","gameTitleGroup","gameStopIcon","gameChessboard","parkDetailScroller","gameSquareRank","parkDetailView"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.gameBg_i(),this.background_i(),this.gameTitleGroup_i(),this.gameStopIcon_i(),this.gameChessboard_i(),this.parkDetailScroller_i(),this.parkDetailView_i()];
	}
	var _proto = Game.prototype;

	_proto.gameBg_i = function () {
		var t = new eui.Image();
		this.gameBg = t;
		t.source = "game-bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.background_i = function () {
		var t = new eui.Rect();
		this.background = t;
		t.fillColor = 0x3c332d;
		t.height = 110;
		t.width = 750;
		t.x = 0;
		t.y = 426;
		return t;
	};
	_proto.gameTitleGroup_i = function () {
		var t = new eui.Group();
		this.gameTitleGroup = t;
		t.height = 125;
		t.width = 248;
		t.x = 287;
		t.y = 199;
		t.elementsContent = [this.gameTitleScore_i(),this.gameTitleUnit_i(),this.gameTitleTop_i()];
		return t;
	};
	_proto.gameTitleScore_i = function () {
		var t = new eui.Label();
		this.gameTitleScore = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "SimHei";
		t.height = 69;
		t.size = 69;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xD26C37;
		t.width = 244;
		t.x = -35;
		t.y = 63;
		return t;
	};
	_proto.gameTitleUnit_i = function () {
		var t = new eui.Image();
		this.gameTitleUnit = t;
		t.source = "game-title-unit_png";
		t.x = 210;
		t.y = 71;
		return t;
	};
	_proto.gameTitleTop_i = function () {
		var t = new eui.Label();
		this.gameTitleTop = t;
		t.fontFamily = "SimHei";
		t.height = 24;
		t.size = 24;
		t.text = "TOP:0";
		t.textAlign = "center";
		t.textColor = 0x3C332D;
		t.width = 137;
		t.x = 21;
		t.y = -3;
		return t;
	};
	_proto.gameStopIcon_i = function () {
		var t = new eui.Button();
		this.gameStopIcon = t;
		t.height = 66;
		t.width = 66;
		t.x = 30;
		t.y = 174;
		t.skinName = Game$Skin9;
		return t;
	};
	_proto.gameChessboard_i = function () {
		var t = new eui.Group();
		this.gameChessboard = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 920;
		t.width = 736;
		t.x = 7;
		t.y = 555;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 200;
		t.width = 200;
		t.x = 310;
		t.y = 304;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 116.67;
		t.width = 145.45;
		return t;
	};
	_proto.parkDetailScroller_i = function () {
		var t = new eui.Scroller();
		this.parkDetailScroller = t;
		t.height = 110;
		t.width = 750;
		t.x = 0;
		t.y = 426;
		t.viewport = this._Group2_i();
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.width = 750;
		return t;
	};
	_proto.parkDetailView_i = function () {
		var t = new eui.Group();
		this.parkDetailView = t;
		t.anchorOffsetX = 0;
		t.height = 110;
		t.width = 750;
		t.x = 0;
		t.y = 426;
		t.elementsContent = [this.gameSquareRank_i()];
		return t;
	};
	_proto.gameSquareRank_i = function () {
		var t = new eui.Image();
		this.gameSquareRank = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "game-squareRank_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Game;
})(eui.Skin);generateEUI.paths['resource/exml/Home.exml'] = window.Exml.Home = (function (_super) {
	__extends(Home, _super);
	var Home$Skin10 = 	(function (_super) {
		__extends(Home$Skin10, _super);
		function Home$Skin10() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-hall-moregame--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-hall-moregame--disabled_png")
					])
			];
		}
		var _proto = Home$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-hall-moregame_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin10;
	})(eui.Skin);

	var Home$Skin11 = 	(function (_super) {
		__extends(Home$Skin11, _super);
		function Home$Skin11() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-hall-help-icon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-hall-help-icon--disabled_png")
					])
			];
		}
		var _proto = Home$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-hall-help-icon_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin11;
	})(eui.Skin);

	var Home$Skin12 = 	(function (_super) {
		__extends(Home$Skin12, _super);
		function Home$Skin12() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-hall-rank-icon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-hall-rank-icon--disabled_png")
					])
			];
		}
		var _proto = Home$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-hall-rank-icon_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin12;
	})(eui.Skin);

	var Home$Skin13 = 	(function (_super) {
		__extends(Home$Skin13, _super);
		function Home$Skin13() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-hall-tutorial-icon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-hall-tutorial-icon--disabled_png")
					])
			];
		}
		var _proto = Home$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-hall-tutorial-icon_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin13;
	})(eui.Skin);

	var Home$Skin14 = 	(function (_super) {
		__extends(Home$Skin14, _super);
		function Home$Skin14() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-hall-play-icon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-hall-play-icon--disabled_png")
					])
			];
		}
		var _proto = Home$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-hall-play-icon_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin14;
	})(eui.Skin);

	var Home$Skin15 = 	(function (_super) {
		__extends(Home$Skin15, _super);
		function Home$Skin15() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-get-gold--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-get-gold--disabled_png")
					])
			];
		}
		var _proto = Home$Skin15.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-get-gold_png";
			t.percentWidth = 100;
			return t;
		};
		return Home$Skin15;
	})(eui.Skin);

	function Home() {
		_super.call(this);
		this.skinParts = ["homeHallBg","homeHallPrompt","homeGameTitle","homeHallMoregame","homeHallHelpIcon","homeHallRankIcon","homeHallTutorialIcon","homeHallPlayIcon","homeHallGoldicon","homeBestScore","homeBestScoreicon","homeHallGold","homeGetGold"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.homeHallBg_i(),this.homeHallPrompt_i(),this.homeGameTitle_i(),this.homeHallMoregame_i(),this.homeHallHelpIcon_i(),this.homeHallRankIcon_i(),this.homeHallTutorialIcon_i(),this.homeHallPlayIcon_i(),this.homeHallGoldicon_i(),this.homeBestScore_i(),this.homeBestScoreicon_i(),this.homeHallGold_i(),this.homeGetGold_i()];
	}
	var _proto = Home.prototype;

	_proto.homeHallBg_i = function () {
		var t = new eui.Image();
		this.homeHallBg = t;
		t.source = "home-hall-bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.homeHallPrompt_i = function () {
		var t = new eui.Image();
		this.homeHallPrompt = t;
		t.source = "home-hall-prompt_png";
		t.x = 0;
		t.y = 1229;
		return t;
	};
	_proto.homeGameTitle_i = function () {
		var t = new eui.Image();
		this.homeGameTitle = t;
		t.source = "home-game-title_png";
		t.x = 126;
		t.y = 406;
		return t;
	};
	_proto.homeHallMoregame_i = function () {
		var t = new eui.Button();
		this.homeHallMoregame = t;
		t.anchorOffsetX = 47;
		t.anchorOffsetY = 46;
		t.height = 92;
		t.width = 94;
		t.x = 675;
		t.y = 306;
		t.skinName = Home$Skin10;
		return t;
	};
	_proto.homeHallHelpIcon_i = function () {
		var t = new eui.Button();
		this.homeHallHelpIcon = t;
		t.height = 144;
		t.width = 109;
		t.x = 101;
		t.y = 986;
		t.skinName = Home$Skin11;
		return t;
	};
	_proto.homeHallRankIcon_i = function () {
		var t = new eui.Button();
		this.homeHallRankIcon = t;
		t.anchorOffsetX = 0;
		t.height = 144;
		t.width = 98;
		t.x = 331;
		t.y = 986;
		t.skinName = Home$Skin12;
		return t;
	};
	_proto.homeHallTutorialIcon_i = function () {
		var t = new eui.Button();
		this.homeHallTutorialIcon = t;
		t.height = 144;
		t.width = 111;
		t.x = 543;
		t.y = 986;
		t.skinName = Home$Skin13;
		return t;
	};
	_proto.homeHallPlayIcon_i = function () {
		var t = new eui.Button();
		this.homeHallPlayIcon = t;
		t.height = 118;
		t.width = 204;
		t.x = 273;
		t.y = 807;
		t.skinName = Home$Skin14;
		return t;
	};
	_proto.homeHallGoldicon_i = function () {
		var t = new eui.Image();
		this.homeHallGoldicon = t;
		t.source = "home-hall-goldicon_png";
		t.x = 30;
		t.y = 175;
		return t;
	};
	_proto.homeBestScore_i = function () {
		var t = new eui.Label();
		this.homeBestScore = t;
		t.fontFamily = "SimHei";
		t.height = 70;
		t.size = 70;
		t.text = "0";
		t.textColor = 0xD26C37;
		t.width = 249;
		t.x = 392;
		t.y = 651;
		return t;
	};
	_proto.homeBestScoreicon_i = function () {
		var t = new eui.Label();
		this.homeBestScoreicon = t;
		t.fontFamily = "SimHei";
		t.height = 50;
		t.size = 50;
		t.text = "最高分：";
		t.textAlign = "center";
		t.textColor = 0x778D9A;
		t.width = 218;
		t.x = 164;
		t.y = 663;
		return t;
	};
	_proto.homeHallGold_i = function () {
		var t = new eui.Label();
		this.homeHallGold = t;
		t.fontFamily = "SimHei";
		t.height = 30;
		t.size = 30;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0x0B2C44;
		t.width = 102;
		t.x = 82;
		t.y = 191;
		return t;
	};
	_proto.homeGetGold_i = function () {
		var t = new eui.Button();
		this.homeGetGold = t;
		t.height = 62;
		t.width = 62;
		t.x = 183;
		t.y = 175;
		t.skinName = Home$Skin15;
		return t;
	};
	return Home;
})(eui.Skin);generateEUI.paths['resource/exml/HomeHelp.exml'] = window.Exml.HomeHelp = (function (_super) {
	__extends(HomeHelp, _super);
	var HomeHelp$Skin16 = 	(function (_super) {
		__extends(HomeHelp$Skin16, _super);
		function HomeHelp$Skin16() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-count-down--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-count-down--disabled_png")
					])
			];
		}
		var _proto = HomeHelp$Skin16.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-count-down_png";
			t.percentWidth = 100;
			return t;
		};
		return HomeHelp$Skin16;
	})(eui.Skin);

	var HomeHelp$Skin17 = 	(function (_super) {
		__extends(HomeHelp$Skin17, _super);
		function HomeHelp$Skin17() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","home-invite--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","home-invite--disabled_png")
					])
			];
		}
		var _proto = HomeHelp$Skin17.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "home-invite_png";
			t.percentWidth = 100;
			return t;
		};
		return HomeHelp$Skin17;
	})(eui.Skin);

	function HomeHelp() {
		_super.call(this);
		this.skinParts = ["homeMask","homeBackground","homeCountDown","homeAddCoin","homeTime","homeInvite","homeFire1","homeFire2","homeFire3","homeFire4","homeFire5"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.homeMask_i(),this.homeBackground_i(),this.homeCountDown_i(),this.homeAddCoin_i(),this.homeTime_i(),this.homeInvite_i(),this.homeFire1_i(),this.homeFire2_i(),this.homeFire3_i(),this.homeFire4_i(),this.homeFire5_i()];
	}
	var _proto = HomeHelp.prototype;

	_proto.homeMask_i = function () {
		var t = new eui.Rect();
		this.homeMask = t;
		t.fillAlpha = 0.50;
		t.fillColor = 0x000000;
		t.height = 1624;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.homeBackground_i = function () {
		var t = new eui.Image();
		this.homeBackground = t;
		t.source = "home-background_png";
		t.x = 70;
		t.y = 455;
		return t;
	};
	_proto.homeCountDown_i = function () {
		var t = new eui.Button();
		this.homeCountDown = t;
		t.enabled = false;
		t.height = 95;
		t.width = 300;
		t.x = 225;
		t.y = 951;
		t.skinName = HomeHelp$Skin16;
		return t;
	};
	_proto.homeAddCoin_i = function () {
		var t = new eui.Label();
		this.homeAddCoin = t;
		t.fontFamily = "SimHei";
		t.height = 80;
		t.size = 80;
		t.text = "+300";
		t.textAlign = "center";
		t.textColor = 0xFF5A2A;
		t.width = 235;
		t.x = 321;
		t.y = 795;
		return t;
	};
	_proto.homeTime_i = function () {
		var t = new eui.Label();
		this.homeTime = t;
		t.fontFamily = "SimHei";
		t.height = 44;
		t.size = 44;
		t.text = "60s";
		t.textAlign = "center";
		t.textColor = 0x6C6C6C;
		t.width = 106;
		t.x = 321;
		t.y = 973;
		return t;
	};
	_proto.homeInvite_i = function () {
		var t = new eui.Button();
		this.homeInvite = t;
		t.height = 95;
		t.width = 300;
		t.x = 225;
		t.y = 951;
		t.skinName = HomeHelp$Skin17;
		return t;
	};
	_proto.homeFire1_i = function () {
		var t = new eui.Image();
		this.homeFire1 = t;
		t.source = "home-fire-1_png";
		t.x = 116;
		t.y = 650;
		return t;
	};
	_proto.homeFire2_i = function () {
		var t = new eui.Image();
		this.homeFire2 = t;
		t.source = "home-fire-2_png";
		t.x = 225;
		t.y = 650;
		return t;
	};
	_proto.homeFire3_i = function () {
		var t = new eui.Image();
		this.homeFire3 = t;
		t.source = "home-fire-3_png";
		t.x = 330;
		t.y = 650;
		return t;
	};
	_proto.homeFire4_i = function () {
		var t = new eui.Image();
		this.homeFire4 = t;
		t.source = "home-fire-4_png";
		t.x = 440;
		t.y = 650;
		return t;
	};
	_proto.homeFire5_i = function () {
		var t = new eui.Image();
		this.homeFire5 = t;
		t.source = "home-fire-2_png";
		t.x = 545;
		t.y = 650;
		return t;
	};
	return HomeHelp;
})(eui.Skin);generateEUI.paths['resource/exml/RankList.exml'] = window.Exml.RankList = (function (_super) {
	__extends(RankList, _super);
	var RankList$Skin18 = 	(function (_super) {
		__extends(RankList$Skin18, _super);
		function RankList$Skin18() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","rank-previous--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","rank-previous--disabled_png")
					])
			];
		}
		var _proto = RankList$Skin18.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "rank-previous_png";
			t.percentWidth = 100;
			return t;
		};
		return RankList$Skin18;
	})(eui.Skin);

	var RankList$Skin19 = 	(function (_super) {
		__extends(RankList$Skin19, _super);
		function RankList$Skin19() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","rank-next--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","rank-next--disabled_png")
					])
			];
		}
		var _proto = RankList$Skin19.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "rank-next_png";
			t.percentWidth = 100;
			return t;
		};
		return RankList$Skin19;
	})(eui.Skin);

	var RankList$Skin20 = 	(function (_super) {
		__extends(RankList$Skin20, _super);
		function RankList$Skin20() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","rank-back--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","rank-back--disabled_png")
					])
			];
		}
		var _proto = RankList$Skin20.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "rank-back_png";
			t.percentWidth = 100;
			return t;
		};
		return RankList$Skin20;
	})(eui.Skin);

	var RankList$Skin21 = 	(function (_super) {
		__extends(RankList$Skin21, _super);
		function RankList$Skin21() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","rank-my-group--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","rank-my-group--disabled_png")
					])
			];
		}
		var _proto = RankList$Skin21.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "rank-my-group_png";
			t.percentWidth = 100;
			return t;
		};
		return RankList$Skin21;
	})(eui.Skin);

	function RankList() {
		_super.call(this);
		this.skinParts = ["rankMask","rankBackground","rankPrevious","rankNext","rankBack","rankTitleGroup","rankTitleFriend","rankRankGroup","rankMyBackground","rankMyGroupButton","rankMyTitle","rankMyGroup"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.rankMask_i(),this.rankRankGroup_i(),this.rankMyGroup_i()];
	}
	var _proto = RankList.prototype;

	_proto.rankMask_i = function () {
		var t = new eui.Rect();
		this.rankMask = t;
		t.fillAlpha = 0.8;
		t.fillColor = 0x000000;
		t.height = 1624;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rankRankGroup_i = function () {
		var t = new eui.Group();
		this.rankRankGroup = t;
		t.height = 965;
		t.width = 676;
		t.x = 37;
		t.y = 172;
		t.elementsContent = [this.rankBackground_i(),this.rankPrevious_i(),this.rankNext_i(),this.rankBack_i(),this.rankTitleGroup_i(),this.rankTitleFriend_i()];
		return t;
	};
	_proto.rankBackground_i = function () {
		var t = new eui.Image();
		this.rankBackground = t;
		t.source = "rank-background_png";
		t.x = 0;
		t.y = 115;
		return t;
	};
	_proto.rankPrevious_i = function () {
		var t = new eui.Button();
		this.rankPrevious = t;
		t.height = 70;
		t.width = 210;
		t.x = 75;
		t.y = 895;
		t.skinName = RankList$Skin18;
		return t;
	};
	_proto.rankNext_i = function () {
		var t = new eui.Button();
		this.rankNext = t;
		t.height = 70;
		t.width = 210;
		t.x = 392;
		t.y = 895;
		t.skinName = RankList$Skin19;
		return t;
	};
	_proto.rankBack_i = function () {
		var t = new eui.Button();
		this.rankBack = t;
		t.height = 86;
		t.width = 86;
		t.x = 0;
		t.y = 0;
		t.skinName = RankList$Skin20;
		return t;
	};
	_proto.rankTitleGroup_i = function () {
		var t = new eui.Image();
		this.rankTitleGroup = t;
		t.source = "rank-title-group_png";
		t.visible = false;
		t.x = 220;
		t.y = 132;
		return t;
	};
	_proto.rankTitleFriend_i = function () {
		var t = new eui.Image();
		this.rankTitleFriend = t;
		t.source = "rank-title-friend_png";
		t.x = 220;
		t.y = 134;
		return t;
	};
	_proto.rankMyGroup_i = function () {
		var t = new eui.Group();
		this.rankMyGroup = t;
		t.height = 94;
		t.width = 676;
		t.x = 37;
		t.y = 1174;
		t.elementsContent = [this.rankMyBackground_i(),this.rankMyGroupButton_i(),this.rankMyTitle_i()];
		return t;
	};
	_proto.rankMyBackground_i = function () {
		var t = new eui.Image();
		this.rankMyBackground = t;
		t.source = "rank-my-background_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rankMyGroupButton_i = function () {
		var t = new eui.Button();
		this.rankMyGroupButton = t;
		t.height = 61;
		t.width = 179;
		t.x = 470;
		t.y = 18;
		t.skinName = RankList$Skin21;
		return t;
	};
	_proto.rankMyTitle_i = function () {
		var t = new eui.Label();
		this.rankMyTitle = t;
		t.fontFamily = "SimHei";
		t.text = "我的分数";
		t.textColor = 0xd7e9ff;
		t.x = 42;
		t.y = 32;
		return t;
	};
	return RankList;
})(eui.Skin);generateEUI.paths['resource/exml/Share.exml'] = window.Exml.Share = (function (_super) {
	__extends(Share, _super);
	function Share() {
		_super.call(this);
		this.skinParts = ["shareTipsMask","shareTipsGroup","shareSuccessMask","shareCoin0","shareCoin1","shareCoin2","shareCoin3","shareCoin4","shareCoin5","shareCoin6","shareCoin7","shareCoin8","shareCoin9","shareCoin10","shareCoin11","shareCoinA","shareCoinB","shareCoinC","shareCoinD","shareSuccessClickMask","shareSuccessGroup"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.shareTipsGroup_i(),this.shareSuccessGroup_i()];
	}
	var _proto = Share.prototype;

	_proto.shareTipsGroup_i = function () {
		var t = new eui.Group();
		this.shareTipsGroup = t;
		t.height = 1334;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.shareTipsMask_i()];
		return t;
	};
	_proto.shareTipsMask_i = function () {
		var t = new eui.Rect();
		this.shareTipsMask = t;
		t.fillAlpha = 0.5;
		t.height = 2000;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.shareSuccessGroup_i = function () {
		var t = new eui.Group();
		this.shareSuccessGroup = t;
		t.height = 1334;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.shareSuccessMask_i(),this.shareCoin0_i(),this.shareCoin1_i(),this.shareCoin2_i(),this.shareCoin3_i(),this.shareCoin4_i(),this.shareCoin5_i(),this.shareCoin6_i(),this.shareCoin7_i(),this.shareCoin8_i(),this.shareCoin9_i(),this.shareCoin10_i(),this.shareCoin11_i(),this.shareCoinA_i(),this.shareCoinB_i(),this.shareCoinC_i(),this.shareCoinD_i(),this.shareSuccessClickMask_i()];
		return t;
	};
	_proto.shareSuccessMask_i = function () {
		var t = new eui.Rect();
		this.shareSuccessMask = t;
		t.fillAlpha = 0.5;
		t.height = 2000;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.shareCoin0_i = function () {
		var t = new eui.Image();
		this.shareCoin0 = t;
		t.source = "share-coin-0_png";
		t.x = 297;
		t.y = -246;
		return t;
	};
	_proto.shareCoin1_i = function () {
		var t = new eui.Image();
		this.shareCoin1 = t;
		t.source = "share-coin-1_png";
		t.x = 408;
		t.y = -256;
		return t;
	};
	_proto.shareCoin2_i = function () {
		var t = new eui.Image();
		this.shareCoin2 = t;
		t.source = "share-coin-2_png";
		t.x = 343.5;
		t.y = -255;
		return t;
	};
	_proto.shareCoin3_i = function () {
		var t = new eui.Image();
		this.shareCoin3 = t;
		t.source = "share-coin-3_png";
		t.x = 394;
		t.y = -248;
		return t;
	};
	_proto.shareCoin4_i = function () {
		var t = new eui.Image();
		this.shareCoin4 = t;
		t.source = "share-coin-4_png";
		t.x = 271.5;
		t.y = -241;
		return t;
	};
	_proto.shareCoin5_i = function () {
		var t = new eui.Image();
		this.shareCoin5 = t;
		t.source = "share-coin-5_png";
		t.x = 225;
		t.y = -252;
		return t;
	};
	_proto.shareCoin6_i = function () {
		var t = new eui.Image();
		this.shareCoin6 = t;
		t.source = "share-coin-0_png";
		t.x = 409;
		t.y = -242;
		return t;
	};
	_proto.shareCoin7_i = function () {
		var t = new eui.Image();
		this.shareCoin7 = t;
		t.source = "share-coin-1_png";
		t.x = 333;
		t.y = -256;
		return t;
	};
	_proto.shareCoin8_i = function () {
		var t = new eui.Image();
		this.shareCoin8 = t;
		t.source = "share-coin-2_png";
		t.x = 246;
		t.y = -248;
		return t;
	};
	_proto.shareCoin9_i = function () {
		var t = new eui.Image();
		this.shareCoin9 = t;
		t.source = "share-coin-3_png";
		t.x = 224;
		t.y = -236;
		return t;
	};
	_proto.shareCoin10_i = function () {
		var t = new eui.Image();
		this.shareCoin10 = t;
		t.source = "share-coin-4_png";
		t.x = 444;
		t.y = -247;
		return t;
	};
	_proto.shareCoin11_i = function () {
		var t = new eui.Image();
		this.shareCoin11 = t;
		t.source = "share-coin-5_png";
		t.x = 436;
		t.y = -250;
		return t;
	};
	_proto.shareCoinA_i = function () {
		var t = new eui.Image();
		this.shareCoinA = t;
		t.alpha = 0;
		t.source = "share-coin-7_png";
		t.x = 126;
		t.y = 694;
		return t;
	};
	_proto.shareCoinB_i = function () {
		var t = new eui.Image();
		this.shareCoinB = t;
		t.alpha = 0;
		t.source = "share-coin-8_png";
		t.x = 408;
		t.y = 766;
		return t;
	};
	_proto.shareCoinC_i = function () {
		var t = new eui.Image();
		this.shareCoinC = t;
		t.alpha = 0;
		t.source = "share-coin-9_png";
		t.x = 98;
		t.y = 772;
		return t;
	};
	_proto.shareCoinD_i = function () {
		var t = new eui.Image();
		this.shareCoinD = t;
		t.source = "share-coin-6_png";
		t.x = 136;
		t.y = 754;
		return t;
	};
	_proto.shareSuccessClickMask_i = function () {
		var t = new eui.Rect();
		this.shareSuccessClickMask = t;
		t.fillAlpha = 0;
		t.height = 2000;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return Share;
})(eui.Skin);generateEUI.paths['resource/exml/Square.exml'] = window.Exml.Square = (function (_super) {
	__extends(Square, _super);
	function Square() {
		_super.call(this);
		this.skinParts = ["fill"];
		
		this.height = 92;
		this.width = 92;
		this.elementsContent = [this.fill_i()];
	}
	var _proto = Square.prototype;

	_proto.fill_i = function () {
		var t = new eui.Image();
		this.fill = t;
		t.anchorOffsetX = 45;
		t.anchorOffsetY = 45;
		t.height = 90;
		t.source = "game-square-1_png";
		t.width = 90;
		t.x = 45;
		t.y = 45;
		return t;
	};
	return Square;
})(eui.Skin);generateEUI.paths['resource/exml/Stop.exml'] = window.Exml.Stop = (function (_super) {
	__extends(Stop, _super);
	var Stop$Skin22 = 	(function (_super) {
		__extends(Stop$Skin22, _super);
		function Stop$Skin22() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","stop-back-home--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","stop-back-home--disabled_png")
					])
			];
		}
		var _proto = Stop$Skin22.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "stop-back-home_png";
			t.percentWidth = 100;
			return t;
		};
		return Stop$Skin22;
	})(eui.Skin);

	var Stop$Skin23 = 	(function (_super) {
		__extends(Stop$Skin23, _super);
		function Stop$Skin23() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","stop-stop-share--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","stop-stop-share--disabled_png")
					])
			];
		}
		var _proto = Stop$Skin23.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "stop-stop-share_png";
			t.percentWidth = 100;
			return t;
		};
		return Stop$Skin23;
	})(eui.Skin);

	function Stop() {
		_super.call(this);
		this.skinParts = ["stopStopMask","stopStopBg","musicImg","stopBackHome","stopStopShare"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.stopStopMask_i(),this.stopStopBg_i(),this.musicImg_i(),this.stopBackHome_i(),this.stopStopShare_i()];
	}
	var _proto = Stop.prototype;

	_proto.stopStopMask_i = function () {
		var t = new eui.Rect();
		this.stopStopMask = t;
		t.fillAlpha = 0.50;
		t.fillColor = 0x000000;
		t.height = 1624;
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.stopStopBg_i = function () {
		var t = new eui.Image();
		this.stopStopBg = t;
		t.source = "stop-stop-bg_png";
		t.x = 75;
		t.y = 593;
		return t;
	};
	_proto.musicImg_i = function () {
		var t = new eui.Image();
		this.musicImg = t;
		t.height = 112;
		t.source = "stop-volume_png";
		t.width = 112;
		t.x = 320;
		t.y = 688;
		return t;
	};
	_proto.stopBackHome_i = function () {
		var t = new eui.Button();
		this.stopBackHome = t;
		t.height = 112;
		t.width = 112;
		t.x = 150;
		t.y = 688;
		t.skinName = Stop$Skin22;
		return t;
	};
	_proto.stopStopShare_i = function () {
		var t = new eui.Button();
		this.stopStopShare = t;
		t.height = 112;
		t.width = 112;
		t.x = 489;
		t.y = 688;
		t.skinName = Stop$Skin23;
		return t;
	};
	return Stop;
})(eui.Skin);generateEUI.paths['resource/exml/Tutorial.exml'] = window.Exml.Tutorial = (function (_super) {
	__extends(Tutorial, _super);
	var Tutorial$Skin24 = 	(function (_super) {
		__extends(Tutorial$Skin24, _super);
		function Tutorial$Skin24() {
			_super.call(this);
			this.skinParts = [];
			
			this.elementsContent = [this._Image1_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","tutorial-hall-returnicon--active_png")
					])
				,
				new eui.State ("disabled",
					[
						new eui.SetProperty("_Image1","source","tutorial-hall-returnicon--disabled_png")
					])
			];
		}
		var _proto = Tutorial$Skin24.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "tutorial-hall-returnicon_png";
			t.percentWidth = 100;
			return t;
		};
		return Tutorial$Skin24;
	})(eui.Skin);

	function Tutorial() {
		_super.call(this);
		this.skinParts = ["tutorialTutorialBg","tutorialTutorialPrompt","tutorialHallReturnicon"];
		
		this.height = 1624;
		this.width = 750;
		this.elementsContent = [this.tutorialTutorialBg_i(),this.tutorialTutorialPrompt_i(),this.tutorialHallReturnicon_i()];
	}
	var _proto = Tutorial.prototype;

	_proto.tutorialTutorialBg_i = function () {
		var t = new eui.Image();
		this.tutorialTutorialBg = t;
		t.source = "tutorial-tutorial-bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.tutorialTutorialPrompt_i = function () {
		var t = new eui.Image();
		this.tutorialTutorialPrompt = t;
		t.source = "tutorial-tutorial-prompt_png";
		t.x = 0;
		t.y = 1230;
		return t;
	};
	_proto.tutorialHallReturnicon_i = function () {
		var t = new eui.Button();
		this.tutorialHallReturnicon = t;
		t.height = 64;
		t.width = 246;
		t.x = 27;
		t.y = 175;
		t.skinName = Tutorial$Skin24;
		return t;
	};
	return Tutorial;
})(eui.Skin);