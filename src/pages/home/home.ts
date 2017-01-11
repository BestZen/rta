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

  userMap: Object;
  answerMap: Object;
  @ViewChild('completerate') el_complete_rate: ElementRef;
  @ViewChild('answergroup') el_answer_group: ElementRef;

  chart_completerate:echarts.ECharts;
  chart_answergroup:echarts.ECharts;

  // 完成率 option
  option_completerate = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      series: [
        {
          name: '业务指标',
          type: 'gauge',
          detail: { formatter: '{value}%' },
          data: [{ value: 0, name: '完成率' }]
        }
      ]
    };

  // 答案分布 option
   option_answer_group = {
        backgroundColor: '#2c343c',
        title: {
          text: '答案分布',
          left: 'center',
          top: '20',
          textStyle: {
            color: '#ccc'
          }
        },

        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
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

  constructor(public navCtrl: NavController,
    private _chatService: ChatService,
    private _appGlobal: AppGlobal) {
  }

  ionViewDidLoad() {
    console.log(echarts); // works here
    this.chart_completerate = echarts.init(this.el_complete_rate.nativeElement);
    this.chart_answergroup = echarts.init(this.el_answer_group.nativeElement);

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
          case this._appGlobal.socketCommand.start:
            this.userMap = {};
            this.answerMap = {};
            this.option_completerate.series[0].data[0].value = 0;
            this.option_answer_group.series[0].data=[];
            break;
          case this._appGlobal.socketCommand.end:
            this.answerMap = null;
            this.userMap = null;
            break;
          case this._appGlobal.socketCommand.info:
            this.setOptionResult(msg.content);
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

  setOptionResult(result: Object) {
    this.count = result['room_member_size'];

    if(!result.hasOwnProperty("user_id")){
      return ;
    }
    if (this.userMap[result['user_id']] == undefined) {
      this.userMap[result['user_id']] = { name: result['user_name'], answer: result['user_answer'] }
    }
    if (this.answerMap[result['user_answer']] == undefined) {
      this.answerMap[result['user_answer']] = 1;
    } else {
      this.answerMap[result['user_answer']] = this.answerMap[result['user_answer']] + 1;
    }
    let completerate = Math.round(Object.keys(this.userMap).length / this.count * 100)
    //完成率

    this.option_completerate.series[0].data[0].value = completerate;
    this.chart_completerate.setOption(this.option_completerate);

    if (this.answerMap != null) {
      let data: Array<Object> = [];
      for (let property in this.answerMap) {
        if (property == undefined)
          continue;
        var item: Object = { value: this.answerMap[property], name: property };
        data.push(item);
      }
      // 答案分布
      this.option_answer_group.series[0].data=data;
      this.chart_answergroup.setOption(this.option_answer_group);
    }
  }

}
