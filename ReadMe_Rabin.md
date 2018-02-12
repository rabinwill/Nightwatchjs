
#Tempus Imgur Code Challenge

- Using nightwatch.js Version (v0.9.19)
- node.js Version 9.5.0
- npm Version 5.6.0
- Selenium Server Version 3.9.1
- Firefox Version 57.04
- Geckodriver Version 0.19.1
- Chrome Version Version 64.0.3282.140 
- Chrome Driver Version 2.35

###Commands 

**Selenium**: To run selenium server
```
$> java -jar selenium-server-standalone-3.9.0.jar 
```
**Start Test in Firefox**
```
$>node nightwatch.js -t tests\demo.js
```
**Start Test in Chrome**
```
$>node nightwatch.js -e chrome -t tests\demo.js
```
###Test Run Pass Instance

**Firefox**
![](https://i.imgur.com/G8xMQ5t.png)

**Chrome**
![](https://i.imgur.com/dtfWU1q.png)

###Test Fail Expectations:

- On OSX Chrome, when .setValue() pastes the URL the upload box/pop-up closes which makes the driver to add the text in to the search bar causing the test to fail. 
On further debugging; I noticed that when I manually enter any random text (not an URL) the upload box/pop-up closes as well. I also noticed that a 404 error on the console:
![](https://i.imgur.com/xXD52mS.png)

In the upload.js file on line 591 the `handlePaste` function specifically on OSX, treats `.setValue` as text being typed in (even though its a valid URL) which closes the upload box/pop-up. 
![](https://i.imgur.com/imm2Aqh.png)

This is an issue only with the upload box/pop-up. `.setValue` did not have any issues on other sites and even on imgur.com's search bar. 

- I was not able to test the above issue on my windows machine becasue of my firewall settings that came with the antivirus :grin: 
![](https://i.imgur.com/UqFG9YW.png)

- After the search results page loaded I wanted to verify the results were tied to my query by verifying the text in the heading of the page.
```javascript
      .getText(".search-term-text", function(result) {
        var SIGNATURE = "tempus"
        var text = result.text
        this.assert.equal(typeof result, "object");
        this.assert.equal(result.status, 0);
        this.assert.equal(text, SIGNATURE);
      }); 
	  ```
The above code would not work because result.text or results.value would always return `[object, object]` instead of `"tempus"` 

- So I had to settle for detecting that the URL of the page matched by using an assert 
```
.assert.urlEquals("https://imgur.com/search?q=tempus")
```


