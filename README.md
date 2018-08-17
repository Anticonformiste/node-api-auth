# node-api-auth
A simple app, to handle authentication to node's RESTful http APIs
via: JWT, Passport and Bcrypt(Phase1) 3rd Part oAuth'FB,Google,etc'(Pahse2)

Phase2:
-You need to enroll with facebook developers, create an app, publish it
-You'll need a FB account, generate a Privacy Policy document (I use termsfeed.com), and the redirect application(this one) should be on an HTTPS web server.
-TO TRANSFER YOUR LOCAL NODE.JS server to HTTPS:
1)please read carefully the *~/ssl/generate-certificates.sh* file, to setup SSL on your server. It's mandatory to publish live your facebook app.
2)IMPORTANT: 
=>OS || Linux users: change any occurance of -subj, following this pattern: '//' at the start to '/' and any '\' to '/'
(Because I'm on a windows env.)
ex: (-subj "//CN=$CN\O=$ORG\UID=$USER_ID") to (-subj "/CN=$CN/O=$ORG/UID=$USER_ID")
3)run this script via your terminal $~ssl: ./generate-certificates.sh
4)after that setup the generated certificates

-Please report any issue!

That's it ☺, enjoy.
