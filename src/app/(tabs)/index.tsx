import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const plants = [
    {
        id: "1",
        name: "Aloe Vera",
        category: "Meicinal Plant",
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
        image:  require("../../../assets/images/SnakePlant.png"),
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

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [appStatus, setAppStatus] = useState("Active");
    const appState = useRef(AppState.currentState);

    //Load saved favorites
    const loadFavorites = async () => {

        try{
            const saved = await AsyncStorage.getItem("favorites");

            if (saved !== null) {
                setFavorites(JSON.parse(saved));
            }

        }catch (error){
             console.log("Error loading favorites:", error);
        }
    };

    useEffect(()=>{
        loadFavorites();
    },[]);

    //Detect app state changes
    useEffect(()=>{
        const subscription = AppState.addEventListener(
            "change",
            nextState => {
                appState.current = nextState;

                if (nextState === "active") {
                    setAppStatus("Active");
                }else {
                    setAppStatus("Inactive/Background");
                }
            }
        );

        return () => {
            subscription.remove();
        };
    },[]);


    //Add or remove favorites
    const toggleFavorite = async (id: string) => {

        let updatedFavorites;

        if(favorites.includes(id)) {
            updatedFavorites = favorites.filter(
                item => item !==id
            );
        } else {
            updatedFavorites = [...favorites, id];
        }setFavorites(updatedFavorites);

        await AsyncStorage.setItem(
            "favorites",
            JSON.stringify(updatedFavorites)
        );
    };

    //Search plants
    const filteredPlants = plants.filter(plant =>
        plant.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <ScrollView style = {styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    GreenCare 
                </Text>

                <Text style={styles.subtitle}>
                    Your little plant care assistent
                </Text>
            </View>

            <View style={styles.welcomeBox}>
                <Text style={styles.welcomeTitle}>
                    Welcome to GreenCare
                </Text>

                <Text style={styles.welcomeTitle}>
                    Learn how to grow healthy and beautiful plants.
                </Text>
            </View>

            <Text style={styles.sectionTitle}>
                Discover Plants
            </Text>

            <TextInput
             style ={styles.searchInput}
             placeholder="Search Plants..."
             value={search}
             onChangeText={setSearch}
             />

             <View style ={styles.statusBox}>
                <Text style ={styles.statusText}>
                    App Status: {appStatus}
                </Text>
                
             </View>

             {filteredPlants.map(plant => (
                <View style={styles.card} key={plant.id}>
                    <Image source={plant.image} style={styles.plantImage} />

                    <View style = {styles.cardContent}>
                        <Text style={styles.plantName}>{plant.name}</Text>
                        <Text style={styles.category}>{plant.category}</Text>

                        <View style = {styles.buttonRow}>

                            <Pressable
                             style ={styles.detailsButton}
                             onPress ={()=>
                                router.push({
                                    pathname: "/details",
                                    params: {id:plant.id},
                                })
                            }
                            >
                                <Text style ={styles.buttonText}>View Details</Text>
                            </Pressable>

                            <Pressable
                              onPress ={() => toggleFavorite(plant.id)}
                              style={styles.favoriteButton}
                            >
                                <Ionicons
                                  name={
                                    favorites.includes(plant.id) ? "heart" : "heart-outline"
                                  }

                                  size={25}
                                  color="#e53935"
                                  />
                            </Pressable>

                        </View>
                    </View>
                </View>
             ))}


             {filteredPlants.length === 0 && (
                <Text style ={styles.noResult}>No plants found.</Text>
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

    header: {
        marginTop: 20,
        marginBottom: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#245c36",
    },

    subtitle: {
        color: "#666",
        fontSize: 15,
    },

    welcomeBox: {
        backgroundColor: "#dcedc8",
        padding: 20,
        borderRadius: 15,
        marginBottom: 25,
    },

    welcomeTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#245c36",
    },

    welcomeText: {
        marginTop: 8,
        color: "#456",
    },

    sectionTitle: {
        fontSize: 21,
        fontWeight: "bold",
        color: "#245c36",
        marginBottom:12,
    },

    searchInput: {
        backgroundColor: "#fff",
        padding: 13,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: "#c8e6c9",
    },

    statusBox: {
        backgroundColor: "#e8f5e9",
        padding:10,
        borderRadius: 8,
        marginBottom: 15,
    },

    statusText: {
        color: "#2e7d32",
        fontWeight: "bold",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 20,
        overflow: "hidden",
        elevation: 3,
    },

    plantImage: {
        width: "100%",
        height: 180,
    },

    cardContent: {
        padding: 15,
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

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  detailsButton: {
    backgroundColor: "#2e7d32",
    padding: 10,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  favoriteButton: {
    marginLeft: 20,
    padding: 5,
  },

  noResult: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
  },
  
});