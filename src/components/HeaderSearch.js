import React from 'react'
import { Search, XCircle } from 'react-feather';
import styles from '../styles/style.scss'

export default class HeaderSearch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchMode: false
      }
      this.showSearchForm = this.showSearchForm.bind(this);
      this.escFunction = this.escFunction.bind(this);
      this.hideSearchForm = this.hideSearchForm.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.inputRef = React.createRef();
    }
    
    componentDidUpdate() {
      if(this.state.searchMode){
         this.inputRef.current.focus();
      }
    }

    showSearchForm() {
      this.setState({
        searchMode: true
      })
      
    }
    hideSearchForm() {
      this.setState({
        searchMode: false
      })
    }
    escFunction(event){
      if(event.keyCode === 27) {
        this.hideSearchForm();
      }
    }
    onSubmit(e) {
      this.hideSearchForm();
      this.props.onClick(e);
    }
    componentDidMount(){
      document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
      document.removeEventListener("keydown", this.escFunction, false);
    }
  
    render() {
      const {query, totalResult, onInputChange, executionTime} = this.props;
      const { searchMode } = this.state;
      return (
        <header className="SearchHeader__container">
        {
          searchMode ? (
          <form className="SearchHeader__form" onSubmit={this.onSubmit}>
              <input type="text" onChange={onInputChange} value={query} ref={this.inputRef}></input>
              <div className="SearchHeader__close" onClick={this.hideSearchForm}>
                <XCircle color={styles.blackText}/>
              </div>
              <div onClick={this.onSubmit}>
                  <Search color={styles.blackText}/>
              </div>
          </form>
        ) : (
          <React.Fragment>
          <div>
            <h1 className="SearchHeader__h1">Result for <strong>{query}</strong></h1>
            {executionTime ? (
            <span>Found {totalResult} result(s) in {executionTime.toFixed(3)}ms</span>
            ) : <span>searching...</span>
            }
          </div>
          <div onClick={this.showSearchForm}>
            <Search color={styles.blackText}/>
          </div>
       </React.Fragment>
        )
        }
      </header>
      )
    }
  } 