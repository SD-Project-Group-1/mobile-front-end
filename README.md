# 🔗Community Connectivity Orlando🔗

This was created to serve as the mobile version of our Orlando Connectivity App. [Expo](https://expo.dev) & [React Native](https://reactnative.dev/) was utilized to create our project.

## Acknowledgments

**/app & /app/(tabs)**

Contains the app's navigation, which is file-based. The file structure of the app directory determines the app's navigation.

The app has two routes defined by two files: app/(tabs)/index.tsx and app/(tabs)/explore.tsx. The layout file in app/(tabs)/_layout.tsx sets up the tab navigator.

**/assets**

The assets directory contains adaptive-icon.png used for Android and an icon.png used for iOS as app icons. It also contains splash.png which is an image for the project's splash screen and a favicon.png if the app runs in a browser.

**/components & /component/ui**

Contains React Native components, like ThemedText.tsx, which creates text elements that use the app's color scheme in light and dark modes.


**/constants**

Contains Colors.ts, which contains a list of color values throughout the app.


**/hooks**

Contains [React Hooks](https://react.dev/reference/react/hooks), which allows sharing common behavior between components. For example, useThemeColor() is a hook that returns a color based on the current theme.


**/package.json & /package.json**

The package.json file contains the project's dependencies, scripts, and metadata. Anytime a new dependency is added to your project, it will be added to this file.

**/app.json**

Contains configuration options for the project and is called the app config. These options change the behavior of your project while developing, building, submitting, and updating your app.




## Getting Started

1. Copy the mobile repo to your local machine. (I just used GitHub Desktop)


2. For local app deployment open a terminal and proceed with the following:


   ```bash
   cd community-connectivity-orlando
   ```

   ```bash
   npx expo start
   ```

3. From here a QR code should appear in the terminal, either scan it using the Expo Go app (Android) or scan it normally (IOS).


4. Finally, you should be able to our mobile app for development purposes. You can also shut down your local deployment server by pressing Ctrl+C in the terminal where you activated it.

## Learning Material

- [Expo](https://docs.expo.dev/tutorial/create-your-first-app/): This page is an amazing start for getting an understanding of what Expo is and how it is used with React Native.
- [React Native](https://reactnative.dev/docs/getting-started): Same deal as the Expo link, a great place to start learning React Native.
- [Figma](https://www.figma.com/design/38X70KMmqYRxxdYEGfmz8g/Community-Resource-Centers-Project?node-id=25-21&p=f&t=VgXICtYJkSvrTMIK-0): Our prototype wasn't made for nothing. It has a lot of detail on how the overall layout, color, font styles, and general UI elements of our app should be.