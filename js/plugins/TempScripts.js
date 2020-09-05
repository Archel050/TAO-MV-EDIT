//=============================================================================
// TempScripts.js
//=============================================================================

var SDK = KDCore.SDK;
var Color = KDCore.Color;
//SDK._isRu = 0;
//==========================================================================================================================================================
//RESOLUTION
//==========================================================================================================================================================
//This plugin not done yet!!! 
(function() {
    SceneManager._screenWidth  = 1280;
    SceneManager._screenHeight = 720;
    SceneManager._boxWidth     = SceneManager._screenWidth;
    SceneManager._boxHeight    = SceneManager._screenHeight; 

    var _resolutionON = false;

    var _SceneManager_run = SceneManager.run;
    SceneManager.run = function(sceneClass) {
        _SceneManager_run.call(this, sceneClass);
        if (Utils.isMobileDevice()) return;
        if (Utils.isMobileSafari()) return;
        if (Utils.isAndroidChrome()) return;
        var resizeWidth = Graphics.boxWidth - window.innerWidth;
        var resizeHeight = Graphics.boxHeight - window.innerHeight;
        window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);
        window.resizeBy(resizeWidth, resizeHeight);

        if(SceneManager._screenWidth > (816 + 64) || SceneManager._screenHeight  > (624 + 64)) {
            _resolutionON = true;
            Resolution.setup();
        }
    };

    var Resolution = function() {
        throw new Error('This is a static class');
    }

    Resolution.SW = 816;
    Resolution.SH = 624;

    Resolution.isOn = function() {
        return (_resolutionON == true);
    }

    Resolution.setup = function() {
        this.startX = (Graphics.width - Resolution.SW) / 2;
        this.startY = (Graphics.height - Resolution.SH) / 2;
    }

    Resolution.realX = function(x,w) {
        if(x > Resolution.SW) {
            var z = Graphics.width - (x + w);
            if(z >= 0) {
                var z2 = this.realW() - w;
                return z2 - Math.abs(z);
            }
        } else
            return this.startX + x;
    }

    Resolution.realY = function(y, h) {
        if(y > Resolution.SH) {
            var z = Graphics.height - (y + h);
            if(z >= 0) {
                var z2 = this.realH() - h;
                return z2 - Math.abs(z);
            }
        } else
            return this.startY + y;
    }

    Resolution.realH = function() {
        return (Graphics.height - this.startY);
    }

    Resolution.realW = function() {
        return (Graphics.width - this.startX);
    }


    Resolution.realDimensionW = function(value) {
        if(value == Graphics.width) {
            return Resolution.SW;
        } 

        if(value > Resolution.SW) {
            var z = value - Resolution.SW;
            value = Resolution.SW - z;
            return value;
        }

        return value; 
    }

    Resolution.realDimensionH = function(value) {
        if(value == Graphics.height) {
            return Resolution.SH;
        }

        if(value > Resolution.SH) {
            var z = value - Resolution.SH;
            value = Resolution.SH - z;
            return value;
        }

        return value;
    }

    var _alias4342 = Window_Base.prototype.initialize;
    Window_Base.prototype.initialize = function(x, y, width, height) {
        _alias4342.call(this, x,y,width,height);
        this.needStrongWH = true; //Don't apply realDimension function
    }

	Window_Base.prototype.toCenterR = function() {
        if(!Resolution.isOn()) return;
        var newX = Resolution.realX(this.x, this.width);
        var newY = Resolution.realY(this.y, this.height);
        var newW = this.width;
        var newH = this.height;
        if(this.needStrongWH == false) {
            newW = Resolution.realDimensionW(this.width);
            newH = Resolution.realDimensionH(this.height);

            if((newW + newX) > Resolution.SW) {
                newW = newW - Math.abs((Resolution.SW + Resolution.startX) - (newW + newX));
            }

            if((newH + newY) > Resolution.SH) {
                newH = newH - Math.abs((Resolution.SH + Resolution.startY) - (newH + newY));
            }
        }
        this.move(newX,newY,newW,newH);
    }

    var _aliasSB09888 = Scene_MenuBase.prototype.createHelpWindow;
    Scene_MenuBase.prototype.createHelpWindow = function() {
        _aliasSB09888.call(this);
        this._helpWindow.needStrongWH = false;
        this._helpWindow.toCenterR();
    };

    var _alias5949 = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alias5949.call(this);
        this._commandWindow.toCenterR();
    }

    var _alias7644 = Scene_Menu.prototype.createGoldWindow;
    Scene_Menu.prototype.createGoldWindow = function() {
        _alias7644.call(this);
        this._goldWindow.toCenterR();
    }

    var _alias76446 = Scene_Menu.prototype.createStatusWindow;
    Scene_Menu.prototype.createStatusWindow = function() {
        _alias76446.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

    var _aliasSE_43242 = Scene_Equip.prototype.createStatusWindow;
    Scene_Equip.prototype.createStatusWindow = function() {
        _aliasSE_43242.call(this);
        this._statusWindow.toCenterR();
    }

    var _aliasSE_32122 = Scene_Equip.prototype.createCommandWindow;
    Scene_Equip.prototype.createCommandWindow = function() {
        var x = Graphics.boxWidth; 
        Graphics.boxWidth = Resolution.SW;
        _aliasSE_32122.call(this);
        Graphics.boxWidth = x;
        if(!Resolution.isOn()) return;
        this._commandWindow.needStrongWH = true;
        this._commandWindow.toCenterR();
    }

    var _aliasSE_36555 = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _aliasSE_36555.call(this);
        if(!Resolution.isOn()) return;
        var wy = this._commandWindow.y + this._commandWindow.height;
        this._slotWindow.needStrongWH = false;
        this._slotWindow.toCenterR();
        this._slotWindow.y = wy;
    }

    var _aliasSE_54333 = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        _aliasSE_54333.call(this);
        if(!Resolution.isOn()) return;
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y = this._statusWindow.y + this._statusWindow.height;
    }

    var _aliasSI_54333 = Scene_Item.prototype.createCategoryWindow;
    Scene_Item.prototype.createCategoryWindow = function() {
        var x = Graphics.boxWidth; 
        Graphics.boxWidth = Resolution.SW;
        _aliasSI_54333.call(this);
        Graphics.boxWidth = x;
        this._categoryWindow.needStrongWH = false;
        this._categoryWindow.toCenterR();
    }

    var _aliasSI_65765 = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _aliasSI_65765.call(this);
        if(!Resolution.isOn()) return;
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y =  this._categoryWindow.y + this._categoryWindow.height;

        if(Imported && Imported.AlphaABS) {
            this._itemWindow._absPanel.x = this._itemWindow.width - Resolution.startX - this._itemWindow._absPanel.width;
            this._itemWindow._absPanel.y = this._itemWindow.height - this._itemWindow._absPanel.height - 10;
            this._itemWindow._absPanel.visible = true;
        }

        this._itemWindow.refresh();

    }

    var _alias432423 = Scene_Skill.prototype.createSkillTypeWindow;
    Scene_Skill.prototype.createSkillTypeWindow = function() {
        _alias432423.call(this);
        this._skillTypeWindow.toCenterR();
    }

    var _alias4324232 = Scene_Skill.prototype.createStatusWindow;
    Scene_Skill.prototype.createStatusWindow = function() {
        _alias4324232.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

    var _alias43242322 = Scene_Skill.prototype.createItemWindow;
    Scene_Skill.prototype.createItemWindow = function() {
        _alias43242322.call(this);
        this._itemWindow.needStrongWH = false;
        this._itemWindow.toCenterR();
        if(!Resolution.isOn()) return;
        this._itemWindow.height = this._itemWindow.height + Resolution.startY;
        this._itemWindow.y =  this._statusWindow.y + this._statusWindow.height;

        if(Imported && Imported.AlphaABS) {
            this._itemWindow._absPanel.x = this._itemWindow.width - Resolution.startX - this._itemWindow._absPanel.width;
            this._itemWindow._absPanel.y = this._itemWindow.height - this._itemWindow._absPanel.height - 10;
        }
    }

    var _aliasSS_4324 = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _aliasSS_4324.call(this);
        this._statusWindow.needStrongWH = false;
        this._statusWindow.toCenterR();
    }

})();
