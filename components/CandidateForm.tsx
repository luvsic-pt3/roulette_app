import { Candidate } from "../types"
import DeleteIcon from "@mui/icons-material/Delete"
import {Grid, Typography} from "@mui/material";

interface CandidateFormProps {
  candidate: Candidate
  onDelete: (id: number) => void
}

export function CandidateForm({candidate, onDelete}: CandidateFormProps) {
return (
  <>
    <Grid container spacing={2}>
      <Grid item>
        <Typography>{candidate.name}</Typography>
      </Grid>
      <Grid item>
        <DeleteIcon onClick={() => onDelete(candidate.id)}/>
      </Grid>
    </Grid>
  </>
)
}
