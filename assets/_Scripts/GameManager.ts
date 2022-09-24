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
    updateWeeklyToo:boolean=true;

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
        if(this.automaticLogin)DatabaseHandler.instance.LoginCall();
    }
    
    ShowDataInUi()
    {

    }
}