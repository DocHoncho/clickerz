import React from 'react'

import styles from './styles.module.css'
import Header from 'components/Header/Header'

import Kernel from 'lib/Kernel'
import World from 'lib/World'

export class Container extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {}

    this.state.kernel = new Kernel({ beat: 0, fps: 30, paused: false });
    this.state.world = new World(this.state.kernel);

    this.state.kernel.start();
  }

  render() {
    return (
      <div>
        <Header />
        <Date />
      </div>
    )
  }
}

export default Container;