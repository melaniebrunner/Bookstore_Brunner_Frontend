import {Orderlog} from "./orderlog";

export class OrderlogFactory {
    static empty(): Orderlog {
        return new Orderlog(null, "", "", 0, 0, "");
    }

    static fromObject(rawOrderlog: any): Orderlog {
        return new Orderlog(
            rawOrderlog.id,
            rawOrderlog.comment,
            rawOrderlog.comment_admin,
            rawOrderlog.order_id,
            rawOrderlog.state,
            rawOrderlog.username
        );
    }
}
