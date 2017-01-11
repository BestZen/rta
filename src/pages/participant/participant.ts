import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService,Message } from '../../providers/chat-service'
import { WebSocketService} from '../../providers/websocket-service'
import { AppGlobal } from '../../app-global'
/*
  Generated class for the Participant page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-participant',
  templateUrl: 'participant.html',
    providers:[WebSocketService,ChatService]
})
export class ParticipantPage {

  roomID:string="";
  count:number = 10;
  //答题形式 SELECT ／TRUEFALSE
  quizType:string = "SELECT";
  //答题模式 SIMPLE /MATCH
  mode :string = "SIMPLE";

  connected:boolean = false;

  constructor(public navCtrl: NavController ,
    private _chatService:ChatService,
    private _appGlobal:AppGlobal) {

  }

  ionViewDidLoad() {
    console.log('Hello Participant Page');

    this._chatService.messages.subscribe(msg => {	
      if(msg.code === 1000){
        switch(msg.command){
          case this._appGlobal.socketCommand.joinRoom:
            this.connected = true;
            break;
          case this._appGlobal.socketCommand.closeRoom:
            this.connected = false;
            break;    
          case this._appGlobal.socketCommand.info:
            let content = msg.content;
            this.quizType = content['topic'];
            this.mode = content['scene'];
            break;  
        }
      }		
      console.log(msg);
		},error=>{
      console.log(error);
    });

  }

  start(){
    if(this.roomID == ""){
      return;
    }

    let enterRoom : Message = {
      command:this._appGlobal.socketCommand.joinRoom,
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{
        "room_num":this.roomID
      },
      code:0
    }

    this._chatService.messages.next(enterRoom);
  }

  end(){
    let exitRoom :Message = {
      command:this._appGlobal.socketCommand.closeRoom,
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{
        "room_num":this.roomID
      },
      code:0
    };
    this._chatService.messages.next(exitRoom);
  }

  answer(value){
    let answer:Message ={
      command:this._appGlobal.socketCommand.answer,
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{
        "text":value
      },
      code:0
    }
    this._chatService.messages.next(answer);
  }

  onSelected(value){
    this.answer(value);
  }
}
