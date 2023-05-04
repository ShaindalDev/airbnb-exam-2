// React import
import React, { Component} from "react";
// Axios Import
import axios from "axios";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

class SearchFilter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Venue: [],
        }
        this.cancelToken = ''
        this.getVal = this.getVal.bind(this)
        this.node = React.createRef()
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.getVal)
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.getVal)
    }
    getVal = (e) => {
        if (this.node.current.contains(e.target)) {
            return
        }
        this.setState({
            venueList: [],
        })
    }
    onChange = async (e) => {
        if (this.cancelToken) {
            this.cancelToken.cancel()
        }
        this.cancelToken = axios.CancelToken.source()
        await axios
        .get('https://api.noroff.dev/api/v1/holidaze/venues', { cancelToken: this.cancelToken.token,
        })
        .then((res) => {
            this.setState({
                Venue: res.data,
            })
        })
        .catch((e) => {
            if (axios.isCancel(e) || e) {
                console.log('No results to show.')
            }
        })
        let stringKwd = e.target.value.toLowerCase()
        let filterData = this.state.Venue.filter((venue) => {
            return venue.name.toLowerCase().indexOf(stringKwd) !== -1
        })
        this.setState({
            Venue: filterData,
        })
    }
    render() {

        return (
            <div>
              <div className='max-w-sm px-4'>
                <div className='relative input-group'>
                  <MagnifyingGlassIcon className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-500 left-3"/>
                  <input
                    type='text'
                    ref={this.node}
                    onClick={this.getVal}
                    onChange={this.onChange}
                    placeholder='Search'
                    className='w-full py-3 pl-12 pr-4 text-gray-400 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-accent'
                  />
                </div>
              </div>
              <div className="list-group">
                {this.state.Venue.map((venue) => {
                    return [
                        <a className="list-group-item list-group-item-action" key={venue.id}>
                            {venue.name}
                        </a>
                    ]
                })}
              </div>
            </div>
          );
}
}

export default SearchFilter;
