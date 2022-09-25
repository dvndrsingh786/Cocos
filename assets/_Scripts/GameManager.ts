import { _decorator, Component, Node, TiledMap, EditBox } from 'cc';
import { DatabaseHandler } from './DatabaseHandler';
import { References } from './References';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    static instance:GameManager=null;

    @property
    automaticLogin:boolean=true;

    @property
    updateLeadersToo:boolean=true;

    @property
    currentData:any=null;

    @property
    leadersData:any=null;

    start() 
    {
        GameManager.instance=this;
        if(this.automaticLogin)
        {
            this.scheduleOnce(function(){
                this.DelayedInitialize();
            },0.1);
        }
    }

    DelayedInitialize(){
        References.instance.loginBox.string="TestAdmin";
        References.instance.passwordBox.string="Testing123";
        DatabaseHandler.instance.LoginCall();
    }
    
    ShowDataInUi()
    {
        //#region Set Current Standings
        for(let i=0;i<6;i++)
        {
            References.instance.currentStandingsObjs[i].SetMyData(this.currentData[i].TournID,
                this.GetCorresSpriteFrame(this.currentData[i].ClientID),this.currentData[i].User1,this.currentData[i].User2,this.currentData[i].User3,
                this.currentData[i].Score1,this.currentData[i].Score2,this.currentData[i].Score3);
        }
        //#endregion
        //#region Set Weekly Data
        for(let i = 0;i<this.leadersData.length;i++)
        {
            let k = 1;
            for(let j = 0; j<this.leadersData.length;j++)
            {
                if(i!=j)
                {
                    if(this.leadersData[i].Jackpot==this.leadersData[j].Jackpot && this.leadersData[i].Jackpot == "Weekly")
                    {
                        if(this.leadersData[i].Amount<this.leadersData[j].Amount)k++;
                    }
                }
            }
            if(k==1)References.instance.weeklyFirst.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
            else if(k==2)References.instance.weeklySecond.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
            else References.instance.weeklyThird.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
        }
        //#endregion
        //#region Set Daily Data
        
        for(let i = 0;i<this.leadersData.length;i++)
        {
            let k = 1;
            for(let j = 0; j<this.leadersData.length;j++)
            {
                if(i!=j)
                {
                    if(this.leadersData[i].Jackpot==this.leadersData[j].Jackpot && this.leadersData[i].Jackpot == "Daily")
                    {
                        if(this.leadersData[i].Amount<this.leadersData[j].Amount)k++;
                    }
                }
            }
            if(k==1)References.instance.dailyFirst.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
            else if(k==2)References.instance.dailySecond.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
            else References.instance.dailyThird.string=this.GetStringWithColor(this.leadersData[i].Username,"000000");
        }

        //#endregion

        References.instance.resultScreen.active=true;
    }

    GetCorresSpriteFrame(_clientID:number)
    {
        for(let i=0;i<References.instance.spriteCodes.length;i++)
        {
            if(_clientID==References.instance.spriteCodes[i])
            {
                return References.instance.sprites[i];
            }
        }
        return null;
    }

    GetStringWithColor(message:string,colorCode:string)
    {
        let finalString;
        finalString="<color=#"+colorCode+">"+message+"</color>";
        return finalString;
    }
}