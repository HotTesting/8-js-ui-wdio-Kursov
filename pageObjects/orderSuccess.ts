export class OrderSuccess {

    public get isOrderSuccessContainerVisible() {
        const text = $('#box-order-success').getText()
        if (text.includes('successfully completed')) {
            return true
        } else {
            return false
        }        
    }

    public get orderTotal() {
        const orderTotalData = $('div.box p:nth-last-child(2)').getText()
        if (orderTotalData.includes('$')){
            return orderTotalData.slice(14)
        } else {
            //write down function with another currency
            console.log('orderTotalData = ', orderTotalData)
        }
        
    }
}