import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import firebase from '../Firebase';
import 'firebase/firestore';

export default class EditScreen extends Component {
  static navigationOptions = {
    title: 'Edit',
  };

  constructor() {
    super();
    this.state = {
      key: '',
      isLoading: true,
      date: new Date(),
      severity: [],
      medicationTaken: '',
      notes: ''
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const ref = firebase.firestore().collection('logs').doc(JSON.parse(navigation.getParam('logkey')));
    ref.get().then((doc) => {
      if (doc.exists) {
        const log = doc.data();
        this.setState({
          date: new Date(log.date),
          key: doc.id,
          severity: log.severity,
          medicationTaken: log.medicationTaken,
          notes: log.notes,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  updateLog() {
    this.setState({
      isLoading: true,
    });
    const updateRef = firebase.firestore().collection('logs').doc(this.state.key);
    updateRef.set({
      date: this.state.date.toString(),
      severity: this.state.severity,
      medicationTaken: this.state.medicationTaken,
      notes: this.state.notes,
    }).then((docRef) => {
      this.setState({
        key: '',
        date: new Date(),
        severity: [],
        medicationTaken: '',
        notes: '',
        isLoading: false,
      });
      this.props.navigation.navigate('Home');
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
        this.setState({
          isLoading: false,
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
      <ScrollView >
        <View style={styles.container}>

          <View style={styles.subContainer}>
            <DatePicker
              date={this.state.date}
              onDateChange={date => this.setState({ date: date })}
            />
          </View>

          <View style={styles.subContainer}>
            <Picker
              selectedValue={this.state.severity}
              style={{ height: 50, width: 320 }}
              onValueChange={(itemValue) =>
                this.setState({ severity: itemValue })
              }>
              <Picker.Item label="Severity" value="0" />
              <Picker.Item label="1-Mild" value="1" />
              <Picker.Item label="2 " value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5-Moderate" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10-Severe" value="10" />
            </Picker>
          </View>

          <View style={styles.subContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Medication Taken'}
              value={this.state.medicationTaken}
              onChangeText={(text) => this.updateTextInput(text, 'medicationTaken')}
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Notes'}
              value={this.state.notes}
              onChangeText={(text) => this.updateTextInput(text, 'notes')}
            />
          </View>

          <View style={styles.button}>
            <Button
              large
              leftIcon={{ name: 'update' }}
              title='Update'
              onPress={() => this.updateLog()} />
          </View>
        </View>
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
    marginBottom: 20,
    padding: 5,
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
  }
})

