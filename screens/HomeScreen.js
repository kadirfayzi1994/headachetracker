import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Header } from 'react-native-elements';
import 'react-native-vector-icons';
import firebase from '../Firebase';
import 'firebase/firestore';



export default class HomeScreen extends Component {
    constructor() {
        super();
        this.ref = firebase.firestore().collection('logs');
        this.unsubscribe = null;
        this.state = {
            isLoading: true,
            logs: []
        };
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    onCollectionUpdate = (querySnapshot) => {
        const logs = [];
        querySnapshot.forEach((doc) => {
            const { date, severity, location, triggers, medicationTaken, notes } = doc.data();
            logs.push({
                key: doc.id,
                doc,
                date,
                severity,
                location,
                triggers,
                medicationTaken,
                notes
            });
        });
        this.setState({
            logs,
            isLoading: false,
        });
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<TouchableOpacity
                        style={{ alignItems: "flex-start", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}
                    >
                        <FontAwesome5 name="bars" size={30} color="#161924" />
                    </TouchableOpacity>}
                    centerComponent={{ text: 'Başağrısı Günlüğü', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={

                        <Button
                            icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
                            onPress={() => this.props.navigation.navigate('Create')} />
                    }
                />

                <ScrollView style={{ marginTop: 15 }}>
                    {
                        this.state.logs.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.date}
                                leftIcon={{ name: 'ambulance', type: 'font-awesome' }}
                                onPress={() => {
                                    this.props.navigation.navigate('Details', {
                                        logkey: `${JSON.stringify(item.key)}`,
                                    });
                                }}
                            />
                        ))
                    }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: "#161924",
        fontSize: 20,
        fontWeight: "500"
    }
});
