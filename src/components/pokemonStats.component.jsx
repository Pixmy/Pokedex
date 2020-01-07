import React, {Component} from 'react'
import "../styles/pokemonStats.style.css"
import axios from 'axios'

export default class PokemonStats extends Component{

    state = {
        imageUrl:"",
        data:""
    }

    async componentDidMount(){
        const pokemonStats = `https://pokeapi.co/api/v2/pokemon/${this.props.match.params.pokemonid}`
        let response = await axios.get(pokemonStats)
        console.log(response.data)
        let imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${this.props.match.params.pokemonid}.png?raw=true`
        this.setState({imageUrl:imageUrl, data:response.data})
    }
    
    render(){
        return(
            <div className="conteiner"><div className="pokeInfo">
                <h2>{this.state.data.name}</h2>
                <div className="center"><img alt="pokemon" className="poke-img" src={this.state.imageUrl}></img></div>
                
                {
                    this.state.data ? (
                        <React.Fragment>
                        <div className="types">
                        {this.state.data.types.map(type => (
                       <p className="type">{type.type.name}</p>
                    ))}
                </div>
                <div className="stats">
                {this.state.data.stats.map(item => (
                        <div><p className="statName">{item.stat.name}</p>
                        <div className="stat">
                            <div className="statValue" style={{width:item.base_stat+'%'}}></div>
                        </div></div>
                    ))}
                </div>
                </React.Fragment>

                    ) : (
                        <h1>Loading</h1>
                    )
                }
                

                </div></div>
                
        )
    }
}
