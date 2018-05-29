import React from 'react'
import '../styles/MainPage.css'

const MainPage = () => (
  <div>
    <header><h2>New post</h2></header>
    <p>Describe the details below as much as possible</p>
    <form className="form-post">
      <input type="text" name="title" placeholder="Title" />
      <input type="text" name="author" placeholder="Author" />
      <select>
        <option key="placeholder" value="placeholder">Category</option>
      </select>
      <textarea placeholder="Body" name="body" />
      <button>Post</button>
    </form>
    <time>{new Date().toString()}</time>
  </div>
)

export default MainPage