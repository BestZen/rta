import { Component, ViewChild, ElementRef } from '@angular/core';
import *  as echarts from 'echarts';
import { NavController } from 'ionic-angular';
import { ChatService, Message } from '../../providers/chat-service';
import { WebSocketService } from '../../providers/websocket-service';
import { AppGlobal } from '../../app-global';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [WebSocketService, ChatService]
})
export class HomePage {

  roomID: string = "";
  count: number = 10;
  //答题形式 SELECT ／TRUEFALSE
  quizType: string = "SELECT";
  //答题模式 SIMPLE /MATCH
  mode: string = "SIMPLE";
  connected: boolean = false;

  @ViewChild('completerate') el_complete_rate: ElementRef;
  @ViewChild('answergroup') el_answer_group: ElementRef;

  constructor(public navCtrl: NavController,
    private _chatService: ChatService,
    private _appGlobal: AppGlobal) {

  }

  ionViewDidLoad() {
    let chart_completerate = echarts.init(this.el_complete_rate.nativeElement);
    let option_completerate = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: 50, name: '完成率' }]
        }
      ]
    };

    chart_completerate.setOption(option_completerate);
    console.log(echarts); // works here

    this.setOptionResult() ;
    this._chatService.messages.subscribe(msg => {
      if (msg.code === 1000) {
        switch (msg.command) {
          case this._appGlobal.socketCommand.createRoom:
            this.roomID = msg.content['room_num'];
            this.connected = true;
            break;
          case this._appGlobal.socketCommand.joinRoom:

            break;
          case this._appGlobal.socketCommand.closeRoom:
            break;
        }
      }
      console.log(msg);
    }, error => {
      console.log(error);
    });


  }

  onQuizChange() {
    console.log(this.quizType);
  }

  connect() {
    let createRoom: Message = {
      command: "CREATE_ROOM",
      from: this._appGlobal.loginedUser.userId,
      to: "SERVER",
      content: {},
      code: 0
    }

    setTimeout(() => {
      this._chatService.messages.next(createRoom);
    }, 200);
  }

  start() {
    let startInteract: Message = {
      command: this._appGlobal.socketCommand.start,
      from: this._appGlobal.loginedUser.userId,
      to: "SERVER",
      content: {
        topic: this.quizType,
        scene: this.mode
      },
      code: 0
    }

    this._chatService.messages.next(startInteract);
  }

  end() {
    let endInteract: Message = {
      command: this._appGlobal.socketCommand.end,
      from: this._appGlobal.loginedUser.userId,
      to: "SERVER",
      content: {
      },
      code: 0
    }
    this._chatService.messages.next(endInteract);
  }

  setOptionResult() {
    let option_answer_group = {
        backgroundColor: '#2c343c',
        title: {
            text: 'Customized Pie',
            left: 'center',
            top: '20',
            textStyle: {
                color: '#ccc'
            }
        },

        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:274, name:'联盟广告'},
                    {value:235, name:'视频广告'},
                    {value:400, name:'搜索引擎'}
                ].sort(function (a, b) { return a.value - b.value}),
                roseType: 'angle',
                label: {
                    normal: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        }
                    }
                }
            }
        ]
    };

    let chart_answergroup = echarts.init(this.el_answer_group.nativeElement);
    chart_answergroup.setOption(option_answer_group);
  }

}
