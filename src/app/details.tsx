import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const plants = [
    {
        id: "1",
        name: "Aloe Vera",
        category: "Meicinal Plant",
        water: "Once a week",
        sunlight: "Indirect sunlight",
        description: " Aloe Vera is a popular medicinal plant. It requires little water and grows well in bright indirect sunlight.",
        image: require("../../assets/images/AloeVera.jpg"),
    },

    {
        id: "2",
        name: "Snake Plant",
        category: "Indoor Plant",
        water: "Every 2 weeks",
        sunlight: "Low to bright light",
        description: " Snake Plant is an easy care indoor plant. It can tolerate low light conditions and needs little waterig.",
        image: require("../../assets/images/SnakePlant.png"),
    },

    {
        id:"3",
        name: "Money Plant",
        category: "Indoor Plant",
        water: "Once a week",
        sunlight: "Indirect sunlight",
        description: "Money Plant is a beautiful climbing plant. It grows well indoors with moderate watering.",
        image: require("../../assets/images/MoneyPlant.png"),
    },

     {
        id: "4",
        name: "Peace Lily",
        category: "Flowering Plant",
        water: "Twice a week",
        sunlight: "Indirect sunlight",
        description: "Peace Lily is a flowering indoor plant. It prefers moist soil and indirect sunlight.",
        image: require("../../assets/images/PeaceLily.png"),
    },
];

export default function DetailsScreen() {
    const { id } = useLocalSearchParams();

    const plant = plants.find(
        item => item.id === id
    );

    if(!plant) {

        return (
            <View style = {styles.container}>
                <Text> Plant not found.</Text>

                <Pressable onPress = {() => router.back()}>
                    <Text style = {styles.backText}>Go Back</Text>
                </Pressable>
            </View>
        );
    }

    return(
        <ScrollView style = {styles.container}>
            <Image source={plant.image} style={styles.image} />

            <View style ={styles.content}>
                <Text style = {styles.name}>{plant.name}</Text>
                <Text style = {styles.category}>{plant.category}</Text>
                <Text style = {styles.heading}>About this plant</Text>
                <Text style = {styles.description}>{plant.description}</Text>
                <Text style = {styles.heading}>Watering Requirements</Text>
                <Text style = {styles.info}> 💧 {plant.water}</Text>
                <Text style = {styles.heading}>Sunlight Requirements</Text>
                <Text style = {styles.info}> ☀️ {plant.sunlight}</Text>

                <Pressable
                  style = {styles.backButton}
                  onPress = {()=> router.back()}
                >

                    <Text style = {styles.backButtonText}>Go Back</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f9f4",
    },

    image: {
        width:"100%",
        height:280,
    },

    content: {
        padding:20,
    },

    name: {
        fontSize:27,
        fontWeight:"bold",
        color: "#245c36",
    },

    category: {
        color: "#777",
        marginTop: 5,
        marginBottom: 20,
    },

    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2e7d32",
        marginTop: 20,
        marginBottom: 8
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#555",
    },

    info: {
        fontSize: 16,
        color: "#555",
    },

    backButton: {
        backgroundColor: "#2e7d32",
        padding: 15,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 30,
        alignItems: "center",
    },

    backButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    
    backText: {
        color: "#2e7d32",
        marginTop: 10,
    },
});