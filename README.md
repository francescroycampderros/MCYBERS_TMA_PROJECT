
Download and install Visual Studio Code to code (Optional).

This software has been tested with Java 17 (you can check your java version like this: "java --version") but possibly works with higher versions.

Also you should have Chrome installed and the corresponding webdriver downloaded (check your Chrome version, the chromedriver should be the same). 
The link to download the webdriver: https://googlechromelabs.github.io/chrome-for-testing/ (CAUTION!: Download the chromedriver not chrome)

Before executing:

export CHROMEDRIVER_ABSOLUTE_PATH=\<absolute path where your chromedriver was downloaded\>\
export GEMINI_API_KEY=\<api key\>

To execute:

./gradlew run