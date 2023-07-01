import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:12,
    category:'general',
  }
  static propTypes= {
    name:PropTypes.string,
    pageSize:PropTypes.number,
    category :PropTypes.string
  }
   capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello i am constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page:1,

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`
  };
  async updateNews()
  {
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3867874e1740421a8842a70edc6696f5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false });

  }
  async componentDidMount() {
   this.updateNews();
  }
  handleNextClick=async()=>
  {
   //if(!(this.state.page + 1> Math.ceil(this.state.totalresults/this.props.pageSize))){

   //
   //console.log("next click");
   //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3867874e1740421a8842a70edc6696f5&page= ${this.state.page + 1}&pageSize=${this.props.pageSize}`;
   //this.setState({loading:true});
   //let data = await fetch(url);
   //let parsedData = await data.json();
   //console.log(parsedData);
   //this.setState({
   //  page:this.state.page + 1,
   //  articles: parsedData.articles,
   //  loading:false
   //}
   //)
   //}
   this.setState({page:this.state.page +1});
   this.updateNews();
  }
  handlePreviousClick=async()=>
  {
   //console.log("previous click");
   //let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3867874e1740421a8842a70edc6696f5&page= ${this.state.page - 1}&pageSize=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
   //this.setState({loading:true});
   //let data = await fetch(url);
   //let parsedData = await data.json();
   //console.log(parsedData);
   //this.setState({
   //  page:this.state.page - 1,
   //  articles:parsedData.articles,
   //  loading:false
   //})
   this.setState({page:this.state.page -1});
   this.updateNews();
  }
  render() {
    console.log("render");
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ marginTop:'90px'}}>NewsMonkey -Top   {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <div className="row">
          {!this.state.loading&&this.state.articles.map((element) => {
            
            return  <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}type="button" class="btn btn-dark" onClick={this.handlePreviousClick}>
            Previous
          </button>
          <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default News;
