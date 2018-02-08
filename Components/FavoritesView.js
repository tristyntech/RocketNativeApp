import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Header, ButtonGroup, Badge, List, ListItem , SearchBar, Button } from 'react-native-elements';

//Redux Imports
import { connect } from "react-redux";
import { addFavorite } from "../actions/favoritesAction.js";
import { deleteFavorite } from "../actions/favoritesAction.js";

// Custom Component imports
import ShowRocketView from './ConditionalViews/ShowRocketView.js'

class FavoritesView extends React.Component {
  constructor () {
    super()
    this.state = {
      favorites: [],
      test: true,
      selected: [],
      showModal: false
    }
  }

  componentWillMount() {
    this.test()
  }

  set() {
    this.setState({favorites: this.props.favorites})
  }

  test() {
    setInterval(()=>{
      this.set()
    }, 2500)
  }

  toggleModal(i) {
    this.toggleSelected(i)
    this.setState({showModal: !this.state.showModal, index: i})
  }

  removeFavorite(index) {
    this.props.deleteFavorite({index: index})
    this.toggleModal(index)
  }

  toggleSelected(index) {
    var selected = this.state.favorites[index];
    this.setState({selected: selected})
  }

  render() {
    const { selectedIndex } = this.state
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{ text: 'Rocket Search App', style: { color: '#fff' } }}
        />

        <ShowRocketView
          showModal={this.state.showModal}
          index={this.state.index}
          actionLabel="Remove Favorite"
          action={this.removeFavorite.bind(this)}
          selected={this.state.selected}
          toggleModal={this.toggleModal.bind(this)}
        />

        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.favorites ?
            this.props.favorites.map((ele, i) => {
              return (
                <ListItem
                  onPress={()=>{ this.toggleModal(i) }}
                  avatar={{uri:ele.rocket.imageURL}}
                  key={'favorite' + i}
                  title={ele.name}
                  roundAvatar
                />
              )
            }) :
            <Badge containerStyle={{ width: '80%', marginLeft: '10%', marginTop: 10, backgroundColor: '#e2e2e2'}}>
              <Text>You have no favorites right now</Text>
            </Badge>
          }
        </List>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    favorites: state.favoritesReducer.favorites
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteFavorite: index => {
      dispatch(deleteFavorite(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesView);
