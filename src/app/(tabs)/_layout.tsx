import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {

    return (
        <Tabs
         screenOptions= {{
            headerStyle: {
                backgroundColor: "#e8f5e9", 
            },

            headerTintColor: "#245c36",

            tabBarActiveTintColor: "#2e7d32",

            tabBarInactiveTintColor: "gray",

            tabBarStyle: {
                backgroundColor: "#ffffff",
                height: 65,
                paddingBottom: 8,
            },
         }}
         >

            <Tabs.Screen
             name= "index"
             options={{
                title: "Home",

                tabBarIcon: ({ color, size})=>(
                    <Ionicons
                     name="home"
                     color={color}
                     size={size}
                     />
                ),
             }}
             />

            <Tabs.Screen
             name= "favorites"
             options={{
                title: "Favorites",

                tabBarIcon: ({ color, size})=>(
                    <Ionicons
                     name="heart"
                     color={color}
                     size={size}
                     />
                ),
             }}
             />

             <Tabs.Screen
             name= "reminders"
             options={{
                title: "Reminders",

                tabBarIcon: ({ color, size})=>(
                    <Ionicons
                     name="notifications"
                     color={color}
                     size={size}
                     />
                ),
             }}
             />

         </Tabs>
    );
}