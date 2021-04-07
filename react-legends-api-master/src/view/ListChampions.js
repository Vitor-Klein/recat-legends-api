import React, { Component } from 'react';
import Loader from '../components/Loader';

const urlAPI = "https://ddragon.leagueoflegends.com/cdn/9.22.1/data/";
const ChampionAPI= "/champion.json";

class ListChampions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ListChampions: [],
      DefaultList: [],
      isLoading: true,
      error: null,
      SelectedLanguage: ''
    }
  }

  componentDidMount() {
    const SelectedLanguage = this.props.location.state.SelectLanguage

    console.log(SelectedLanguage);
    
    fetch(urlAPI + SelectedLanguage + ChampionAPI)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Algo errado');
        }
      })
      .then(result => this.setState({
        ListChampions: Object.keys(result.data).reduce((array, key) => {
          return [...array, { champion: result.data[key], tag: result.data[key].tags }]
        }, []),
        defaultChampions: Object.keys(result.data).reduce((array, key) => {
          return [...array, { champion: result.data[key], tag: result.data[key].tags }]
        }, []),
        isLoading: false,
      }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  filterSelect = event => {
    const filterType = [];
    const filterDefault = this.state.defaultChampions;
    const selectedOption = event.target.value;

    this.setState({ListChampions: filterDefault}, () => {
      for (const champ of this.state.ListChampions) {
        if (champ.tag[0] === selectedOption) {
          filterType.push(champ);
        } else if ( selectedOption === 'all') {
          filterType.push(champ);
        }
      }
      this.setState({ ListChampions: filterType})
    });
  }

  selectedChampion = event => {
    const selectedChampion = event.target.id;
    const SelectedLanguage = this.props.location.state.SelectLanguage;

    this.props.history.push({ pathname: '/Champion', state: { selectedChampion, SelectedLanguage }})
  }

  backButton = event => {
    this.props.history.goBack();
  }

  render () {
    const { isLoading, error } = this.state;

    if (isLoading) { return <Loader /> }
    if (error) { return <p>{error.message} </p> }
    
    return (
      <div className="wrapper">
        <div className="wrapper_cards">
          <div className="mini_header">
            <select className="select_default" onChange={this.filterSelect}>
              <option value="all">All</option>
              <option value="Tank">Tank</option>
              <option value="Mage">Mage</option>
              <option value="Fighter">Fighter</option>
              <option value="Assassin">Assassin</option>
              <option value="Support">Support</option>
              <option value="Marksman">Marksman</option>
            </select>

            <div className="back">
              <button className="button_default -sm"
              onClick={this.backButton}>
                <i className="fas fa-chevron-left"></i>
              </button>
            </div>
          </div>

          <div className="wrapper_cards_list">
            {this.state.ListChampions.map((champion, key) => (
              <div key={key}
              id={champion.champion.id}
              onClick={this.selectedChampion}
              className="cards">
                <h1>{champion.champion.name}</h1>
                <img src={"http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.champion.id + "_0.jpg"} alt={champion.champion.key}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default ListChampions;