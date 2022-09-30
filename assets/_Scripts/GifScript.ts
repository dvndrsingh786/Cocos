import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GifScript')
export class GifScript extends Component {
    
    @property({type:Sprite})
    targetSprite:Sprite=null;

    @property({type:[SpriteFrame]})
    targetSprites:Array<SpriteFrame> = [null,null];

    @property
    gifSpeed:number=1;

    @property
    repeat:boolean=false;

    @property
    currentSpriteIndex:number=0;

    onEnable()
    {
        if(this.gifSpeed<=0)this.gifSpeed=0.01;
        this.currentSpriteIndex=0;
        this.targetSprite.spriteFrame=this.targetSprites[this.currentSpriteIndex];
        this.IncrementSprite();
    }

    IncrementSprite()
    {
        this.targetSprite.spriteFrame=this.targetSprites[this.currentSpriteIndex];
        this.currentSpriteIndex++;
        if(this.currentSpriteIndex>=this.targetSprites.length)
        {
            if(this.repeat)
            {
                this.currentSpriteIndex=0;
            }
            else
            {
                this.targetSprite.node.active=false;
                return;
            }
        }
        if(this.targetSprite.node.active)
        {
            this.scheduleOnce(function()
            {
                this.IncrementSprite();
            },0.1/this.gifSpeed);
        }
    }
}

