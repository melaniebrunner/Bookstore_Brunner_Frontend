import {Shoppingcart} from "./shoppingcart";

export class ShoppingCartFactory {
    static empty(): Shoppingcart {
        return new Shoppingcart([]);
    }

    static fromObject(rawCart: any): Shoppingcart {
        return new Shoppingcart(
            rawCart.orders
        );
    }
}
