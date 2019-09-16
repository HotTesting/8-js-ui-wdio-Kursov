class CustomerInfoData {
    //data to fill in the fields
    private testData = "test"
    private emailData = `test${new Date().getTime() / 1000}@test.com`
    private postCode = "12345"
    private phoneNumber = "123456789"

    //assignment of values
    firstName = this.testData
    lastName = this.testData
    address1 = this.testData
    postalCode  = this.postCode
    city = this.testData
    email = this.emailData
    phone = this.phoneNumber
}

export const CustomerData: CustomerInfoData = new CustomerInfoData()