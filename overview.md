# IIS Website - Maintenance mode (VSTS task)
VSTS/TFS Task for putting an IIS website in maintenance mode and back online again.

Are these VSTS extensions helping you? 

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BSMTZP9VKP8QN)

### Details
If you put an app_offline.htm file in the root of your web application, IIS will shut down the application and only serve this webpage as an result with a HTTP 503 code. After you rename/delete the file the site will be back online.

This can be usefull when you deploy websites without high availability environments and still the visitors a nice message instead of errors. In the case you do have a high availability environment with a load balancer, you can configure the load balancer in such a way that it will switch when it notices a 503 code.

### How it works
Add a html file with the maintenance message to your artificat for the website and give it the same filename as specified under *Online filename*. When this task is executed in offline mode it will find that particular file and change it to the *Offline filename* which will take the site offline. In online mode it will do the exact opposite.

#### Available options
* **Computer name:** Leave empty if you want to perform this operation on the local computer. When you want to use Remote Powershell you can fill in the desired remote computer.
* **Change to:** State to put the website in. Either offline or online.
* **Site root directory:** The directory where the website is running. 
* **Offline filename:** The filename to use to take the site offline.
* **Online filename:** The filename to use to take the site online.
* **Fail deployment on error:** Fail the whole deployment if this operation cannot succeed.
* **Seconds delay before:** Amount of seconds to wait before changing the state of the website.
* **Seconds delay after:** Amount of seconds to wait after changing the state of the website.