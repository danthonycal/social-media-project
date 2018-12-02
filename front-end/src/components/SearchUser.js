import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import local_storage from localStorage;

export default class SearchUser extends Component {
    constructor(props) {
        super(props);
        autobind(this);
        this.state  = {
            isLoading       : false,
            data            : [],     /* array that contains all the users from the database */
            results         : [],     /* array that will contain the results of the searched user */
            value           : '',
            open            : false, /*true if modal is open*/
        }
    }

    componentWillMount() {
        let self = this;
        axios.get("/app/find-all")
        .then(function (response) {
            console.log(response.data);
            self.setState({
                data : response.data
            })
        })
    }
    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()

            if (value === '?' || value === '+' || value === '/') console.log("Invalid")  // if the input is an invalid character
            else {
            const re = new RegExp(value.toLowerCase());   // lowercase the input inside the search bar
            const res = [];                              // container for the result being matched by the regex

            for(let i = 0; i < this.state.data.length; i++) {        // loop through the whole data array
                let name = this.state.data[i].username + " " + this.state.data[i].name;
                name = name.toLowerCase();

                if (re.test(name)) { // if the input is a substring of 'name', which is the concatenation of users' username and name
                    res.push(this.state.data[i]);  // push the matched results to the previously declared container
                }
            }

            this.setState({
                isLoading: false,
                results : res        // set the results to the container
                })
            }
        }, 300)
    }

  render() {
    const { isLoading, value, results } = this.state

    return (
        <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
        {...this.props}
        />
    )
  }
}
