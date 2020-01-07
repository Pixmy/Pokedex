import React, {Component} from "react"
import "../styles/pokemon.style.css"

export default class Pokemon extends Component{
    state ={
        name:'',
        imageUrl:'',
        pokemonIndex:''
    }

    componentDidMount(){
        const {name, url} = this.props
        const pokemonIndex = url.split("/")[url.split("/").length - 2]
        this.setState({pokemonIndex:pokemonIndex})
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name, 
            imageUrl,
            pokemonIndex
        })
    }

    viewStats = () => {
        this.props.data.history.push(this.state.pokemonIndex)
    }

    render(){
        return(
            <div className="pokemon-card">
                <p className="num">#{this.state.pokemonIndex}</p>
                <div className="pokemon-img">
                    <img alt="not available" src={this.state.imageUrl} />
                </div>
                <p className="pokemon-name">{this.state.name}</p>
                <button onClick={this.viewStats}>View Stats</button>
            </div>
        )
    }
}