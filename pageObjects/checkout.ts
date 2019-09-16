export class Checkout {
    shoppingCart

    constructor() {
        this.shoppingCart = new ShoppingCart()
    }

    private get noItemsLabel() {
        return $('.cart.wrapper em')
    }

    private get paymentDue() {
        return $('tfoot td:nth-child(2).text-right strong')
    }
    
    public get submitButton() {
        return $('button[name=save_customer_details]')
    }

    public get confirmOrderButton() {
        const buttonSelector = $('button[name=confirm_order]')
        buttonSelector.waitForEnabled(1000, false, 'Expected button to became enabled')
        return buttonSelector
    }

    browsePaymentDue() {
        const temp = this.paymentDue.getText()
        if (temp.includes('$')){
            return parseFloat(temp.slice(1))
        } else {
            //write down function with another currency
            console.log('Payment due = ', temp)
        }
    }

    open() {
        browser.url('/checkout')
        //wait for invisibility of checkout loader
        $(".loader").waitForDisplayed(5000, true, 'Expected checkout loader to became invisible')
    }

    isNoItemsInCart() {
        if(this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    isItemsInCart() {
        return !this.isNoItemsInCart()
    }
    
}

// Component
class ShoppingCart {
    private get container() {
        return $('#box-checkout-cart')
    }

    public get items() {
        return $$('table.items tr.item').map(item => {
            return new Item(item);
        })
    }
}

class Item {
    container

    constructor(itemContainer) {
        this.container = itemContainer
    }

    public getProductName() {
        return this.container.getAttribute('data-name')
    }

    public getProductPrice() {
        return parseFloat(this.container.getAttribute('data-price'))
    }
    
}