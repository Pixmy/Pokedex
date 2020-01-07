import React, {Component} from "react"
import "../styles/grid.style.css"
import Pokemon from '../components/pokemon.component'
import axios from 'axios'

export default class Grid extends Component{

    state = {
        pokemon: [],
        pokeCount:0,
        infiniteLoading: false
    }

    async componentDidMount(){
        this.loadPokemon();
        window.addEventListener("scroll", this.handleOnScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleOnScroll);
    }

    async loadPokemon(){
        const {pokemon} = this.state
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${this.state.pokeCount}&limit=20`
        const response = await axios.get(url)
        const pokeList = response.data['results']
        this.setState({infiniteLoading:false, pokemon:[...pokemon, ...pokeList]})
        
    }  

    handleInfiniteLoad = async () => {
        this.setState({ infiniteLoading: true , pokeCount: this.state.pokeCount + 20});
        this.loadPokemon();
    };

    handleOnScroll = () => {
        const scrollTop =
          (document.documentElement && document.documentElement.scrollTop) ||
          document.body.scrollTop;
        const scrollHeight =
          (document.documentElement && document.documentElement.scrollHeight) ||
          document.body.scrollHeight;
        const clientHeight =
          document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom =
          Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            this.handleInfiniteLoad()
        }
      };

    render(){
        return(
            <div id="pokemon-grid">
                {
                    this.state.pokemon ? (
                        this.state.pokemon.map(pokemon => (
                        <Pokemon
                            key={pokemon.name} name={pokemon.name} url={pokemon.url} data={this.props}
                        ></Pokemon>
                    ))
                    ) : (
                        <h1>Loading</h1>
                    )
                }
            </div>
        )
    }
}