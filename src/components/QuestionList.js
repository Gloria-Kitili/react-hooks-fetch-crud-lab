import React,{useEffect,useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const[questions , setQuestions] = useState([]);
  
  function handleQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
    })
    .then((res) => res.json())
    .then(()=> {
      const updatedQuestions = questions.filter((q)=> q.id !== id);
      setQuestions(updatedQuestions);
    });
  }

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((res) =>res.json())
    .then((questions) => {
      setQuestions(questions)
    });
  }, []);

  function answerChange(id,index){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({index}),
    })
    .then((res) => res.json())
    .then((updatedQuestions) =>{
      const updatedQuestion =questions.map((quiz)=>{
        if(quiz.id === updatedQuestions) return updatedQuestion;
        return quiz;
  
      });
    setQuestions (updatedQuestions);
  });
}
  
  const questionItems = questions.map((question)=>(
    <QuestionItem key={question.id}
    question={question}
    onAnswerChange = {answerChange}
    onDelete = {handleQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
