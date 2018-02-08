import React, { Component } from 'react';

// React Native Imports
import { DatePickerIOS, Text, View, Modal, StyleSheet, FlatList } from 'react-native';

// Custom Component Imports
import DatePickerControls from './DatePickerControls'
import DatePickerView from './DatePickerView'

export default class DatePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBeginDate: new Date(),
      chosenEndDate: new Date()
    };


    this.setBeginDate = this.setBeginDate.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
  }

  setBeginDate(newDate) {
    this.setState({chosenBeginDate: newDate})
  }

  setEndDate(newDate) {
    this.setState({chosenEndDate: newDate})
  }
  
  submitSearch() {
    this.props.setNewDate(this.state.chosenBeginDate, this.state.chosenEndDate)
    this.props.toggleShowSearchModal()
  }

  render() {
    return (
        <View style={styles.container}>
          <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.container}>
                <DatePickerView
                  title="Beginning Date"
                  date={this.state.chosenBeginDate}
                  onDateChange={this.setBeginDate.bind(this)}
                />
                <DatePickerView
                  title="Beginning Date"
                  date={this.state.chosenEndDate}
                  onDateChange={this.setEndDate.bind(this)}
                />
                <DatePickerControls
                  toggleShowSearchModal={this.props.toggleShowSearchModal}
                  submitSearch={this.submitSearch.bind(this)}
                />
              </View>
              <View style={styles.innerContainer}>
              </View>
            </View>
          </Modal>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e8e8e8'
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});
