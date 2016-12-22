import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChatService,Message } from '../../providers/chat-service'
import { WebSocketService} from '../../providers/websocket-service'
import { AppGlobal } from '../../app-global'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[WebSocketService,ChatService]
})
export class HomePage {

  roomID:string="";
  count:number = 10;
  //答题形式 SELECT ／TRUEFALSE
  quizType:string = "SELECT";
  //答题模式 SIMPLE /MATCH
  mode :string = "SIMPLE";

  constructor(public navCtrl: NavController ,
    private _chatService:ChatService,
    private _appGlobal:AppGlobal) {

  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');

    let createRoom : Message = {
      command:"CREATE_ROOM",
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{},
      code:0
    }


    this._chatService.messages.subscribe(msg => {	
      if(msg.code === 1000){
        switch(msg.command){
          case this._appGlobal.socketCommand.createRoom:
              this.roomID = msg.content['room_num'];
            break;
          case this._appGlobal.socketCommand.joinRoom:
            break;
          case this._appGlobal.socketCommand.closeRoom:
            break;    
        }
      }		
      console.log(msg);
		},error=>{
      console.log(error);
    });

    setTimeout(()=>{
      this._chatService.messages.next(createRoom);
    },200);
  }

  onQuizChange(){
    console.log(this.quizType);
  }

  start(){
    let startInteract : Message = {
      command:this._appGlobal.socketCommand.start,
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{
        topic: this.quizType,
        scene: this.mode
      },
      code:0
    }

    this._chatService.messages.next(startInteract);
  }

  end(){
    let endInteract :Message = {
      command:this._appGlobal.socketCommand.end,
      from:this._appGlobal.loginedUser.userId,
      to:"SERVER",
      content:{
      },
      code:0
    }
    this._chatService.messages.next(endInteract);
  }

}
