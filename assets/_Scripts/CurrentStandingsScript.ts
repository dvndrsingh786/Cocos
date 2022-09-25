import { _decorator, Component, Node, RichText, Sprite, SpriteFrame } from 'cc';
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
        this.tournamentId.string= "#"+_tournamentId.toString();
        this.profilePic.SpriteFrame=dp;
        this.username1.string=u1;
        this.username2.string=u2;
        this.username3.string=u3;
        this.score1.string=sc1;
        this.score2.string=sc2;
        this.score3.string=sc3;
    }
}