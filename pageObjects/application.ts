import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { OrderSuccess } from './orderSuccess'


class Application {
    product = new ProductDetails()
    checkout = new Checkout()
    orderSuccess = new OrderSuccess()
}

export const App: Application = new Application()