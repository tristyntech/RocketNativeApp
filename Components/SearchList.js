import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { ListItem } from 'react-native-elements';



const SearchList = (props) => {
  return (
    props.list.map((ele, i) => {
      return (
        <ListItem
          onPress={()=>{ props.toggleModal(i) }}
          avatar={{uri:ele.rocket.imageURL}}
          key={'rocket' + i}
          title={ele.name}
          roundAvatar
        />
      )
    })
  )
}

export default SearchList;
