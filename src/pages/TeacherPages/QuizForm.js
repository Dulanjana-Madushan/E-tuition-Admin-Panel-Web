import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import QuestionForm from '../../components/Quiz/QuestionForm';

const QuizForm = () => {

    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [duration, setDuration] = useState(null);
    
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [numberOfQuestions, setNumberOfQuestions] = useState(0);
    const questionsList = [];
    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState({
      question : null,
      option_1 : null,
      option_2 : null,
      option_3 : null,
      option_4 : null,
      correctAnswer : null,
      mark : null
    });

    const handleAddNewQuestions = (question) => {
      const newQuestions = [
        ...questions,
        question
      ];
      setQuestions(newQuestions);
    }

    const createQuestions = (number) => {
        for (let i = 0; i < number; i++) {
            questions.push(question);
            questionsList.push(<QuestionForm 
              question = {questions[i]}
              setQuestion = {setQuestion}
              id = {i} 
              key = {i}
              deleteQuestion = {deleteQuestion} 
              total = {numberOfQuestions}/>);
        }
        return questionsList;
    }

    const deleteQuestion = (id) => {
      console.log(id);
      questions.splice(id, 1);
      setNumberOfQuestions(numberOfQuestions - 1)
    }


    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(questions);
    };

    return ( 
        <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <Box component="form" validate onSubmit={handleSubmit}>
            <TextField
                value={title}
                size='small'
                autoComplete="title"
                name="title"
                // required
                fullWidth
                id="title"
                label="Quiz Title"
                autoFocus
                margin="dense"
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                value={description}
                size='small'
                autoComplete="description"
                name="description"
                fullWidth
                id="description"
                label="Description"
                autoFocus
                margin="dense"
                multiline={true}
                onChange={e => setDescription(e.target.value)}
            />
            <TextField
                value={duration}
                size='small'
                autoComplete="duration"
                name="duration"
                // required
                fullWidth
                id="duration"
                label="Duration"
                type={'number'}
                autoFocus
                margin="dense"
                onChange={e => setDuration(e.target.value)}
            />
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <p>
                        Total Questions: {numberOfQuestions}
                    </p>
                </Grid>
            </Grid>
            {createQuestions(numberOfQuestions)}
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button
                    color="success"
                    onClick={() => {
                      setNumberOfQuestions(numberOfQuestions + 1)
                    }}
                    >
                        Add new question
                    </Button>
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
              disabled={isLoading}
            >
              Create Quiz
            </Button>
            {error}
          </Box>
        </Box>       
    </Container>
    );
}
 
export default QuizForm;