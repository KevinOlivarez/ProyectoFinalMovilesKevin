import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Platform, Button, Modal, Dimensions } from 'react-native';
import axios from 'axios';
const { width } = Dimensions.get('window');

export default function Productos() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://fakestoreapi.com/products');
            setProducts(response.data);
        };
        fetchData();
    }, []);

    const selectProduct = (product) => {
        let newSelection = selectedProducts.find(p => p.id === product.id);
        if (newSelection) {
            newSelection.quantity++;
            setSelectedProducts([...selectedProducts]);
        } else {
            setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
        }
    };

    const deselectProduct = (product) => {
        let newSelection = selectedProducts.find(p => p.id === product.id);
        if (newSelection && newSelection.quantity > 1) {
            newSelection.quantity--;
            setSelectedProducts([...selectedProducts]);
        } else {
            setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
        }
    };

    const getTotal = () => {
        let total = 0;
        selectedProducts.forEach(product => {
            total += product.price * product.quantity;
        });
        return total;
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.cardContainer}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productTitle}>{item.title}</Text>
                            <Text style={styles.productPrice}>${item.price}</Text>
                            <Text style={styles.productDescription}>{item.description}</Text>
                            <Text style={styles.productCategory}>Category: {item.category}</Text>
                            <Text style={styles.productRating}>
                                Rating: {item.rating.rate} ({item.rating.count} reviews)
                            </Text>
                            {selectedProducts.find(p => p.id === item.id) ? (
                                <Button title="Remove" onPress={() => deselectProduct(item)} />
                            ) : (
                                <Button title="Select" onPress={() => selectProduct(item)} />
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Ver carrito" onPress={() => setModalVisible(true)} />
            <Modal animationType="slide" transparent={false} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={selectedProducts}
                        renderItem={({ item }) => (
                            <View style={styles.selectedProductContainer}>
                                <Image

                                    source={{ uri: item.image }} style={styles.selectedProductImage} />
                                <View style={styles.selectedProductInfo}>
                                    <Text style={styles.selectedProductTitle}>{item.title}</Text>
                                    <Text style={styles.selectedProductDescription}>{item.description}</Text>
                                    <Text style={styles.selectedProductCategory}>Category: {item.category}</Text>
                                    <Text style={styles.selectedProductRating}>
                                        Rating: {item.rating.rate} ({item.rating.count} reviews)
                                    </Text>
                                    <Text style={styles.selectedProductPrice}>
                                        {item.quantity} = ${item.price * item.quantity}
                                    </Text>
                                    <Button title="Add More" onPress={() => selectProduct(item)} />
                                    <Text></Text>
                                    <Button title="Remove" onPress={() => deselectProduct(item)} />
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                    <Text style={styles.totalText}>Total: ${getTotal()}</Text>
                    <View style={styles.fixToText}>
                        <Button title="Cerrar" onPress={() => setModalVisible(false)}
                            style={styles.button}
                        />

                        <Button title="Pagar" onPress={() => {
                            setModalVisible(false);
                            alert(`Gracias por su pago de $${getTotal()}`);
                        }}
                            style={styles.button}
                        />
                    </View>
                </View>
            </Modal >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    cardContainer: {
        width: width - 40,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginVertical: 20,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        })
    },
    productImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginTop: 20
    },
    productInfo: {
        padding: 20
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 10
    },
    productDescription: {
        fontSize: 12,
        color: '#999',
        marginTop: 10
    },
    productCategory: {
        fontSize: 12,
        color: '#555',
        marginTop: 10
    },
    productRating: {
        fontSize: 12,
        color: '#555',
        marginTop: 10
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    selectedProductContainer: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        ...Platform.select({
            ios: {
                shadowColor: 'rgb(50,50,50)',
                shadowOpacity: 0.5,
                shadowRadius: 5,
                shadowOffset: {
                    height: -1,
                    width: 0
                }
            },
            android: {
                elevation: 3
            }
        }),
    },
    selectedProductImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginTop: 20
    },
    selectedProductInfo: {
        padding: 20
    },
    selectedProductTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    selectedProductPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10
    },
    selectedProductButton: {
        backgroundColor: '#7159c1',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedProductButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})