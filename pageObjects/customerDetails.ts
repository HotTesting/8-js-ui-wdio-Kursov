

export class CustomerDetails {

    private get customerDetailsContainer() {
        return $('div[id=box-checkout-customer]')
    }

    private get firstName() {
        return new Input($('input[name=firstname]'))
    }

    private get lastName() {
        return new Input($('input[name=lastname]'))
    }

    private get address1() {
        return new Input($('input[name=address1]'))
    }

    private get postalCode() {
        return new Input($('input[name=postcode]'))
    }

    private get city() {
        return new Input($('input[name=city]'))
    }

    private get country() {
        return $('select[name=country_code]')
    }

    private get email() {
        return new Input($('input[name=email]'))
    }

    private get phone() {
        return new Input($('input[name=phone]'))
    }

    isFormDisplayed() {
        if(this.customerDetailsContainer.isDisplayed()) {
            return true
        } else {
            return false
        }
    }

    fillForm(CustomerData) {
        this.firstName.type(CustomerData.firstName)
        this.lastName.type(CustomerData.lastName)
        this.address1.type(CustomerData.address1)
        this.postalCode.type(CustomerData.postalCode)
        this.city.type(CustomerData.city)
        this.email.type(CustomerData.email)
        this.phone.type(CustomerData.phone)

        this.country.click()
        browser.keys("u")
        browser.keys("u")
        browser.keys("Enter")
    }
}

class Input {
    container

    constructor(itemContainer) {
        this.container = itemContainer
    }

    public type(value) {
        this.container.click()
        this.container.setValue(value)
    }
    
}