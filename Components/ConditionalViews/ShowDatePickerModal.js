import React from 'react';

import DatePickerModal from '../DatePickerModal.js'

const ShowRocketView = (props) => {
  return (
    props.showSearchModal ?
      <DatePickerModal
        setNewDate={props.setNewDate}
        toggleShowSearchModal={props.toggleShowSearchModal}
      /> : null
  )
}

export default ShowRocketView
