export class HeaderOld {
    headerCart:HeaderCart

    get container() {
        return $('#header')
    }

    constructor() {
        this.headerCart = new HeaderCart(() => this.container)
    } 
}

class HeaderCart {
    header

    get container() {
        return this.header().$('#cart')
    }

    constructor(header) {
        this.header = header
    }

    getQuantity(): number {
        let quantity = this.container.$('.quantity').getText()
        return parseInt(quantity)
    }
}

export class Header {
    get container() {
        return $('#header')
    }
    
    getQuantity(): number {
        let quantity = this.container.$('#cart .quantity').getText()
        return parseInt(quantity)
    }
}