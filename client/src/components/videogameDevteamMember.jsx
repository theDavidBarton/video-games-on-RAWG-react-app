import React, { Component, Fragment } from 'react'

class DevteamMember extends Component {
  render() {
    const devteamMember = this.props.data
    return (
      <Fragment>
        <li className='col media my-3'>
          {devteamMember.image ? (
            <img
              className='mr-3 rounded-circle dev-avatar-style'
              alt={devteamMember.name}
              src={
                devteamMember.image.match(/media\/persons_wiki/)
                  ? devteamMember.image.replace('media/persons_wiki', 'media/resize/200/-/persons_wiki')
                  : devteamMember.image.replace('media/persons', 'media/resize/200/-/persons')
              }
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
            <h5 className='mt-0 mb-1'>{devteamMember.name}</h5>
            {devteamMember.positions.map((position, i) => (
              <span key={i}>{`${i ? ', ' : ''} ${position.name}`}</span>
            ))}
          </div>
        </li>
      </Fragment>
    )
  }
}

export default DevteamMember
