# Cordova-Icon-and-Splash-Screen-Resizer

Run below command to generate Splash screen and Icon files from source image.

Keep in mind source icon and splash image must be square in dimension, and size should be greater than maximum dimension of to be generated image.

So for example if maximum height/width of to be generated splash screen in resources folder of android / ios build is 2048px. Then source image say splash.png should be atleast of 2048x2048 px dimension. Same goes for icons.


`node index.js "<source image path>" "<destination images selector>"`

So below command will pickup splash.png from desktop generate all new screens for android splash screen.

`node index.js "/Users/Desktop/splash.png" "/Users/Desktop/projects/GenericApp/platforms/android/res/**/screen.png"`


For ios check below eg.

`node index.js "/Users/Desktop/icon.png" "/Users/Desktop/projects/GenericApp/platforms/ios/GenericApp/Images.xcassets/AppIcon.appiconset/*.png"`

![repo](https://user-images.githubusercontent.com/1917527/38658995-01b2f41c-3e45-11e8-982a-bf0827376a37.png)
