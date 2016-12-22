
export class ResponseResult{
    constructor(public resutl:any,
        public status:string,
        public message:string){

    }
}

export interface Message {
	from: string
	to: string,
	command: string,
    code:string,
    result:Object
}