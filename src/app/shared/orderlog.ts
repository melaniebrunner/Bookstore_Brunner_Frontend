
export class Orderlog {
    constructor (
        public id : number,
        public comment : string,
        public comment_admin : string,
        public order_id : number,
        public state : number,
        public username : string
    ){

    }
}
