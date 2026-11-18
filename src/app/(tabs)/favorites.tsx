import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const plants = [
    {
        id: "1",
        name: "Aloe Vera",
        category: "Medicinal Plant",
        water: "Once a week",
        sunlight: "Indirect sunlight",
        description: " Aloe Vera is a popular medicinal plant. It requires little water and grows well in bright indirect sunlight.",
        image: require("../../../assets/images/AloeVera.jpg"),
    },

    {
        id: "2",
        name: "Snake Plant",
        category: "Indoor Plant",
        water: "Every 2 weeks",
        sunlight: "Low to bright light",
        description: " Snake Plant is an easy care indoor plant. It can tolerate low light conditions and needs little waterig.",
        image: require("../../../assets/images/SnakePlant.png"),
    },

    {
        id:"3",
        name: "Money Plant",
        category: "Indoor Plant",
        water: "Once a week",
        sunlight: "Indirect sunlight",
        description: "Money Plant is a beautiful climbing plant. It grows well indoors with moderate watering.",
        image: require("../../../assets/images/MoneyPlant.png"),
    },

     {
        id: "4",
        name: "Peace Lily",
        category: "Flowering Plant",
        water: "Twice a week",
        sunlight: "Indirect sunlight",
        description: "Peace Lily is a flowering indoor plant. It prefers moist soil and indirect sunlight.",
        image: require("../../../assets/images/PeaceLily.png"),
    },
];

export default function FavoriteScreen() {
    const [favorites, setFavorites] = useState<string[]>([]);

    //Load favorites whenever this screen is opened
    const loadFavorites = async () => {

        try {
            const saved = await AsyncStorage.getItem("favorites");

            if(saved !== null) {
                setFavorites(JSON.parse(saved));
            }else {
                setFavorites([]);
            }
        }catch (error) {
            console.log("Error loading favorites:", error);
        }
    };

    useFocusEffect(
        useCallback(()=> {
            loadFavorites();
        },[])
    );

    //Remove a plant from favorites 
    const removeFavorite = async (id:string) => {
        const updatedFavorites = favorites.filter(
            item => item !== id
        );

        setFavorites(updatedFavorites);

        await AsyncStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };

    const favoritePlants = plants.filter(
        plant => favorites.includes(plant.id)
    );

    return(

        <ScrollView style = {styles.container}>

            <Text style = {styles.title}>My Favorite Plants ❤️</Text>
            <Text style = {styles.subtitle}>Your saved plants are displayed here.</Text>

            {favoritePlants.length === 0 ? (
                <View style = {styles.emptyBox}>
                    <Text style = {styles.emptyText}>No favorite plants yet.</Text>
                    <Text style = {styles.emptySubText}>Go to Home tap the heart icon to save plants.</Text>
                </View>
            ) : (
                favoritePlants.map(plant => (
                    <View style = {styles.card} key = {plant.id}>

                        <Image source={plant.image} style={styles.image} />

                        <View style= {styles.cardContent}>
                            <Text style = {styles.plantName}>{plant.name}</Text>
                            <Text style = {styles.category}>{plant.category}</Text>

                            <View style = {styles.buttons}>
                                <Pressable
                                  style = {styles.detailsButton}
                                  onPress = {()=>
                                    router.push({
                                        pathname: "/details",
                                        params: {id: plant.id},
                                    })
                                 }
                                >
                                    <Text style = {styles.buttonText}>View Details</Text>
                                </Pressable>

                                 <Pressable
                                  style = {styles.removeButton}
                                  onPress = {()=> removeFavorite(plant.id)}
                                >
                                    <Text style = {styles.removeText}>Remove</Text>
                                </Pressable>


                            </View>
                        </View>
                    </View>
                ))
            )}
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
        marginTop:8,
        marginBottom: 20,
    },

    emptyBox: {
        backgroundColor: "#e8f5e9",
        padding: 25,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30
    },

    emptyText: {
        fontSize: 18,
        textAlign: "center",
        color: "#245c36",
    },

    emptySubText: {
        color: "#666",
        textAlign: "center",
        marginTop: 10,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 20,
        overflow: "hidden",
        elevation: 3,
    },

    image: {
        width: "100%",
        height: 160,
    },
    
    cardContent: {
        padding:15,
    },

    plantName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#245c36",
    },

    category: {
        color: "#777",
        marginTop: 5,
    },

    buttons: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
    },

    detailsButton: {
        backgroundColor: "#2e7d32",
        padding: 10,
        borderRadius: 8
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    removeButton: { 
        marginLeft: 15,
        padding: 10,
    },

    removeText: {
        color: "#e53935",
        fontWeight: "bold",
    },
});