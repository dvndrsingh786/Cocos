import { _decorator, Component, Node, RichText } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('PopupScript')
export class PopupScript extends Component {
    
    @property({type:RichText})
    popUpText;

    EnablePopUp(_message:string)
    {
        this.popUpText.string=GameManager.instance.GetStringWithColor(_message,"000000");
        this.node.active=true;
    }

    onEnable()
    {
        console.log("On Enable");
        this.scheduleOnce(function(){
            this.node.active=false;
        },2);
    }

    onDisable()
    {
        console.log("On Disable")
    }
}

