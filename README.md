# node-api-auth
A simple app, to handle authentication to node's RESTful http APIs
via: JWT, Passport and Bcrypt(Phase1) 3rd Part oAuth'FB,Google,etc'(Pahse2)

Phase2:<br/>
-You need to enroll with facebook developers, create an app, publish it.<br/>
-You'll need a FB account, generate a Privacy Policy document (I use termsfeed.com), and the redirect application(this one) should be on an HTTPS web server.<br/>
-TO TRANSFER YOUR LOCAL NODE.JS server to HTTPS:<br/>
1)please read carefully the *~/ssl/generate-certificates.sh* file, to setup SSL on your server. It's mandatory to publish live your facebook app.<br/>
2)IMPORTANT: <br/>
=>OS || Linux users: change any occurance of -subj, following this pattern: '//' at the start to '/' and any '\' to '/'
(Because I'm on a windows env.)<br/>
ex: (-subj "//CN=$CN\O=$ORG\UID=$USER_ID") to (-subj "/CN=$CN/O=$ORG/UID=$USER_ID")<br/>
3)run this script via your terminal $~ssl: ./generate-certificates.sh<br/>
4)after that setup the generated certificates<br/>
<br/><br/>
-Please report any issue!
<br/><br/>
That's it ☺, enjoy.
