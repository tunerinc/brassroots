# Brassroots

The Brassroots mobile app

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install *Cocoapods* using

```zsh
RubyGems
sudo gem install cocoapods -v 1.6.0.beta.2

Homebrew
brew install cocoapods
```

> The reason we use version 1.4.0 is because the newer versions cause some mishaps, but we will update as soon as these issues are fixed.

Install *Fastlane* using

```zsh
RubyGems
sudo gem install fastlane -NV

Homebrew
brew cask install fastlane
```

Make sure you have the latest version of the Xcode command line tools installed:

```zsh
xcode-select --install
```

### Installing

The first thing we want to do is clone the repo in the desired directory:

```zsh
git clone https://github.com/tunerinc/brassroots.git
```

Now that we have the repo cloned with a specific branch selected, let's install all of our npm packages:

```zsh
cd brassroots && npm i
```

With all the npm packages downloaded, let's automatically link the packages we aren't going to be using Cocoapods to manage:

```zsh
react-native link react-native-config
react-native link rn-spotify-sdk
react-native link react-native-events
```

The next thing we need to do is install `third-party`, and then configure `glog` from `react-native`.

```zsh
cd node_modules/react-native/ && ./scripts/ios-install-third-party.sh && cd ../../

cd node_modules/react-native/third-party/glog-0.3.5/ && ../../scripts/ios-configure-glog.sh && cd ../../../../
```

Now we are ready to install our pods by running:

```zsh
cd ios && pod install
```

> Cocoapods could not find compatible versions for pod "insert PodName"
>
> `pod update [insert PodName] && pod install`

With our pods installed, we can now install the certificates we need in order to get the app to run underneath the team's Apple Developer account. For this, we are using fastlane to automatically manage these:

```zsh
fastlane match appstore
fastlane match development
```

> The first prompt will be the URL <https://github.com/therealaldo/brassroots-profiles> to the git repo containing all of the certificates.
>
> The next prompts will be for the email and password for the Apple Developer account tied to the app if you haven't entered the information before. Reach out to attain these as you will be prompted for a 6-digit code due to the two-factor authentication.

At this point, you're going to want to open the `.xcworkspace` in Xcode.

When Xcode finally opens, we want to make sure we are using the correct path for *DerivedData*. Navigate to *File->Workspace Settings*, clicking on *Advanced*, and then selecting *Custom* with the *Relative to workspace* option selected from the dropdown. The paths for *Products* and *Intermediates* should read as follows:

```zsh
# Products
build/Build/Products

# Intermediates
build/Build/Intermediates.noindex
```

Next, you are going to want to show the issue navigator. Once you have navigated over, you want to go through each of the projects included in the workspace, performing the changes to update the projects to the recommended Xcode settings. Make sure to leave all of the items under each drop down containing the updates checked before selecting to perform the changes.

Once you have updated all of the project settings, you want to show the project navigator, selecting `RCTText.xcodeproj` under the *Libraries* directory. Once viewing the project, you want to switch over to the build settings, searching for the setting *Overriding Deprecated Objective-C Methods* underneath the *Apple Clang - Warnings - Objective-C* section and changing the yes to no. This fixes a bug that occurs within this package when the project is compiling since Xcode will ignore old Obj-C methods. You must repeat this step anytime you re-install and link the library.

Lastly, before building the project, you want to ensure the `.env` file is at the root of the project containing all of the correct variables. Reach out if you don't have this file already, or fear it may be out of date.

```zsh
npm start
```

Once the packager is running, build the project in Xcode using *⌘+B*.