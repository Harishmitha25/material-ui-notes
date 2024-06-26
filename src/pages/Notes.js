import React, { useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'

import Masonry from 'react-masonry-css'
import NoteCard from '../components/NoteCard'

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE'
    })
    const newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes);
  }

  const breakpoints = {
    default: 3,
    1100: 2, // px if it reaches 1100px then to 2 cols
    700: 1
  };

  return (
    <Container>
{/* <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>1</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>2</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>3</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper>4</Paper>
        </Grid>
      </Grid>
      // 12 is the number of columns a grid could accommodate in a screen, spacing 3 * 8 (base spacing in material ui)
      <Grid container spacing={3}>
        {notes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note.id}>
            <Paper>{note.title}</Paper>

            
            <NoteCard note={note} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
       */}
      <Masonry
        breakpointCols={breakpoints} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
        {notes.map(note => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
