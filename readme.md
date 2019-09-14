## The challenge

Using only raw sockets(you can of course use the libary for this), no http frameworks
Build a web server with raw nodejs that can:

1) serve a static file  index.html
2) reply to a simple get request /ping
3) replace to a form post with /ping and return the form params back to the user

Testing requirements are that we can verify this with curl locally and or via unit tests with got
