import { Image} from "./image";
export { Image} from "./image"
import { Author} from "./author";
export { Author} from "./author"

export class Book {

    constructor (
        public id : number,
        public isbn : string,
        public title : string,
        public published : Date,
        public user_id : number,
        public price: number,
        public count: number,
        public authors? : Author[],
        public subtitle? : string,
        public rating? : number,
        public images? : Image[],
        public description? : string
    ){

    }
}
