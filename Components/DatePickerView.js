import React, { Component } from 'react';

import { DatePickerIOS, Text, View, Modal, StyleSheet, Image, FlatList } from 'react-native';

import { Card, ListItem, Button } from 'react-native-elements'

const DatePickerView = (props) => {
  return (
    <View>
      <Text style={{fontWeight: 'bold'}}>
        Beginning Date:
      </Text>
      <DatePickerIOS
        mode='date'
        date={props.date}
        onDateChange={props.onDateChange}
      />
    </View>
  )
}

export default DatePickerView
