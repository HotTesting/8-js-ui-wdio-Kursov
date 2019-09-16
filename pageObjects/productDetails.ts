import { Header } from './components/header';
import { Footer } from './components/footer';
import { ProductDetailsModel } from '../dataModels/ProductDetails';

export class ProductDetails {
    header = new Header();
    footer = new Footer();
    
    public get sizeSelector() {
        return $('select[name^=options]')
    }
    
    chooseAnOption(optionNumber) {
            const sizeSelector = $('select[name^=options]')
            sizeSelector.selectByIndex(optionNumber)
        }
        
    adjustPrice(optionNumber) {
        const selectorOption = $('select[name^=options] option:nth-child(' + (optionNumber + 2) + ')')
        return parseFloat( selectorOption.getAttribute('data-price-adjust') )
    }

    open(productPath) {
        browser.url(productPath)
    }

    addToCart() {
        const currentItemsInCart = this.header.getQuantity()
        $('button[name="add_cart_product"]').click()
        browser.waitUntil(() => {
            return this.header.getQuantity() > currentItemsInCart
        }, null, `Expected items in cart to be changed. 
        Current items: ${this.header.getQuantity()} items before ${currentItemsInCart}`)
    }

    isDiscount() {
        if ($('.sale br').isExisting()) {
            return true
        } else {
            return false
        }
    }

    public getProductPrice() {
        if (this.isDiscount()) {
            return parseFloat($('#box-product').getAttribute('data-price'))
        } else {
            let currentPriceData = $('#box-product span.price').getText()
            if (currentPriceData.includes('$')){
                return parseFloat(currentPriceData.slice(1))
            } else {
                //write down function with another currency
                console.log('Current price data = ', currentPriceData)
            }
        }
    }

    public getProductName() {
        return $('h1.title').getText()
    }

    public getProductDetails() {
        const productDetails = new ProductDetailsModel()

        productDetails.name = this.getProductName()
        productDetails.price = this.getProductPrice()

        return productDetails
    }
}