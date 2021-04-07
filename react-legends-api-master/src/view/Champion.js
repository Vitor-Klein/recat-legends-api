import React, { Component } from 'react';
import Loader from '../components/Loader';

const BaseChampionAPI = "http://ddragon.leagueoflegends.com/cdn/10.6.1/data/";

class Champion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: [],
      skin: [],
      showResults: false,
      isLoading: true,
      error: null
    }
  }

  componentDidMount() {
    const SelectedLanguage = this.props.location.state.SelectedLanguage
    const selectedChampion = this.props.location.state.selectedChampion

    this.setState({ selectedChampion: this.props.location.state.selectedChampion })
    this.setState({ SelectedLanguage: this.props.location.state.SelectedLanguage })

    fetch(BaseChampionAPI + SelectedLanguage + '/champion/' + selectedChampion + '.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Algo errado');
        }
      })
      .then(result => this.setState({
        champ: Object.keys(result.data).reduce((array, key) => {
          return [...array, { champion: result.data[key] }]
        }, []),
        isLoading: false,
        skin: result.data[selectedChampion].skins
      })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  showSkins = event => {
    if (this.state.showResults === false) {
      this.setState({ showResults: true});
    } else {
      this.setState({ showResults: false});
    }
  }

  backButton = event => {
    this.props.history.goBack()
  }

  render () {
    const { isLoading, error, skin, selectedChampion, showResults } = this.state;
    const items = [];

    if (showResults === true) {
      for(const item of skin) {
        items.push(
          <div>
            <img key={item.id} alt={item.id} src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + selectedChampion + "_" + item.num + ".jpg"} />
          </div>
        )
      }
    }

    if (isLoading) { return <Loader />; }
    if (error) { return <p>{error.message}</p>; }

    return (
      <div className="wrapper">
        <div className="wrapper_cards -noScroll">
          {this.state.champ.map((champion, key) => (
            <div key={key} className="champion">
              <div className="mini_header">
                <div className="name">
                  <h1 className="title">{champion.champion.id}</h1>
                  <h5>{champion.champion.title}</h5>
                </div>
                <div className="back">
                <button className="button_default -sm"
                  onClick={this.backButton}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                </div>
              </div>

              <div className="wrapper_informations">
                <div className="image">
                  <img key={champion.champion.id} alt={champion.champion.id} src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + selectedChampion + "_0" + ".jpg"} />
                </div>

                <div className="informations">
                  <h3>History</h3>
                  <div className="information_desc">
                    <p>{champion.champion.lore}</p>
                  </div>
                  <div className="information_skins">
                    <button className="button_default" onClick={this.showSkins}>Show Skins</button>
                    <div className="skins">
                      {items}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Champion;