import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

//Redux Imports
import { connect } from "react-redux";
import { addFavorite } from "../actions/favoritesAction.js";
import store from '../store.js';


// Custom Component imports
import FavoritesView from "./FavoritesView.js";
import DatePickerModal from "./DatePickerModal.js";
import RocketView from "./RocketView.js";
import SearchList from "./SearchList.js";
import ShowRocketView from "./ConditionalViews/ShowRocketView.js";
import ShowDatePickerModal from "./ConditionalViews/ShowDatePickerModal.js";

import { Header, ButtonGroup, List, ListItem , SearchBar, Button, Badge } from 'react-native-elements';


class SearchPage extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      chosenBeginDate: new Date(),
      chosenEndDate: new Date(),
      showSearchModal: false,
      selected: [],
      list: [],
      searchString: "",
      filteredList: []
    }

    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  searchLaunches(minDate, maxDate) {
    fetch("https://launchlibrary.net/1.2/launch/" + minDate + "/" + maxDate)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      this.setState({list: res.launches});
    })
  }

  toggleSelected(index) {
    var selected = this.state.searchString.length ? this.state.filteredList[index] : this.state.list[index];
    this.setState({selected: selected})
  }

  setNewDate(beginning, end) {
    var minDate = (beginning.getFullYear() + '-0' + beginning.getMonth() + '-0' + beginning.getDate())
    var maxDate = (end.getFullYear() + '-0' + end.getMonth() + '-0' + end.getDay())
    this.searchLaunches(minDate, maxDate)
  }

  toggleModal(i) {
    this.toggleSelected(i)
    this.setState({showModal: !this.state.showModal, index: i})
  }

  toggleShowSearchModal() {
    this.setState({showSearchModal: !this.state.showSearchModal})
  }

  searchRockets(string) {
      var temp = this.state.list.slice(0);
      var temp = temp.filter((ele) => {
        return ele.location.countryCode.toUpperCase().indexOf(string.toUpperCase()) !== -1
      })
      this.setState({filteredList: temp})
      }

    addToFavorites(index) {
      this.toggleModal()
      var list = this.state.searchString.length ? this.state.filteredList : this.state.list
      var temp = this.props.favorites || [];
        if (!temp.includes(list[index])) {
        temp.push(list[index]);
        this.props.addFavorite({favorites: temp})
      }
    }

  render() {
    const { selectedIndex } = this.state
    return (
        <View style={{flex: 1}}>

          <ShowRocketView
            showModal={this.state.showModal}
            index={this.state.index}
            actionLabel="Add To Favorites"
            action={this.addToFavorites.bind(this)}
            selected={this.state.selected}
            toggleModal={this.toggleModal.bind(this)}
          />
          <ShowDatePickerModal
            showSearchModal={this.state.showSearchModal}
            setNewDate={this.setNewDate.bind(this)}
            toggleShowSearchModal={this.toggleShowSearchModal.bind(this)}
          />
          <Header
            centerComponent={{ text: 'Rocket Search App', style: { color: '#fff' } }}
          />
          <ScrollView>


            <SearchBar
              containerStyle={{backgroundColor: 'white'}}
              lightTheme
              id="searchBar"
              onChangeText={ (searchString) => {
                this.setState ({searchString})
                this.searchRockets(searchString) } }
              icon={{ type: 'font-awesome', name: 'search' }}
              placeholder='Filter...'
            />

            <List containerStyle={{marginBottom: 20}}>
              {
                this.state.list.length ?
                null
              :
              <Badge containerStyle={{ width: '80%', marginLeft: '10%', marginTop: 10, backgroundColor: '#e2e2e2'}}>
                <Text>Tap 'Search Launches' to do a search!</Text>
              </Badge>
            }
              {
                this.state.searchString.length ?
                  <SearchList
                    toggleModal={this.toggleModal.bind(this)}
                    list={this.state.filteredList}
                   />
                :
                <SearchList
                  toggleModal={this.toggleModal.bind(this)}
                  list={this.state.list}
                 />

              }
            </List>
          </ScrollView>
          <Button
            onPress={ ()=>{ this.toggleShowSearchModal() } }
            style={{width: '100%', marginTop: 7, marginBottom: 7}}
            title="Search Launches"
           />
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
    addFavorite: object => {
      dispatch(addFavorite(object));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
