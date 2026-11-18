1. Project Description

GreenCare is a mobile application developed using React Native and Expo. It is designed to help users learn about plants and manage their basic plant-care activities.

The application provides information about different plants, allows users to save their favorite plants, and helps them remember plant-care activities through local notifications.

 2. Objectives

- To provide basic information about different plants.
- To help users understand plant watering and sunlight requirements.
- To allow users to search for plants.
- To enable users to save and manage their favorite plants.
- To provide reminders for plant-care activities.
- To develop a user-friendly mobile application using React Native.

  3. Main Features

### Home
- Displays a collection of plants.
- Provides a search function to find plants.
- Allows users to add plants to their favorites.
- Displays basic application status information.

### Plant Details
- Displays detailed information about selected plants.
- Provides watering requirements.
- Provides sunlight requirements.

### Favorites
- Displays the user's favorite plants.
- Allows users to remove plants from favorites.
- Saves favorite plants using local storage.

### Reminders
- Allows users to enter a plant name and reminder message.
- Allows users to schedule local notifications.
- Provides an option to cancel scheduled reminders.
- Displays basic plant-care tips.

  4. Technologies Used

- React Native
- Expo
- TypeScript
- Expo Router
- Visual Studio Code

5. Packages and Libraries

- expo-router – For screen navigation.
- @expo/vector-icons – For application icons.
- @react-native-async-storage/async-storage – For storing favorite plants locally.
- expo-notifications – For scheduling local notifications.

6. Application Navigation

The application contains four main screens:

1. Home
2. Plant Details
3. Favorites
4. Reminders

The Home, Favorites and Reminders screens are accessible through bottom-tab navigation. The Plant Details screen is opened by selecting a plant.


7. Storage and Notifications

GreenCare uses AsyncStorage to save users' favorite plant IDs locally on the device. This allows favorite plants to remain saved when the application is closed and reopened.

The application uses Expo Notifications to schedule local reminders for plant-care activities.

 8. Installation and Execution

### Step 1: Install Node.js

Install Node.js on your computer.

### Step 2: Open the Project

Open the GreenCare project folder using Visual Studio Code.

### Step 3: Install Dependencies

Open the terminal and run:

bash
npm install


Install the required Expo packages if they are not already installed:

bash
npx expo install expo-router @expo/vector-icons @react-native-async-storage/async-storage expo-notifications


### Step 4: Start the Application

Run the following command:

bash
npx expo start


### Step 5: Run on a Mobile Device

Install Expo Go on an Android device and scan the QR code displayed in the terminal or browser to run the application.

9. Expected Outcome

The expected outcome is a functional and user-friendly mobile application that helps users access basic plant information, organize favorite plants and receive reminders for plant-care activities.

10. Conclution

GreenCare provides a simple mobile solution for supporting basic plant-care activities. Through this project, concepts such as React Native components, navigation, state management, persistent local storage and local notifications are applied in developing a practical mobile application.
