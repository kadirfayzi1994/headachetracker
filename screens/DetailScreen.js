import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View } from 'react-native';
import { List, ListItem, Text, Card, Button } from 'react-native-elements';
import firebase from '../Firebase';
import 'firebase/firestore';
import 'react-native-vector-icons';

export default class DetailScreen extends Component {
    static navigationOptions = {
        title: 'Detaylar',
    };

    constructor() {
        super();
        this.state = {
            isLoading: true,
            log: {},
            key: ''
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        const ref = firebase.firestore().collection('logs').doc(JSON.parse(navigation.getParam('logkey')));
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    log: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            }
        });
    }

    deleteLog(key) {
        const { navigation } = this.props;
        this.setState({
            isLoading: true
        });
        firebase.firestore().collection('logs').doc(key).delete().then(() => {
            this.setState({
                isLoading: false
            });
            navigation.navigate('Home');
        }).catch((error) => {
            this.setState({
                isLoading: false
            });
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
            <ScrollView>
                <Card style={styles.container}>
                    <View style={styles.subContainer}>
                        <Card>
                            <View>
                                <Text h4>{this.state.log.date}</Text>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text h4> Şiddet - {this.state.log.severity}</Text>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text h4> {this.state.log.location}</Text>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text h4> {this.state.log.triggers}</Text>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text h4>{this.state.log.medicationTaken}</Text>
                            </View>
                        </Card>
                        <Card>
                            <View>
                                <Text h4>{this.state.log.notes}</Text>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.detailButton}>
                        <Button
                            large
                            backgroundColor={'#CCCCCC'}
                            leftIcon={{ name: 'edit' }}
                            title='Düzenle'
                            onPress={() => {
                                this.props.navigation.navigate('Edit', {
                                    logkey: `${JSON.stringify(this.state.key)}`,
                                });
                            }} />
                    </View>
                    <View style={styles.detailButton}>
                        <Button
                            large
                            backgroundColor={'#999999'}
                            color={'#FFFFFF'}
                            leftIcon={{ name: 'delete' }}
                            title='Sil'
                            onPress={() => this.deleteLog(this.state.key)} />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    subContainer: {
        flex: 1,
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
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
    detailButton: {
        marginTop: 10
    }
})
