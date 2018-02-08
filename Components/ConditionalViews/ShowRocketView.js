import React from 'react';

import RocketView from '../RocketView.js'

const ShowRocketView = (props) => {
  console.log("props.selected inside of showrocket vidw is : ",props.selected)
  return (
      props.showModal ?
        <RocketView
          index={props.index}
          actionLabel={props.actionLabel}
          action={props.action}
          selected={props.selected}
          toggleModal={props.toggleModal}
        /> : null

  )
}

export default ShowRocketView
