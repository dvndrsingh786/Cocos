import { _decorator, Component, Node, EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('References')
export class References extends Component {

    static instance:References =null;
    

    start(){
        References.instance=this;
    }

    @property({type:EditBox})
    loginBox;

    @property({type:EditBox})
    passwordBox;

    @property({type:Node})
    loginPanel;

    @property({type:Node})
    loadingPanel;


}

