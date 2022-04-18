Description

NeprhoCare Clinics should be enabled to manage and provide digital information material to clinic employees.
Focus is fast and simple material provision for the education of patients.
This project is build using react native technology.

Project structure
The project is divided into the following sub directories

android
The projects native android directory. This can be opened via Android Studio if changes need to be applied directly, e.g., specific libraries or frameworks.

iOS
The projects native iOS workspace. This can be opened within xCode if changes need to be applied directly, e.g., specific libraries or frameworks.
It is advice to run the initial build of the iOS project within XCode since this can take a long time and the react-native build script does not output progress.

assets
Any bundled resources like images, videos or documents which should be contained in the application itself should be put into this folder.

src:
The react native source code of the application which is again divided into the following modules.

components
Any child component that is not a complete application screen is in this folder.
These are reusable components which are used across application such as Header, footer etc

Constant:
This folder contains all constants use in the application such as Api names, language supported.

Helper:
this is the helper folder again divided into below sub folder and some manager files as well.

Localization
To support multi-level language, this folder is used.

RealmDbManager
Any database related code like operations, the realm wrapper or object schemas are found in this folder.

declarations
Log manager
To print console log in DEV environment only

ApiManager
All network related code e.g., requests, authentication and fetching of data resides in this folder.

EnvConfigurations
To manage environment specific details such as URL in production, UAT, SIT etc.

DeviceManager
Code to retrieve device information like width, orientation etc. are available through a wrapper class in this directory.

NavigationManager
To navigate from one screen to another or move back to specific screen

NetworkManager:
This helps to check if network is available or not

Model
This folder is used to create request-response model classes.

Navigation
This folder contains basic code for Navigation for Tab and its style

Redux
This contains all code related to Redux. Redux toolkit (RTK) is used.

Screens
This contains all the UI related code. We have created tab wise folder. Different screens are divided into Tabs and created inside specific tab folder

Theme
this contains 2 main files
BaseTheme which will contain all standard colour code, dimensions, and fonts etc which are used across the application
image file will contain all image names. on required screen we can directly import this file and specific image.

Development
vscode 1.66.2
node 12.18.2

To install all dependencies, open root folder in command and run:
npm i

To start the application on an Android Simulator simply run:
set ENVFILE=.env.dev & react-native run-android --variant=devdebug --appIdSuffix \"dev\"

To run app with another environment, refer package. json