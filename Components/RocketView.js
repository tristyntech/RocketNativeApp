import React, { Component } from 'react';

import { Text, View, Modal, StyleSheet, Image, FlatList } from 'react-native';

import { Card, ListItem, Button } from 'react-native-elements'



export default class RocketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
              <Card
                title={this.props.selected.name}
                image={{uri: this.props.selected.rocket.imageURL}}>
                <Text style={{marginBottom: 10}}>
                  <Text>Launched At: {this.props.selected.windowstart}</Text>{"\n"}{"\n"}
                  <Text>Rocket Name: {this.props.selected.rocket.name}</Text>{"\n"}{"\n"}
                  <Text>Launch Country: {this.props.selected.location.countryCode}</Text>{"\n"}{"\n"}
                  <Text>Launch Location: {this.props.selected.location.name}</Text>{"\n"}{"\n"}
                  <Text>Agencies:</Text>
                </Text>
                  <FlatList
                    title="test"
                    data={this.props.selected.rocket.agencies}
                    renderItem={({item, i}) => <Text key={'agency' + i} style={{marginLeft: 12}}>{item.name}</Text>}
                    keyExtractor={(item, index) => index}
                  />

              <View>
                <Button
                  onPress={() => {this.props.action(this.props.index)} }
                  color= 'white'
                  title={this.props.actionLabel}
                  style={{width: '70%', marginLeft: '15%', marginTop: 10}}
                  >
                </Button>
                <Button
                    onPress={() => {this.props.toggleModal()} }
                    color= 'white'
                    style={{width: '70%', marginLeft: '15%', marginTop: 10}}
                    title="Close modal"
                    >
                </Button>
              </View>
              </Card>
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
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#e8e8e8',
  },
  innerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});
