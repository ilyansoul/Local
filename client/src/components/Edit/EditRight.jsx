import React, { Component } from 'react';
import '../styles/EditRight.css'
import { useState } from 'react'
import EditSection from './EditSection'



class EditRight extends Component {
    constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      confirmPassword: null,
      error: null
    };


  this.state = {
    imageUrls: ['', '', '', '', '', '', '', '', ''],
  };
}



  handleImageChange = (event, index) => {
    const imageUrls = [...this.state.imageUrls];
    if (event.target.files.length > 0) {
      imageUrls[index] = URL.createObjectURL(event.target.files[0]);
    } else {
      imageUrls[index] = '';
    }
    this.setState({ imageUrls });
  };


  render() {
    return (
      <div className="dash-container">
      <EditSection/>
      <h1> Ajouter/Modifier Photo</h1>
        <form className='form-modify' action='https://finalback-rvru.onrender.com/api/uploads' method='POST' >
          <br />
          <br />



          <div className="picture-container">

            <div className="row1 col1">
              <input className='input-image'
                name='imageUrls'
                type="file"
                onChange={(event) => this.handleImageChange(event, 0)}
              />
              {this.state.imageUrls[0] ? (
                <img className='box-img' src={this.state.imageUrls[0]} alt="" />
              ) : (
                <p></p>
              )}
            </div>
            <div className="row1 col2">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 1)}
              />
              {this.state.imageUrls[1] ? (
                <img  className='box-img' src={this.state.imageUrls[1]} alt="" />
              ) : (
                <p></p>
              )}
            </div>
            <div className="row1 col3">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 2)}
              />
              {this.state.imageUrls[2] ? (
                <img className='box-img' src={this.state.imageUrls[2]} alt="" />
              ) : (
                <p></p>
              )}
            </div>
            <div className="row2 col1">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 3)}
              />
              {this.state.imageUrls[3] ? (
                <img className='box-img' src={this.state.imageUrls[3]} alt="" />
              ) : (
                <p></p>
              )}
            </div>

            <div className="row2 col2">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 4)}
              />
              {this.state.imageUrls[4] ? (
                <img className='box-img'  src={this.state.imageUrls[4]} alt="" />
              ) : (
                <p></p>
              )}
            </div>



            <div className="row2 col3">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 5)}
              />
              {this.state.imageUrls[5] ? (
                <img className='box-img' src={this.state.imageUrls[5]} alt="" />
              ) : (
                <p></p>
              )}
            </div>
            <div className="row3 col1">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 6)}
              />
              {this.state.imageUrls[6] ? (
                <img className='box-img' src={this.state.imageUrls[6]} alt="" />
              ) : (
                <p></p>
              )}
            </div>

            <div className="row3 col2">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 7)}
              />
              {this.state.imageUrls[7] ? (
                <img className='box-img' src={this.state.imageUrls[7]} alt="" />
              ) : (
                <p></p>
              )}
            </div>

            <div className="row3 col3">
              <input className='input-image'
                name='imageUrls'

                type="file"
                onChange={(event) => this.handleImageChange(event, 8)}
              />
              {this.state.imageUrls[8] ? (
                <img className='box-img' src={this.state.imageUrls[8]} alt="" />
              ) : (
                <p></p>
              )}
            </div>





            <button type="submit" className="btn-submit">Modifier</button>
            {this.state.error && <div className="error-message">{this.state.error}</div>}



          </div>
        </form>
      </div>
    );
  }
}

export default EditRight;
