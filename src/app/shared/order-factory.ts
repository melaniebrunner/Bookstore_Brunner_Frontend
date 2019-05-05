import { Book } from './book';
import {Order} from "./order";

export class OrderFactory {
    static empty(): Order {
        return new Order(null, [], 0, 0, 0, 0,'');
    }

    static fromObject(rawOrder: any): Order {
        return new Order(
            rawOrder.id,
            rawOrder.books,
            rawOrder.state,
            rawOrder.user_id,
            rawOrder.net_amount,
            rawOrder.gross_amount,
            rawOrder.delivery_address
        );
    }
}
