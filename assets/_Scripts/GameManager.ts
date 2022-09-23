import { _decorator, Component, Node, TiledMap, EditBox } from 'cc';
import { Test1 } from './Test1';
// import * as request from 'request';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    
    
    Ssdasd:number=5;

    @property({type:EditBox})
    loginBox;

    @property({type:EditBox})
    passwordBox;

    @property({type:Node})
    loginPanel;

    @property({type:Node})
    loadingPanel;

    start() 
    {
        this.loginBox.string="TestAdmin";
        this.passwordBox.string="Testing123";
    }

    update(deltaTime: number) {
        
    }

    LoginCall()
    { 
        console.log(this.loginBox.string);
        console.log(this.passwordBox.string);
        let request = new XMLHttpRequest();
        // request.open("GET", "http://playtrophygames.com/PTGService.svc/AffLogin?Username=TestAdmin&Password=Testing123");
        request.open("GET", "http://playtrophygames.com/PTGService.svc/AffLogin?Username="+this.loginBox.string+"&Password="
        +this.passwordBox.string);
        request.send();
        this.loadingPanel.active=true;
        this.loginPanel.active=false;
        request.onload=()=>{
            console.log("2");
            console.log(request);
            console.log(request.status);
            if(request.status==200)
            {
                console.log(JSON.parse(request.response));
                
               console.log(JSON.stringify(JSON.parse(request.response)));
            }
            this.loadingPanel.active=false;
        }
    }
}

class Error
{
    IsSuccess:boolean;
    Message:String;
}

class AffLoginResult
{
    @property
    AffID:number;
    @property({type:Error}) 
    Error;
}


    // public class Root
    // {
    //     public AffLoginResult AffLoginResult { get; set; }
    // }
