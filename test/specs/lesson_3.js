const assert = require('assert');
/**
 - Try to implement as much tests as you can
 - Do not overload tests with logic, be simple
 - browser.pause() allowed
 - copy/paste is allowed
 - prefer css selectors
 */

// Each implemented test gives you 15 points (max total - 45)
   describe("Items search", function() {
    it("should show results in case multiple items matches", function() {
        browser.url('/')
        const searchBar = $('input[type=search]')
        const searchInput = "duck"
        searchBar.setValue(searchInput)
        browser.keys("Enter")
        browser.pause(5000)

        //result review
        const breadCrumbs = $('a[href="http://ip-5236.sunline.net.ua:38015/search"]')
        assert(breadCrumbs.isExisting(), 'Breadcrumbs shoould match Search Result')
        let searchResult = $$('.col-xs-6,.col-sm-4,col-md-3')
        console.log('got result length = ', searchResult.length);
        assert(searchResult.length > 0, 'Search result more than zero')
        browser.pause(3000)
    });
  
    it("should redirect to item page in case only one result matches", function() {
        browser.url('http://ip-5236.sunline.net.ua:38015/')
        browser.pause(2000)
        const searchBar = $('input[type=search]')
        const searchInput = "RD003"
        searchBar.setValue(searchInput)
        browser.keys("Enter")
        browser.pause(5000)

        //result review
        const addCartButton = $('.btn[name=add_cart_product]')
        assert(addCartButton.isExisting(), 'Make sure this is a product page. Check add_to_cart button.')
        assert(addCartButton.isDisplayed(), 'add_to_cart button should be visible')
        browser.pause(3000)
    });
  
    it("should redirect to 'no matching results' in case no items matched", function() {
        browser.url('http://ip-5236.sunline.net.ua:38015/')
        browser.pause(2000)
        const searchBar = $('input[type=search]')
        const searchInput = "dog"
        searchBar.setValue(searchInput)
        browser.keys("Enter")
        browser.pause(5000)

        //result review
        const breadCrumbs = $('a[href="http://ip-5236.sunline.net.ua:38015/search"]')
        assert(breadCrumbs.isExisting(), 'Breadcrumbs shoould match Search Result')
        const resultMessage = $('div em')
        const text = resultMessage.getText()
        console.log('got No result message ', text)
        assert(text.includes('No matching results'), 'Make sure this is a search result page with such text')
        browser.pause(3000)
    });
  });  
  
  // Each implemented test gives you 20 points (max total - 40)
  describe("Search results sorting", function() {
    it("correctly arranges items when using 'by price' sorting", function() {
        browser.url('http://ip-5236.sunline.net.ua:38015/')
        const searchBar = $('input[type=search]')
        const searchInput = "duck"
        searchBar.setValue(searchInput)
        browser.keys("Enter")
        browser.pause(5000)
        const priceSortButton = $(' a[href="http://ip-5236.sunline.net.ua:38015/search?query=duck&page=1&sort=price"]')
        priceSortButton.click()
        browser.pause(3000)

        const searchResultArray = $$('.products strong , .products span')
        let currentPrice = 0
        for (let i = 0; i < searchResultArray.length; i++){
            temp = searchResultArray[i].getText()
            temp = temp.slice(1)
            console.log('MYTAG#1 search result item current price = ', temp);
            if (currentPrice <= temp) {
                currentPrice = temp
            } else {
                assert(currentPrice <= temp, 'current price sorting is wrong')
            }
        }
    });
  
    it("correctly arranges items when using 'by name' sorting", function() {
      browser.url('http://ip-5236.sunline.net.ua:38015/')
      const searchBar = $('input[type=search]')
      const searchInput = "duck"
      searchBar.setValue(searchInput)
      browser.keys("Enter")
      browser.pause(5000)
      const nameSortButton = $(' a[href="http://ip-5236.sunline.net.ua:38015/search?query=duck&page=1&sort=name"]')
      nameSortButton.click()
      browser.pause(3000)

      const searchResultArray = $$('.name')
      let sortedArray = new Array();
      let tempArray = new Array();
      for (let i = 0; i < searchResultArray.length; i++) {
        tempArray[i] = searchResultArray[i].getText();
      }
      sortedArray = tempArray.sort()

      for (let i = 0; i < searchResultArray.length; i++) {
        console.log('MYTAG#2 sortedArray[i] = ', sortedArray[i]);
        console.log('MYTAG#2 searchResultArray[i] = ', searchResultArray[i].getText());
        if (sortedArray[i] == searchResultArray[i].getText()) {
          console.log('success iteration ', i)
        } else {
          assert(sortedArray[i] != searchResultArray[i].getText(), 'current name sorting is wrong')
        }
      }
    });
  }); 
  
  // BONUS LEVEL - this test gives you 15 points
  describe("Contact us form", function() {
    it("must send messages to shop administration", function() {        
        browser.url('/customer-service-s-0')
        const nameInput = $('.col-md-6 .form-control[name=name]')
        const emailInput = $('.col-md-6 .form-control[name=email]')
        const subjectInput = $('.col-md-6 .form-control[name=subject]')
        const messageInput = $('.col-md-6 .form-control[name=message]')
        const sendButton = $('.btn[name=send]')
        nameInput.setValue('Test Name')
        emailInput.setValue('test@gmail.com')
        subjectInput.setValue('Test subject')
        messageInput.setValue('Test message')
        browser.pause(2000)
        sendButton.click()
        browser.pause(2000)

        const successMessage = $('#notices .alert-success')
        assert(successMessage.isDisplayed(), 'message sent, success message should be visible')
        const text = successMessage.getText()
        console.log('got message ', text)
        assert(text.includes('Your email has successfully been sent'), 'Message sent, success message is invalid')
    });
  });