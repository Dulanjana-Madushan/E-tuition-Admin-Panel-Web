import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { initOnLoad } from 'apexcharts';

const QuestionForm = ({question, onChange, onRemove}) => {

    // const [question, setQuestion] = useState({question});

    return ( 
        <Container>
            <Box
                variant= 'body2'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                bgcolor:"#c6cbec",
                padding:2,
                marginTop:1,
                borderRadius: '10px!important',
                
            }}
            >
                {/* <Grid container justifyContent="flex-end">
                <Grid item>
                    <p>
                        {id +1}/{total}
                    </p>
                </Grid>
            </Grid> */}
                <TextField
                    required
                    size='small' 
                    autoComplete="question"
                    name="question"
                    fullWidth
                    id="question"
                    label="Question"
                    autoFocus
                    margin="dense"
                    multiline={true}
                    value={question.question}
                    onChange={event => onChange(question.id, event)}
                />
                <TextField
                    required
                    size='small'
                    fullWidth
                    id="option_1"
                    label="Option 1"
                    name="option1"
                    autoComplete="option_1"
                    margin="dense"
                    multiline={true}
                    value={question.option_1}
                    onChange={event => onChange(question.id, event)}
                />
                <TextField
                    required
                    size='small'
                    fullWidth
                    id="option_2"
                    label="Option 2"
                    name="option2"
                    autoComplete="option_2"
                    margin="dense"
                    multiline={true}
                    value={question.option_2}
                    onChange={event => onChange(question.id, event)}
                />
                <TextField
                    required
                    size='small'
                    fullWidth
                    id="option_3"
                    label="Option 3"
                    name="option3"
                    autoComplete="option_3"
                    margin="dense"
                    multiline={true}
                    value={question.option_3}
                    onChange={event => onChange(question.id, event)}
                />
                <TextField
                    required
                    size='small'
                    fullWidth
                    id="option_4"
                    label="Option 4"
                    name="option4"
                    autoComplete="option_4"
                    margin="dense"
                    multiline={true}
                    value={question.option_4}
                    onChange={event => onChange(question.id, event)}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'space-between',
                    }}>
                
                    <TextField
                        required
                        size='small'
                        fullWidth
                        id="correctAnswer"
                        label="Correct Answer"
                        name="correctAnswer"
                        autoComplete="correctAnswer"
                        margin="dense"
                        type={'number'}
                        value={question.correctAnswer}
                        onChange={event => onChange(question.id, event)}
                        
                    />
                    <TextField
                        required
                        size='small'
                        fullWidth
                        id="mark"
                        label="Marks"
                        name="marks"
                        autoComplete="mark"
                        margin="dense"
                        type={'number'}
                        value={question.mark}
                        onChange={event => onChange(question.id, event)}
                        sx={{ml:1}}
                    />                
                </Box>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <IconButton 
                            aria-label="delete" 
                            color='error' 
                            onClick={() => {
                            onRemove(question.id);
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>               
            </Box>           
        </Container>
     );
}
 
export default QuestionForm;