/**
 - verify prices in cart, and after order created
 - verify order is successful
 - Prefer css selectors 
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - You SHOULD use PageObjects for this tests
 - Use mocha before/after hooks to reuse pre/post conditions
 - Use ChaiJS (expect, should or assert style) to make assertions
 */
import { App } from '../../pageObjects/application';
import { expect } from 'chai';
 //const chai = require('chai');
 //const expect = chai.expect;
 //chai.should();

// Each implemented test gives you 15 points
describe("Order", function() {

    beforeEach(function() {
        //browser.url('http://ip-5236.sunline.net.ua:38015/')
        browser.reloadSession()
        browser.setWindowSize(1440, 800)
        browser.pause(1000)
    });
    
    it("is successful for regular item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3
        // Just regular duck without discounts, parameters, or sold out      
        App.product.open('/rubber-ducks-c-1/red-duck-p-3')        
        const productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCart', productNameInCart)
        console.log('productPriceInCart', productPriceInCart)

        expect(productNameInCart).to.equal(productDetails.name)
        expect(productPriceInCart).to.equal(productDetails.price)

        App.checkout.customerDetails.fillForm
        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm2({
            email: '',
            lastName: ''
        })
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
    });
    
    it("is successful for discounted item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/blue-duck-p-4 
        // this duck always has discount 20%
        App.product.open('/rubber-ducks-c-1/blue-duck-p-4')        
        const productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCart', productNameInCart)
        console.log('productPriceInCart', productPriceInCart)

        expect(productNameInCart).to.equal(productDetails.name)
        expect(productPriceInCart).to.equal(productDetails.price)

        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm()
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
    });
  
    it("is successful for sold out item", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/purple-duck-p-5 
        // this duck always sold out
        App.product.open('rubber-ducks-c-1/purple-duck-p-5')        
        const productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCart', productNameInCart)
        console.log('productPriceInCart', productPriceInCart)

        expect(productNameInCart).to.equal(productDetails.name)
        expect(productPriceInCart).to.equal(productDetails.price)

        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm()
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
    });
  
    it("is successful for 2 same items in card", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/red-duck-p-3
        // Just regular duck without discounts, parameters, or sold our
        App.product.open('rubber-ducks-c-1/red-duck-p-3')        
        const productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCart', productNameInCart)
        console.log('productPriceInCart', productPriceInCart)

        expect(productNameInCart).to.equal(productDetails.name)
        expect(productPriceInCart).to.equal(productDetails.price)

        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm()
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
    });
  
    it("is successful for 2 different items in card", function() {
        //first duck check
        App.product.open('rubber-ducks-c-1/purple-duck-p-5')        
        let productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCartPositionFirst = App.checkout.shoppingCart.items[0].getProductName()
        const productPriceInCartPositionFirst = App.checkout.shoppingCart.items[0].getProductPrice()

        console.log('productNameInCartPositionFirst', productNameInCartPositionFirst)
        console.log('productPriceInCartPositionFirst', productPriceInCartPositionFirst)

        expect(productNameInCartPositionFirst).to.equal(productDetails.name)
        expect(productPriceInCartPositionFirst).to.equal(productDetails.price)

        //second duck check
        App.product.open('rubber-ducks-c-1/blue-duck-p-4')        
        productDetails = App.product.getProductDetails()
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true

        const productNameInCartPositionSecond = App.checkout.shoppingCart.items[1].getProductName()
        const productPriceInCartPositionSecond = App.checkout.shoppingCart.items[1].getProductPrice()

        console.log('productNameInCartPositionSecond', productNameInCartPositionSecond)
        console.log('productPriceInCartPositionSecond', productPriceInCartPositionSecond)

        expect(productNameInCartPositionSecond).to.equal(productDetails.name)
        expect(productPriceInCartPositionSecond).to.equal(productDetails.price)

        //fill the fom and make order
        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm()
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
    });
  
    it("is successful for items with parameters", function() {
        // http://ip-5236.sunline.net.ua:38015/rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6 
        // this duck has 3 sizes - small, medium, large. Each size has own price. Verify that price calculated correctly
         
        let sum = 5 //includes delivery
        
        //first duck check       
        App.product.open('rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6')  
        let productDetails = App.product.getProductDetails()
        App.product.chooseAnOption(1)
        let adjust = App.product.adjustPrice(0)
        App.product.addToCart()
        App.checkout.open()

        expect(App.checkout.isItemsInCart()).to.be.true
        let productPriceInCartPositionFirst = App.checkout.shoppingCart.items[0].getProductPrice()
        console.log('productPriceInCartPositionFirst', productPriceInCartPositionFirst)
        console.log('adjust', adjust)
        console.log('productDetails.price', productDetails.price)
        expect(productPriceInCartPositionFirst).to.equal(productDetails.price + adjust)
        sum += productPriceInCartPositionFirst

        //second duck check      
        App.product.open('rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6')  
        productDetails = App.product.getProductDetails()
        App.product.chooseAnOption(2)
        adjust = App.product.adjustPrice(1)
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true
        
        let productPriceInCartPositionSecond = App.checkout.shoppingCart.items[1].getProductPrice()
        console.log('productPriceInCartPositionSecond', productPriceInCartPositionSecond)
        console.log('adjust', adjust)
        console.log('productDetails.price', productDetails.price)
        expect(productPriceInCartPositionSecond).to.equal(productDetails.price + adjust)
        sum += productPriceInCartPositionSecond

        //third duck check      
        App.product.open('rubber-ducks-c-1/premium-ducks-c-2/vip-yellow-duck-p-6')  
        productDetails = App.product.getProductDetails()
        App.product.chooseAnOption(3)
        adjust = App.product.adjustPrice(2)
        App.product.addToCart()
        App.checkout.open()
        expect(App.checkout.isItemsInCart()).to.be.true
        
        let productPriceInCartPositionThird = App.checkout.shoppingCart.items[2].getProductPrice()
        console.log('productPriceInCartPositionSecond', productPriceInCartPositionThird)
        console.log('adjust', adjust)
        console.log('productDetails.price', productDetails.price)
        expect(productPriceInCartPositionThird).to.equal(productDetails.price + adjust)
        sum += productPriceInCartPositionThird

        //fill the fom and make order
        expect(App.checkout.customerDetails.isFormDisplayed()).to.be.true
        App.checkout.customerDetails.fillForm()
        browser.pause(1000)

        const paymentOfOrder = App.checkout.browsePaymentDue()

        expect(App.checkout.submitButton.isEnabled()).to.be.true
        App.checkout.submitButton.click()
        browser.pause(1000)
        expect(App.checkout.confirmOrderButton.isEnabled()).to.be.true
        App.checkout.confirmOrderButton.click()
        browser.pause(3000)

        expect(App.orderSuccess.isOrderSuccessContainerVisible).to.be.true
        console.log('orderTotalData = ', App.orderSuccess.orderTotal)

        expect(paymentOfOrder == parseFloat(App.orderSuccess.orderTotal))
        console.log('sum = ', sum)
        expect(paymentOfOrder == sum)
    });
});
