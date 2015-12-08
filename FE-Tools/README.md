
## Front-End Tools Notes

You will need to install the following items in order to build the SCSS into CSS for the project.

####Global Installs:
[NodeJS](https://nodejs.org/en/)

[GulpJS](http://gulpjs.com/)

####Local Install:
Now that you have Node & Gulp, open a command window in this files folder (**/FE-Tools/**) and type:
```
npm install
```
The above only needs to be done once per project, to install the node modules necessary for this project (unless something is added down the line, in which case simply run "npm install" again).

####Available Commands:
The following commands are available in the command window while in the **/FE-Tools/** folder


```
gulp clean
```
This command will delete the generated files in the /Assets/ folder.  It will run automatically when you run the default 'gulp' command, as well as the 'build' or 'build:prod' commands.


```
gulp styles
```
This command will compile the uncompressed styling, complete with sourcemaps for the .scss, and place the new .css file(s) into the /styles/ folder inside of /Assets/.  This is the development styles compile command.


```
gulp styles:prod
```
This is the same as above, but intended for production builds.  The styling has no sourcemaps, and is minified.


```
gulp scripts
```
This command will take all of the scripts in the /scripts/ folder, bundle them up and output both the newly bundled file as well as the minified version to the /scripts/ folder inside of /Assets/.


```
gulp watch
````
To start watching for changes to the .scss & .js files inside of /FE-Tools/, run this command.  Changes detecited will automatically run the appropriate development command to recompile/bundle.


For grouped up easy to use commands, use the following:

```
gulp build
```
or simply
```
gulp
```
Either of the above will clean the /Assets/ directory by removing any previously generated files, then run the 'styles' and 'scripts' commands, while also starting the 'watch'.  This is the goto command for normal day to day development work.


```
gulp build:prod
```
This is the goto command to build production ready styles and scripting.  It will run 'styles:prod' as well as 'scripts'; the watch will not be started using this command.
