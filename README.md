# weblog-website

<!-- Visit this website here. SignUp, LogIn and start exploring.
* [mini-chatapp.herokuapp.com](https://mini-chatapp.herokuapp.com/) -->

Soon the link for the website will be available

## Dependencies required:
* [Node.js](https://nodejs.org/docs/latest-v10.x/api/) - v10.16.2
* [JavaScript](https://devdocs.io/javascript/) - 1.1.1
* [mongodb](https://docs.mongodb.com/) - 3.3.2
* [mongoose](https://mongoosejs.com/docs/documents.html) - 5.9.3

### Instructions for the environment:
Download this complete repository and use my pre-installed dependencies.

Else install Node.js and run the command given below  to install any package

Check the packages used in package.json file

```
npm install <package-name> --save
```
Change the Scripts in package.json file to:

```
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "nodemon app.js",
}
```
Now, this web-app requires a mongodb database to work on. It's free for limited storage, SignUp and LogIn.

Build a cluster over there and add your connection string into this application code which looks like:

```
'mongodb+srv://<username>:<password>@cluster0-werpd.mongodb.net/Chatting?retryWrites=true&w=majority'
```

### Application working:
Signup with a unique user-name and now you are all done.

Have queries --> just post it there

Help others by solving their queries on any subject for which query is posted.

Try running over the localhost:1000 or visit the link provided above and make use of its features.