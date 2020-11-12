# scrollforce
Firefox extension to stop websites from blocking scrolling

Basically, if you're blocking annoying modal popups with an adblocker this will stop the now-hidden popup from breaking scrolling

It only blocks overflow changes that happen due to a change in class or style attribute on the HTML or BODY elements so hopefully it shouldn't break any sites and it uses a MutationObserver to be a bit kinder on performance
