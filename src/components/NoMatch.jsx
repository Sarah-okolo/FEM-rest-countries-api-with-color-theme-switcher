import React from 'react'
// import '/components-styles/variables.scss'

function NoMatch() {
  const styles = {
    margin: '15vh auto 0',
    textAlign: 'center',
  }
  
  return (
    <>
      <div id="no-match" style={styles}>
        <h1 style = {{fontSize: '30px', fontWeight: '900'}}>OOPS!</h1> <br />
        <p style = {{fontSize: '15px'}}>No country in this region matches your search.</p>
      </div>
    </>
  )
}

export default NoMatch