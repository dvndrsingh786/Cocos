import { _decorator, Component, Node } from 'cc';
import { GameManager } from './GameManager';
import { References } from './References';
const { ccclass, property } = _decorator;

@ccclass('DatabaseHandler')
export class DatabaseHandler extends Component {

    static instance:DatabaseHandler=null;

    @property
    AffID:number=0;

    @property
    currentData:any=null;

    @property
    leadersData:any=null;

    @property
    loginLink:string="http://playtrophygames.com/PTGService.svc/AffLogin?Username=";

    @property
    summaryLink:string="http://playtrophygames.com/PTGService.svc/GetTournamentSummary?AffID=";

    start() {
        DatabaseHandler.instance=this;
    }

    LoginCall()
    {
        let request = new XMLHttpRequest();
        // request.open("GET", "http://playtrophygames.com/PTGService.svc/AffLogin?Username=TestAdmin&Password=Testing123");
        request.open("GET", this.loginLink+References.instance.loginBox.string+"&Password="
        +References.instance.passwordBox.string);
        request.send();
        References.instance.loadingPanel.active=true;
        References.instance.loginPanel.active=false;
        request.onload=()=>{
            console.log(request.status);
            if(request.status==200)
            {   
               const obj=JSON.parse(request.response);
               console.log(request.response);
            
            if(obj.AffLoginResult.Error.IsSuccess)
            {
               this.AffID=obj.AffLoginResult.AffID;
               this.SummaryFetch();
            }
            else
            References.instance.loginPanel.active=true;
            }
            References.instance.loadingPanel.active=false;
        }
    }

    SummaryFetch(){
        
        console.log("Summary display");
        let request = new XMLHttpRequest();
        // request.open("GET", "http://playtrophygames.com/PTGService.svc/AffLogin?Username=TestAdmin&Password=Testing123");
        request.open("GET", this.summaryLink+this.AffID);
        request.send();
        console.log("Summary display1");
        request.onload=()=>{
            console.log(request.status);
            if(request.status==200)
            {   
                const obj=JSON.parse(request.response);
                console.log(request.response);
                if(obj.GetTournamentSummaryResult.Error.IsSuccess)
                {
                    this.currentData=obj.GetTournamentSummaryResult.SummaryList;
                    if(GameManager.instance.updateWeeklyToo)
                    {

                    }
                    else
                    {
                        GameManager.instance.ShowDataInUi();
                    }
                }
                else
                {

                }
            }
            References.instance.loadingPanel.active=false;
        }
    }

    LeadersFetch()
    {
        let request = new XMLHttpRequest();
        // request.open("GET", "http://playtrophygames.com/PTGService.svc/AffLogin?Username=TestAdmin&Password=Testing123");
        request.open("GET", this.loginLink+References.instance.loginBox.string+"&Password="
        +References.instance.passwordBox.string);
        request.send();
        References.instance.loadingPanel.active=true;
        References.instance.loginPanel.active=false;
        request.onload=()=>{
            console.log(request.status);
            if(request.status==200)
            {   
               const obj=JSON.parse(request.response);
               console.log(request.response);
            
            if(obj.AffLoginResult.Error.IsSuccess)
            {
               this.AffID=obj.AffLoginResult.AffID;
               this.SummaryFetch();
            }
            else
            References.instance.loginPanel.active=true;
            }
            References.instance.loadingPanel.active=false;
        }
    }
    
}

