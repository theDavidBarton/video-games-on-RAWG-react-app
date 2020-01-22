import React, { Component } from 'react'
import Trending from './homepageTrending'
import TrendingSkeletonLoading from './homepageTrendingSkeletonLoading'

class TrendingList extends Component {
  state = {
    topVideogameCount: [
      { id: 1, value: 0 },
      { id: 2, value: 1 },
      { id: 3, value: 2 },
      { id: 4, value: 3 },
      { id: 5, value: 4 },
      { id: 6, value: 5 },
      { id: 7, value: 6 },
      { id: 8, value: 7 },
      { id: 9, value: 8 },
      { id: 10, value: 9 }
    ]
  }

  render() {
    return (
      <div className='bg-dark py-5'>
        {this.props.dataIsReady ? (
          <div className='container'>
            <div className='row'>
              {this.state.topVideogameCount.map(videogames => (
                <Trending
                  key={videogames.id}
                  value={videogames.value}
                  data={this.props.data}
                  selectedVideogame={this.props.selectedVideogame}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className='container'>
            <div className='row'>
              {this.state.topVideogameCount.map(videogames => (
                <TrendingSkeletonLoading key={videogames.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TrendingList
