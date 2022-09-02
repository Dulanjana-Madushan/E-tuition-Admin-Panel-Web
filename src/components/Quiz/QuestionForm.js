import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { initOnLoad } from 'apexcharts';

const QuestionForm = ({question, setQuestion, id, deleteQuestion, total}) => {

    // const [question, setQuestion] = useState({question});

    return ( 
        <Container key = {id}>
            <Box
                variant= 'body2'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                bgcolor:'#E1EDE0',
                padding:1,
                marginTop:1,
                borderRadius: '10px!important',
                
            }}
            >
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <p>
                        {id +1}/{total}
                    </p>
                </Grid>
            </Grid>
                <TextField
                    size='small' 
                    autoComplete="question"
                    name="question"
                    // required
                    fullWidth
                    id="question"
                    label="Question"
                    autoFocus
                    margin="dense"
                    multiline={true}
                    onChange={e => setQuestion({question: e.target.value})}
                />
                <TextField
                    // value={question.option_1}
                    size='small'
                    // required
                    fullWidth
                    id="option1"
                    label="Option 1"
                    name="option1"
                    autoComplete="option1"
                    margin="dense"
                    multiline={true}
                    onChange={e => setQuestion({option_1: e.target.value})}
                />
                <TextField
                    // value={question.option_2}
                    size='small'
                    // required
                    fullWidth
                    id="option2"
                    label="Option 2"
                    name="option2"
                    autoComplete="option2"
                    margin="dense"
                    multiline={true}
                    onChange={e => setQuestion({...question, option_2: e.target.value})}
                />
                <TextField
                // value={question.option_3}
                size='small'
                    // required
                    fullWidth
                    id="option3"
                    label="Option 3"
                    name="option3"
                    autoComplete="option3"
                    margin="dense"
                    multiline={true}
                    onChange={e => setQuestion({...question, option_3: e.target.value})}
                />
                <TextField
                // value={question.option_4}
                size='small'
                    // required
                    fullWidth
                    id="option4"
                    label="Option 4"
                    name="option4"
                    autoComplete="option4"
                    margin="dense"
                    multiline={true}
                    onChange={e => setQuestion({...question, option_4: e.target.value})}
                />
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'space-between',
                    }}>
                
                    <TextField
                    // value={question.correctAnswer}
                    size='small'
                        // required
                        fullWidth
                        id="correctAnswer"
                        label="Correct Answer"
                        name="correctAnswer"
                        autoComplete="correctAnswer"
                        margin="dense"
                        type={'number'}
                        onChange={e => setQuestion({...question, correctAnswer: e.target.value})}
                    />
                    <TextField
                    // value={question.mark}
                    size='small'
                        // required
                        fullWidth
                        id="marks"
                        label="Marks"
                        name="marks"
                        autoComplete="marks"
                        margin="dense"
                        type={'number'}
                        onChange={e => setQuestion({...question, mark: e.target.value})}
                    />                
                </Box>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <IconButton 
                            aria-label="delete" 
                            color='error' 
                            onClick={() => {
                            deleteQuestion(id);
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