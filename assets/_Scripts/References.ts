import { _decorator, Component, Node, EditBox, RichText, SpriteFrame } from 'cc';
import { CurrentStandingsScript } from './CurrentStandingsScript';
import { PopupScript } from './PopupScript';
const { ccclass, property } = _decorator;

@ccclass('References')
export class References extends Component {

    static instance:References =null;
    

    start(){
        References.instance=this;
    }

    @property({type:EditBox})
    loginBox;

    @property({type:EditBox})
    passwordBox;

    @property({type:Node})
    loginPanel;

    @property({type:Node})
    loadingPanel;

    @property({type:PopupScript})
    popUp;

    @property({type:Node})
    resultScreen;

    @property({type:[CurrentStandingsScript]})
    currentStandingsObjs;

    @property({type:RichText})
    dailyFirst:RichText;

    @property({type:RichText})
    dailySecond:RichText;

    @property({type:RichText})
    dailyThird:RichText;

    @property({type:RichText})
    weeklyFirst:RichText;

    @property({type:RichText})
    weeklySecond:RichText;

    @property({type:RichText})
    weeklyThird:RichText;

    @property({type:[SpriteFrame]})
    sprites:SpriteFrame[]=[null,null];

    @property
    spriteCodes:number[]=[2,3];


}

