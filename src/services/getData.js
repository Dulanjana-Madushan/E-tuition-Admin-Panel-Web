

const getData = (url) => {
   
        fetch(url, {
            method: 'GET',
            headers: {"Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem('token')}})
            .then(res =>{
                return res.json();
            })
            .then(data => {
                return data;
            })

}

export default getData;