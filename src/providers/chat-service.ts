import { Injectable } from '@angular/core';
import {Subject } from 'rxjs/Rx';
import {WebSocketService } from './websocket-service';
import {AppGlobal} from '../app-global'

export interface Message {
	from: string
	to: string,
	command: string,
	content:Object,
	code:number
}

@Injectable()
export class ChatService {
	public messages: Subject<Message>;

	constructor(wsService: WebSocketService, _appGlobal:AppGlobal) {
		let wsUrl = _appGlobal.wsUrl + "?" + _appGlobal.loginedUser.userId;
		console.log(wsUrl);
		this.messages = <Subject<Message>>wsService
			.connect(wsUrl)
			.map((response: MessageEvent): Message => {
				console.log("receive data is:"+ response.data);
				let data = JSON.parse(response.data);
				return {
					from: data.from,
					to: data.to,
					command : data.command,
					content:data.content,
					code:data.code
				}
			});
	}
} 