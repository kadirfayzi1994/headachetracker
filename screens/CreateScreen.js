import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import MultiSelect from 'react-native-multiple-select';
import firebase from '../Firebase';
import 'firebase/firestore';
import 'react-native-vector-icons';


export default class CreateScreen extends Component {

  locationItems = [
    { id: '1', name: 'Kafanın Arka Tarafı' },
    { id: '2', name: 'Alın' },
    { id: '3', name: 'Sol Tarafı' },
    { id: '4', name: 'Sağ Tarafı' },
    { id: '5', name: 'Sinüs' },
  ];
  triggerItems = [
    { id: '1', name: 'Alkol' },
    { id: '2', name: 'Susuzluk' },
    { id: '3', name: 'Egzersiz' },
    { id: '4', name: 'Uykusuzluk' },
    { id: '5', name: 'Gürültü' },
    { id: '6', name: 'Açlık' },
    { id: '6', name: 'Stres' },
    { id: '6', name: 'Güneşe Maruz Kalma' },
  ];
  medicationItems = [
    { id: '1', name: 'Acetaminophen' },
    { id: '2', name: 'Aspirin' },
    { id: '3', name: 'Kahve' },
    { id: '4', name: 'Ibuprofen' },
    { id: '5', name: 'Naproxen' },
    { id: '6', name: 'Çay' },
    { id: '6', name: 'Su' },
  ];


  static navigationOptions = {
    title: 'Kayıt Oluştur',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('logs');
    this.state = {
      date: new Date(),
      severity: '',
      location: [],
      triggers: [],
      medicationTaken: [],
      notes: '',
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveLog() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      date: this.state.date.toString(),
      severity: this.state.severity,
      location: this.state.location,
      triggers: this.state.triggers,
      medicationTaken: this.state.medicationTaken,
      notes: this.state.notes,
    }).then((docRef) => {
      this.setState({
        date: new Date(),
        severity: '',
        location: [],
        triggers: [],
        medicationTaken: [],
        notes: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
      .catch((error) => {
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
      <ScrollView>
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
              style={{ height: 50, width: 300 }}
              onValueChange={(itemValue) =>
                this.setState({ severity: itemValue })
              }>
              <Picker.Item label="Şiddet" value="0" />
              <Picker.Item label="1-Hafif" value="1" />
              <Picker.Item label="2 " value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5-Orta" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10-Şiddetli" value="10" />
            </Picker>
          </View>

          <View style={styles.subContainer}>
            <MultiSelect
              items={this.locationItems}
              uniqueKey="name"
              ref={component => { this.multiSelect = component }}
              onSelectedItemsChange={location => { this.setState({ location }) }}
              selectedItems={this.state.location}
              selectText="Lokasyon"
              searchInputPlaceholderText="Ara..."
              submitButtonColor="#48d22b"
              submitButtonText="Tamam"
            />
          </View>

          <View style={styles.subContainer}>
            <MultiSelect
              items={this.triggerItems}
              uniqueKey="name"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={triggers => { this.setState({ triggers }) }}
              selectedItems={this.state.triggers}
              selectText="Tetikleyiciler"
              searchInputPlaceholderText="Ara..."
              submitButtonColor="#48d22b"
              submitButtonText="Tamam"
            />
          </View>

          <View style={styles.subContainer}>
            <MultiSelect
              items={this.medicationItems}
              uniqueKey="name"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={medicationTaken => { this.setState({ medicationTaken }) }}
              selectedItems={this.state.medicationTaken}
              selectText="Alınan İlaçlar"
              searchInputPlaceholderText="Ara..."
              submitButtonColor="#48d22b"
              submitButtonText="Tamam"
            />
          </View>

          <View style={styles.subContainer}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Notlar'}
              value={this.state.notes}
              onChangeText={(text) => this.updateTextInput(text, 'notes')}
            />
          </View>
          <View style={styles.button}>
            <Button
              large
              leftIcon={{ name: 'save' }}
              title='Kaydet'
              onPress={() => this.saveLog()} />
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
