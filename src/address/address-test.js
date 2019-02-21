import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import styles from './address-test.css';

export default class AddressTest extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: '',
         suggestions: []
      };
   }
   getSuggestionValue = suggestion => suggestion;
   renderSuggestion = suggestion => (
      <div>
         {suggestion}
      </div>
   );
   onChange = (event, {newValue}) => {
      this.setState({
         value: newValue
      });
   };
   onSuggestionsFetchRequested = ({value}) => {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;
      if (inputLength <= 3) {
         this.setState({suggestions: []});
      } else {
         var that = this;
         axios.get(encodeURI(`https://devapi.flexigroup.com.au/address/suggestions?query=${value}`), { 'Auth-Token': process.env.EXPERIAN_AUTH_TOKEN })
         .then(function (res) {
            that.setState({suggestions: res.data.results.map(item => item.address)});
         });
      }
   };
   onSuggestionsClearRequested = () => {
      this.setState({
         suggestions: []
      });
   };
   render() {
      const { value, suggestions } = this.state;
      const inputProps = {
         placeholder: 'Enter your address',
         value,
         onChange: this.onChange
      };
      return (
         <div className={styles.addresscontainer}>
            <fieldset>
               <legend>Address auto-complete testing</legend>
               <Autosuggest theme={styles}
                  suggestions={suggestions}
                  getSuggestionValue={this.getSuggestionValue}
                  renderSuggestion={this.renderSuggestion}
                  inputProps={inputProps}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested} />
            </fieldset>
         </div>
      );
   }
}
