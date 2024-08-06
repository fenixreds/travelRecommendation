function searchDestination() {
    const input = document.getElementById('inputDestination').value.toLowerCase();
    
    const resultDiv = document.getElementById('result-search');    
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {

        const pattern=new RegExp(input, 'i')

        for (let key in data) {
             if(pattern.test(key)){
              var searchInput=key;
             }       
        }

        if(input&&searchInput){
          
          if(searchInput=='countries')
          {
            const countriesDestin=data[searchInput]
            for(countrie in countriesDestin){
              
              // resultDiv.innerHTML += `<h2 class="title-search">${countriesDestin[countrie].name}</h2>`;
              for(citie in countriesDestin[countrie].cities){
                
                resultDiv.innerHTML += `<img class="img-search" src="${countriesDestin[countrie].cities[citie].imageUrl}" alt="hjh">`;
                resultDiv.innerHTML += `<h2 class="title-search">${countriesDestin[countrie].cities[citie].name}</h2>`;
                resultDiv.innerHTML += `<h2 class="text-search">${countriesDestin[countrie].cities[citie].description}</h2>`;
   
              }
              
            }

          }
          else{
            const destination=data[searchInput];
            for(place in destination){
              
              resultDiv.innerHTML += `<img class="img-search" src="${destination[place].imageUrl}" alt="hjh">`;
              resultDiv.innerHTML += `<h2 class="title-search">${destination[place].name}</h2>`;
              resultDiv.innerHTML += `<h2 class="text-search">${destination[place].description}</h2>`;

            }

          }
          
        }
        else{
          resultDiv.innerHTML = 'Destination not found.';
        }
        
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
    btnSearch.addEventListener('click', searchDestination);