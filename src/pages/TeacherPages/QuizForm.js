import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState } from 'react';
import QuestionForm from '../../components/Quiz/QuestionForm';
import { base_url } from '../../Const/Const';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const initialInputs = {
  title: "",
  description: "",
  duration: "",
};

const QuizForm = () => {
  const navigate = useNavigate();
  const {subjectid} = useParams();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);
  
  const [inputs, setInputs] = useState(initialInputs);
  const [questions, setQuestions] = useState([]);

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.id]: event.target.value });
  };

  const handleQuestionInputChange = (id, event) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          return {
            ...q,
            [event.target.id]: event.target.value,
          };
        }
        return q;
      })
    );
  };

  const handleQuestionAdd = () => {
    const id = `${Date.now()}-${Math.random()}`;
    setQuestions([...questions, { id }]);
  };

  const handleQuestionRemove = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var qq = null
    const data = {
      ...inputs,
      questions,
    };
    if(!error)
    data.questions.map((q) => {
      q.option_1 = {optId : 1, answer: q.option_1};
      q.option_2 = {optId : 2, answer: q.option_2};
      q.option_3 = {optId : 3, answer: q.option_3};
      q.option_4 = {optId : 4, answer: q.option_4};
      return q;
    });
    setIsLoading(true);
    
    fetch(base_url+'/subjects/' + subjectid + '/quiz', {
      method: 'POST',
      headers: {"Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem('token')
      },
      body:JSON.stringify(data)
    }).then(res=>{
      setIsLoading(true);
      return res.json();
    })
    .then(data=>{
        setIsLoading(false);
        if(!data['success']){
            setError(data['error']);
        }else{
            navigate(-1);
        }
    })
    .catch(err => {
        if(err.name === "AbortError"){
            console.log('Fetch aborted');
        }else{
            setIsLoading(false);
            setError(err.message);
        }
    })
  };

    return ( 
        <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 1,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
                required
                value={inputs.title}
                size='small'
                autoComplete="title"
                name="title"
                fullWidth
                id="title"
                label="Quiz Title"
                autoFocus
                margin="dense"
                onChange={handleInputChange}
            />
            <TextField
                value={inputs.description}
                size='small'
                autoComplete="description"
                name="description"
                fullWidth
                id="description"
                label="Description"
                autoFocus
                margin="dense"
                multiline={true}
                onChange={handleInputChange}
            />
            <TextField
                required
                value={inputs.duration}
                size='small'
                autoComplete="duration"
                name="duration"
                fullWidth
                id="duration"
                label="Duration"
                type={'number'}
                autoFocus
                margin="dense"
                onChange={handleInputChange}
            />
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <p>
                        Total Questions: {questions.length}
                    </p>
                </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Button
                    color="primary"
                    onClick={
                      handleQuestionAdd
                    }
                    >
                        Add new question
                    </Button>
                </Grid>
            </Grid>
            {questions &&
              questions.map((q) => (
                <QuestionForm
                  key={q.id}
                  question={q}
                  onChange={handleQuestionInputChange}
                  onRemove={handleQuestionRemove}
                />
              ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 ,backgroundColor:"#3F51B5"}}
              // disabled={isLoading}
            >
              Create Quiz
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              >
              <Typography color='red'>{error}</Typography>
            </Box>
          </form>
        </Box>       
    </Container>
    );
}
 
export default QuizForm;