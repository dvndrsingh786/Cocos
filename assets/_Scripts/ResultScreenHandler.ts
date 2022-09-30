import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResultScreenHandler')
export class ResultScreenHandler extends Component {
    
    @property({type:[Node]})
    leftEffects:Array<Node>=[null];

    @property({type:[Node]})
    rightEffects:Array<Node>=[null];

    @property
    min:number=5;

    @property
    max:number=10;

    onEnable()
    {
        this.TriggerEffects();
    }

    TriggerEffects()
    {
        // console.log(this.GetRandom());
        let leftNumber=this.GetRandom();
        if(leftNumber<6.66)this.scheduleOnce(function(){this.EnableLeftEffects(0);},this.GetRandom());
        else if(leftNumber<8.2)this.scheduleOnce(function(){this.EnableLeftEffects(1);},this.GetRandom());
        else this.scheduleOnce(function(){this.EnableLeftEffects(2);},this.GetRandom());

        let rightNumber=this.GetRandom();
        if(rightNumber<6.66)this.scheduleOnce(function(){this.EnableRightEffects(0);},this.GetRandom());
        else if(rightNumber<8.2)this.scheduleOnce(function(){this.EnableRightEffects(1);},this.GetRandom());
        else this.scheduleOnce(function(){this.EnableRightEffects(2);},this.GetRandom());
        if(this.node.active)
        {
            this.scheduleOnce(function()
            {
                this.TriggerEffects();
            },this.max*2);
        }
    }

    EnableLeftEffects(enableCode:number)
    {
        if(enableCode==0)
        {
            this.leftEffects[0].active=true;
            this.leftEffects[1].active=true;
        }
        else if(enableCode==1)
        {
            this.leftEffects[0].active=true;
            this.leftEffects[2].active=true;
        }
        else 
            this.leftEffects[1].active=true;
            this.leftEffects[2].active=true;
    }

    EnableRightEffects(enableCode:number)
    {
        if(enableCode==0)
        {
            this.rightEffects[0].active=true;
            this.rightEffects[1].active=true;
        }
        else if(enableCode==1)
        {
            this.rightEffects[0].active=true;
            this.rightEffects[2].active=true;
        }
        else 
        {
            this.rightEffects[1].active=true;
            this.rightEffects[2].active=true;
        }
    }
    
    GetRandom():number
    {
        return parseFloat((this.min + Math.random()*(this.max-this.min)).toFixed(2));
    }

}

