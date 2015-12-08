
## Front-End Tools Notes

You will need to install the following items in order to build the SCSS into CSS for the project.

####Global Installs:
[NodeJS](https://nodejs.org/en/)

[GulpJS](http://gulpjs.com/)

####Local Install:
Now that you have Node & Gulp, open a command window in this files folder (**/tools/**) and type:
```
npm install
```
The above only needs to be done once per project, to install the node modules necessary for this project (unless something is added down the line, in which case simply run "npm install" again).

####Available Commands:
The following commands are available in the command window while in the **/FE-Tools/** folder

To delete the "-generated" files in the /Assets/ section, run:
```
gulp clean
```
This command will run automatically when you run the default 'gulp' command


To Compile the styles for development purposes, type:
```
gulp styles
```
This includes unminified .css and sourcemaps.


To start watching for changes to the .scss files, and compile the .css automatically, type:
```
gulp watch
````
The watch automatically uses 'styles' as it's task of choice, rather than 'styles:prod'


To do both (build for DEV and watch .scss files), simply type:
```
gulp
```


Alternatively, you can build for production (minified and compressed .css) with:
```
gulp styles:prod
```


Styling is  bundled and output as one .css file, while JS is bundled and outputs both the minified and non-minfied versions of the scripting.  All files live in their appropriate folders inside of "/Assets/", and are flagged as 'generated'.