import { _decorator, Component, Node, TiledMap, EditBox, RichText } from 'cc';
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
    updateDataTime:number=30;

    @property
    currentData:any=null;

    @property
    leadersData:any=null;

    @property
    lowerCaseAtTen:number=5.7;

    @property
    upperCaseAtTen:number=6.8;

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
            if(k==1)
            {
                References.instance.weeklyFirst.string=this.GetStringWithColor(this.leadersData[i].Username,"ffff00");
                References.instance.weeklyFirst.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.weeklyFirst.maxWidth);
            }
            else if(k==2)
            {
                References.instance.weeklySecond.string=this.GetStringWithColor(this.leadersData[i].Username,"0000ff");
                References.instance.weeklySecond.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.weeklySecond.maxWidth);
            }
            else
            {
                 References.instance.weeklyThird.string=this.GetStringWithColor(this.leadersData[i].Username,"ff0000");
                 References.instance.weeklyThird.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.weeklyThird.maxWidth);
            }
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
            if(k==1)
            {
                References.instance.dailyFirst.string=this.GetStringWithColor(this.leadersData[i].Username,"ffff00");
                References.instance.dailyFirst.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.dailyFirst.maxWidth);
            }
            else if(k==2)
            {
                References.instance.dailySecond.string=this.GetStringWithColor(this.leadersData[i].Username,"0000ff");
                References.instance.dailySecond.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.dailySecond.maxWidth);
            }
            else
            {
                 References.instance.dailyThird.string=this.GetStringWithColor(this.leadersData[i].Username,"ff0000");
                 References.instance.dailyThird.fontSize=
                this.GetTextSize(this.leadersData[i].Username,References.instance.dailyThird.maxWidth);
            }
        }

        //#endregion

        References.instance.resultScreen.active=true;
        this.scheduleOnce(function()
        {
            this.FetchDataAgain();
        },this.updateDataTime)
    }

    FetchDataAgain()
    {
        References.instance.loadingPanel.active=true;
        References.instance.resultScreen.active=false;
        DatabaseHandler.instance.SummaryFetch();
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
    GetTextSize(textText:string, maxWidth:number):number
    {
        var numUpper = textText.length - textText.replace(/[A-Z]/g, '').length;
        var numLower=textText.length-numUpper;
        let a=numUpper*this.upperCaseAtTen;
        let b = numLower*this.lowerCaseAtTen;
        console.log(numLower);
        return ((maxWidth/(a+b))*10);
    }
}