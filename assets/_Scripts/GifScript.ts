import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GifScript')
export class GifScript extends Component {
    
    @property({type:Sprite})
    targetSprite:Sprite=null;

    @property({type:[SpriteFrame]})
    targetSprites:Array<SpriteFrame> = [null,null];

    @property
    gifSpeed:number=0;

    @property
    repeat:boolean=false;

    onEnable()
    {
        
    }
}

