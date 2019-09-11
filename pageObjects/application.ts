import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { CustomerDetails } from './customerDetails'
import { OrderSuccess } from './orderSuccess'


class Application {
    product = new ProductDetails()
    checkout = new Checkout()
    customerDetails = new CustomerDetails()
    orderSuccess = new OrderSuccess()
}

export const App: Application = new Application()