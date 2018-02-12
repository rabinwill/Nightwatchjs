module.exports = {
  'Demo test Imgur Login' : function Login (browser) {        //Step 1: Logging in to account
    browser
      .url('https://imgur.com/')
      //.pause(4000)    *******  rm now
      .waitForElementPresent('body',4000)                        //Wait until body is visible
      .waitForElementPresent('.topbar-icon.signin-register', 4000)    //waiting until the Sign In button is visible
      .click('.topbar-icon.signin-register')                          //Click on Sign In button
      .pause(4000)                                            //For Chrome
      .waitForElementVisible('body', 4000)                    //Waiting for the body of the login page to be visible
      .setValue('input[type=text]', 'ingurthriller7')         //Entering Username
      .click('.password')                                     //Clicking password field
      .setValue('input[name=password]', 'proprietaryInfo')        //Entering password
      .click('.btn.btn-action.right')                         //Clicking Login Button
      .pause(4000)
  },
  'Demo test Imgur Upload' : function Upload_File (browser) {  //Step 1: Uploading image
    browser
      .waitForElementPresent('.upload-button', 4000)            //wait until upload button is visible
      .click('.upload-button')                                  //click New Post button
      .pause(1000)
      .waitForElementPresent(".paste-url",4000)                //wait until URL field is visible
      .click('#paste-url-input')
      //Paste URL for image
      .setValue('#paste-url-input','https://www.builtinchicago.org/sites/www.builtinchicago.org/files/blogs/2017/tempus.jpg')
      .pause(5000)                                              //Waiting until upload completes
      .assert.elementPresent(".image.post-image")               //checking to see if new image Uploads successfully
      .pause(4000)                                              // More pause time for chome
  },
  'Demo test Imgur Search' : function Search (browser) {      //Step 2: Search
    browser
      .click('.search-icon-container')                        //Click Search button
      .clearValue('input[type=text]')
      .setValue('input[type=text]',"tempus\uE007")           //Enter text in search box
      .pause(2000)
      .waitForElementPresent(".search-term-text.sorting-text-align",4000)        //Wait until Search headline is visible
      .assert.urlEquals("https://imgur.com/search?q=tempus")  //Check to see if search query matches URL of the page

  /*    .getText(".search-term-text", function(result) {    //Se Notes in readme.md file
        var SIGNATURE = "chicago"
        var text = result.text
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(text, SIGNATURE);
      }); */
      .pause(2000)
  },
  'Demo test Imgur Random Page' : function Random_Mode (browser) {  //Step 3: Random Mode
    browser
      .elements('css selector', '.post', function (res) {           //Finding all the css selectors with .post
          var numOfPosts = res.value.length;                        //getting the length of the posts
          var randomPost = Math.floor(Math.random() * numOfPosts);   //Generating a random number
          var selectedPost = res.value[randomPost];                 //Getting the value of .post[randomNumberFromAbove]
          var jsonWebElementId = selectedPost.ELEMENT;              //Getting the element for the randomly chosesn post
          browser.elementIdClick(jsonWebElementId);                 //clicking on the post
      });
      browser
        .pause(4000)
        .waitForElementNotPresent('.post',4000)                     //Wait until .post element from previous page is not present
        .verify.urlContains("https://imgur.com/gallery/")           //verify the URL leads to a different page than before
        .pause(2000)
        .end();                                                     //closing browser
      }


};
