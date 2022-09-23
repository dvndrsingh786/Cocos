import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

class Error{
    @property
    IsSuccess:boolean;

    @property
    Message:string;
}

class AffLoginResult{
    @property
    AffID:number;

    @property({type:Error})
    Error;
}
@ccclass('Test1')
export class Test1 extends Component {

    @property({type:AffLoginResult})
    AffLoginResult;
}
