import React, { Component } from 'react';

import { DatePickerIOS, Text, View, Modal, StyleSheet, Image, FlatList } from 'react-native';

import { Card, ListItem, Button } from 'react-native-elements'

const DatePickerControls = (props) => {
  return (
    <View>
      <Button
        onPress={ ()=>{ props.submitSearch() } }
        title="Search"
      />
      <Button
        onPress={ ()=>{ props.toggleShowSearchModal() } }
        style={{marginTop: 7}}
        title="Cancel"
      />
    </View>
  )
}

export default DatePickerControls
