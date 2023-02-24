import {Roulette} from "../components/Roulette"
import {Button, Grid, TextField} from "@mui/material"
import {useState} from "react"
import {Candidate} from "../types";
import {CandidateForm} from "../components/CandidateForm";

export default function Home() {
  const [candidates, setCandidates] = useState([])
  const [spin, setSpin] = useState(false);
  const [text, setText] = useState("");

  const handleAddCandidate = (e) => {
    if (e.keyCode === 13) {
      const newCandidate: Candidate = {
        id: candidates.length + 1,
        name: e.target.value
      }
      const newCandidates = [...candidates, newCandidate]
      setCandidates(newCandidates)
      setText("")
    }
  }

  const handleChangeText = (e) => {
    setText(e.target.value)
  }

  const handleDeleteCandidate = (id: number) => {
      setCandidates(candidates.filter((candidate) => (candidate.id !== id)))
    }

  return (
    <>
      <Grid container alignItems={"center"} direction={"column"} spacing={3}>
        <Grid item>
          <Roulette candidates={candidates} spin={spin}/>
        </Grid>
        <Grid container item justifyContent={"space-between"} style={{width: "500px"}} >
          <Grid item>
            <TextField variant={"outlined"} fullWidth value={text} onChange={handleChangeText} onKeyDown={handleAddCandidate} />
          </Grid>
          <Grid item>
            {candidates.map((candidate) => (
              <CandidateForm candidate={candidate} onDelete={handleDeleteCandidate} key={candidate.id} />
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Button variant={"contained"} onClick={() => setSpin(!spin)}>
            {spin ? "Reset" : "Start" }
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
