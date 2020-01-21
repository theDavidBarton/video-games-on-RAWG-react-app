import React, { Component, Fragment } from 'react'

class DevteamMember extends Component {
  state = {
    data: this.props.data
  }

  render() {
    return (
      <Fragment key={this.state.data.id}>
        <li className='col media my-3'>
          {this.state.data.image ? (
            <img
              alt={this.state.data.name}
              src={
                this.state.data.image.match(/media\/persons_wiki/)
                  ? this.state.data.image.replace('media/persons_wiki', 'media/resize/200/-/persons_wiki')
                  : this.state.data.image.replace('media/persons', 'media/resize/200/-/persons')
              }
              className='mr-3 rounded-circle dev-avatar-style '
            />
          ) : (
            <div className='mr-3'>
              <svg width='90' height='90'>
                <circle cx='45' cy='45' r='45' fill='#6c757d' />
                Sorry, your browser does not support inline SVG.
              </svg>{' '}
            </div>
          )}
          <div className='media-body'>
            <h5 className='mt-0 mb-1'>{this.state.data.name}</h5>
            {this.state.data.positions.map((position, index) => (
              <span key={index + 1}>{(index ? ', ' : '') + position.name}</span>
            ))}
          </div>
        </li>
      </Fragment>
    )
  }
}

export default DevteamMember
