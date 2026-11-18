import { Stack } from "expo-router";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function RootLayout() {
  useEffect (() => {
    Notifications.setNotificationHandler({
      handleNotification: async ()=> ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true
      }),
    });
  },[]);

  return (
    <Stack>
      <Stack.Screen
       name="(tabs)"
       options= {{headerShown: false}}
       />

       <Stack.Screen
        name="details"
        options={{
          title: "Plant Details",
          headerStyle: {
            backgroundColor: "#e8f5e9",
          },
          headerTintColor: "#245c36",
        }}
        />
    </Stack>
  );
}
