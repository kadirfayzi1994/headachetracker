import React, { Component } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import firebase from '../Firebase';



export default class LogoutScreen extends Component {

    state = {
        email: "",
        displayName: ""
    };

    componentDidMount() {
        const { email, displayName } = firebase.auth().currentUser;

        this.setState({ email, displayName });
    }

    signOutUser = () => {
        firebase.auth().signOut();
    };

    render() {
        return (            
            < TouchableOpacity style={{ marginTop: 32, alignItems: 'center' }
            } onPress={this.signOutUser} >
                <Text>Çıkış yap</Text>
            </TouchableOpacity>
        );
    }
}