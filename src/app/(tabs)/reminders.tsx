import React,{ useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import * as Notifications from "expo-notifications";

export default function RemindersScreen() {
    const [plantName, setPlantName] = useState("");
    const [message, setMessage] = useState("");
    const [minutes, setMinutes] = useState("1");
    const [notificationId, setNotificationId] = useState<string | null>(null);

    //schedule a local notification
    const scheduleReminder = async() => {

        if(
            plantName.trim() === "" ||
            message.trim() === "" ||
            minutes.trim() === "" 
        ){
            Alert.alert(
                "Missing Information",
                "Please fill in all fields."
            );

            return;
        }

        const delay = Number(minutes)

        if (!Number.isFinite(delay) || delay <1) {

            Alert.alert(
                "Invalid Time",
                "Please enter at least 1 minute"
            );

            return;
        }

        try{
            const permission = await Notifications.requestPermissionsAsync();

            if(!permission.granted){ 

                Alert.alert(
                    "Permission Required",
                    "Please allow notifications in your phone setting."
                );

                return;
           }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: `🌱 ${plantName} Reminder`,
                body: message,
                sound: true,
            },

            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: delay * 60,
            },

        });

        setNotificationId(id);

        Alert.alert(
            "Reminder scheduled!",
            `Your reminder for ${plantName} has been scheduled.`
        );

    } catch (error) {
        console.log("Notification error:", error);

        Alert.alert(
            "Error",
            "Could not schedule the reminder."
        );
    }
};

//Cancel the scheduled notification 
const cancelReminder = async ()=> {
    if (notificationId === null) {

        Alert.alert(
            "No Reminder",
            "There is no reminder to cancel."
        );

        return;
    }

    await Notifications.cancelScheduledNotificationAsync(
        notificationId
    );

    setNotificationId(null);

    Alert.alert(
        "Cancelled",
        "Your reminder has been cancelled."
    );
};

return(
    <ScrollView style = {styles.container}>
     <Text style = {styles.title}>Plant Care Reminders 🌿</Text>
     <Text style = {styles.subtitle}>Never forget to take care of your plants!</Text>

     <View style = {styles.formBox}>

      <Text style = {styles.label}>Plant Name</Text>

      <TextInput
       style = {styles.input}
       placeholder="Example: Aloe Vera"
       value={plantName}
       onChangeText={setPlantName}
       />

      <Text style = {styles.label}>Reminder Message</Text>

      <TextInput
       style = {styles.input}
       placeholder="Example: Water your plant"
       value={message}
       onChangeText={setMessage}
       />

      <Text style = {styles.label}>Remind Me After (Minutes)</Text>

      <TextInput
       style = {styles.input}
       placeholder="Enter minutes"
       value={minutes}
       onChangeText={setMinutes}
       />

       <Pressable style = {styles.scheduleButton}  onPress = {scheduleReminder}>
        <Text style = {styles.buttonText}>Schedule Reminder</Text>
       </Pressable>


       <Pressable style = {styles.cancelButton}  onPress = {cancelReminder}>
        <Text style = {styles.buttonText}>Cancel Reminder</Text>
       </Pressable>


     </View>

     <View style = {styles.infoBox}>
      <Text style={styles.infoTitle}>Plant Care Tips 🌱 </Text>
      <Text style={styles.tip}>💧 Check the soil before watering.</Text>
      <Text style={styles.tip}>☀️ Provide suitable sunlight.</Text>
      <Text style={styles.tip}>🌿 Remove dry and damaged leaves.</Text>
      <Text style={styles.tip}>🪴 Choose a suitable growing medium.</Text>
      
     </View>

    </ScrollView>
);

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f4f9f4",
        padding: 15,
    },

    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#245c36",
        marginTop: 20,
    },

    subtitle: {
        color: "#777",
        marginTop: 8,
        marginBottom: 20,
    },

    formBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 15,
        elevation: 3,
    },

    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#245c36",
        marginTop: 15,
        marginBottom: 8,
    },

    input: {
        backgroundColor: "#f4f9f4",
        padding: 13,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#c8e6c9",
    },

    scheduleButton: {
        backgroundColor: "#2e7d32",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 25,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },

    cancelButton: {
        backgroundColor: "#ffebee",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 12,
    },

    cancelText: {
        color: "#c62828",
        fontWeight: "bold",
    },

    infoBox: {
        backgroundColor: "#dcedc8",
        padding: 20,
        borderRadius: 15,
        marginTop: 25,
        marginBottom: 30,
    },

    infoTitle: {
        fontSize: 19,
        fontWeight: "bold",
        color:"#245c36",
        marginBottom: 15,
    },

    tip: {
        fontSize:15,
        color: "#456",
        marginBottom: 10,
    },
});