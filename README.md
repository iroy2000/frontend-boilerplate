Frontend Boilerplate
====================

This frontend boilerplate includes a customized mirco framework that combines some of the latest frontend library with some customizations. It comes with Jasmine as testing framework, plus build tool and build config.

Libraries
---------
* Backbone ( amd )
* Backbone Localstorage
* Underscore ( amd )
* Twitter Bootstrap 
* Require-jQuery
* Text ( RequireJS Plugin )
* Modernizr
* HTML5 Bolierplate ( partial )


Usage
-----
You should see there are two folders **www/**  and  **build-tool/**.  The **www/** folder is for your to deploy to your local server for development, and later you can use the build tool to create a compiled version ( optimized version ).  The build tool already has configured and should compile your apps out the the box.  The only dependency is you will need to install node. 

node r.js -o app.build.js

If you need to write Test, there is a test folder where you can write the Spec or test suite directly.  It is all hooked up and you just need to provide test case.  Currently the test case only contain the RouterTest.

Note about micro framework
---------------------------
This Frontend Boilerplate has a customized micro framework in it.  And by default it recognized the following **backbone 'routes'**.

* ""  ( nothing ) 
* ?param=1&param=2
* module
* module?param=1&param=2
* module/action
* module/action?param=1&param=2

** All the query string will be parsed into json object **

The micro framework is using a package module with actions in it. For example:

* The first two routes above will fetch the **IndexModule->indexAction()** 
* The 3rd and 4th route, if you provide in url **/#demo**, it will fetch the **DemoModule->indexAction()**
* The 5th and 6th route, if you provide in url **/#demo/test**, it will fetch the **DemoModule->testAction()**

In other words, each module should have a **\indexAction** action, and it will throw an error if you do not.  What it does is when it doesn't see an action comes in or the action requested is not existed, it will use the **\indexAction()**.  

By default, each Module will receive an option object in which you will have access to the **router instance**, and a **global view**.  The router instance will let you bind or listen to any events on router; and for the global view, it is an abstraction of the page and enable you to take action on any part on the page without creating extra views.  For view that needs specific events and functions, then it will be up to developer to create its own view. 

And for each module action, you will be able to access the module instance properties and other functions, and also you will have an options object in which you will get the query string ( in json format ) if any.

**!Important** In main.js, there is a "allowModules" variable, which you need to define what Module you allow your user to access.  In other words, modules that doesn't list in the "allowModules" will not be accessible.

There will be more documentation ( and dedicated documentation ) about the micro framework in the future.
