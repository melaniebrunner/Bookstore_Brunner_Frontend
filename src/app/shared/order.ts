
import {Book} from "./book";
export {Book} from "./book";

export class Order {

    constructor (
        public id : number,
        public books : Book[],
        public state : number,
        public user_id : number,
        public net_amount? : number,
        public gross_amount? : number,
        public delivery_address? : string,
    ){

    }
}
