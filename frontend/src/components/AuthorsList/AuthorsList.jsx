import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Authors from '../Authors'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}))

const authors = fetch('http://localhost:3000/api/v1/authors').then(res => res.json()).map(author => <Grid item xs={12}><Authors name={author.name} id={author.id}/></Grid>)

export default function AuthorsList () {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {authors}
      </Grid>
    </div>
  )
}
