import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Home() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require("../assets/1.png")} style={styles.img}></Image>
            <Text style={styles.title}>Bienvenido a la Tienda de Kevin</Text>
            <View style={styles.col}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Products')}
                >
                    <Text style={styles.buttonText}>Ver Productos</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.col}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Ranking')}

                >
                    <Text style={styles.buttonText}>Ranking de Productos</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('Terms')}
            >
                <Text style={styles.subtitle}>Términos y Condiciones</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3c5b9b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: '60%',
        height: '30%',
        margin: 30,
    },
    title: {
        color: "white",
        margin: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    subtitle: {
        color: "white",
        margin: 20,
    },
    col: {
        padding: 30,
        margin: 10,
    },
    button: {
        backgroundColor: '#4169e1',
        padding: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});