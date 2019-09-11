export class CustomerDetails {
    customerDetailsForm

    constructor() {
        this.customerDetailsForm = new CustomerDetailsForm()
    }

    private get customerDetailsContainer() {
        return $('div[id=box-checkout-customer]')
    }

    private get firstName() {
        return $('input[name=firstname]')
    }

    private get lastName() {
        return $('input[name=lastname]')
    }

    private get address1() {
        return $('input[name=address1]')
    }

    private get postalCode() {
        return $('input[name=postcode]')
    }

    private get city() {
        return $('input[name=city]')
    }

    private get country() {
        return $('select[name=country_code]')
    }

    private get email() {
        return $('input[name=email]')
    }

    private get phone() {
        return $('input[name=phone]')
    }

    isFormDisplayed() {
        if(this.customerDetailsContainer.isDisplayed()) {
            return true
        } else {
            return false
        }
    }

    fillForm() {
        const testData = "test"
        const emailData = `test${new Date().getTime() / 1000}@test.com`

        this.firstName.click()
        browser.pause(1000)
        this.firstName.setValue(testData)

        this.lastName.click()
        browser.pause(1000)
        this.lastName.setValue(testData)

        this.address1.click()
        browser.pause(1000)
        this.address1.setValue(testData)

        this.postalCode.click()
        browser.pause(1000)
        this.postalCode.setValue("12345")

        this.city.click()
        browser.pause(1000)
        this.city.setValue(testData)

        this.email.click()
        browser.pause(1000)
        this.email.setValue(emailData)

        this.phone.click()
        browser.pause(1000)
        this.phone.setValue("123456789")

        this.country.click()
        browser.pause(1000)
        browser.keys("u")
        browser.keys("u")
        browser.keys("Enter")

    }
}

class CustomerDetailsForm {
    
};