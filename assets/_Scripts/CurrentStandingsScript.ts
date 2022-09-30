import { _decorator, Component, Node, RichText, Sprite, SpriteFrame } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('CurrentStandingsScript')
export class CurrentStandingsScript extends Component {

    @property({type:RichText})
    tournamentId;

    @property({type:Sprite})
    profilePic;

    @property({type:RichText})
    username1;

    @property({type:RichText})
    username2;

    @property({type:RichText})
    username3;

    @property({type:RichText})
    score1;

    @property({type:RichText})
    score2;

    @property({type:RichText})
    score3;

    SetMyData(_tournamentId:string,dp:SpriteFrame,u1:string,u2:string,u3:string,sc1:string,sc2:string,sc3:string)
    {
        this.tournamentId.string= GameManager.instance.GetStringWithColor("#"+_tournamentId.toString(),"ffffff");
        this.profilePic.spriteFrame=dp;
        this.username1.string=GameManager.instance.GetStringWithColor(u1,"ffffff");
        this.username2.string=GameManager.instance.GetStringWithColor(u2,"ffffff");
        this.username3.string=GameManager.instance.GetStringWithColor(u3,"ffffff");
        this.score1.string=GameManager.instance.GetStringWithColor(sc1,"ffffff");
        this.score2.string=GameManager.instance.GetStringWithColor(sc2,"ffffff");
        this.score3.string=GameManager.instance.GetStringWithColor(sc3,"ffffff");
    }
}