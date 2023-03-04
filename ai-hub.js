const loadAllData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    showData(data.data.tools.slice(0, 6));
  };
  
  const showAllData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    showData(data.data.tools);
  };
  const showData=(features)=>{
    const containerCard = document.getElementById('container-card');
    // console.log(data);
    features. forEach(feature => {
        // element.slice(0,6);
        // console.log(feature.id);
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML=`
        <div class="card h-100 container shadow-lg rounded pt-2">
            <img src="${feature.image}" class="card-img-top  rounded" alt="...">
             <div class="card-body">
                <h4 class="card-title my-3">Features</h4>
                <ol>
                    <li>${feature.features[0]}</li>
                    <li>${feature.features[1]}</li> 
                    <li>${feature.features[2] ? feature.features[2] : 'No Feature'}</li>
                   
                </ol>
                <hr>
                 <div class="d-flex justify-content-between align-items-center">
                    <div >
                        <h5 class="card-title">${feature.name}</h5>
                        <p class="card-text"><i class="fa-sharp fa-solid fa-calendar-days"></i> ${feature.published_in ? feature.published_in:'No Date Found'}</p>
                    </div>
                    <i onClick="getDetailsData('${feature.id}')" class="fa-solid fa-arrow-right ms-auto text-danger bg-secondary p-2 rounded-circle" data-bs-toggle="modal" data-bs-target="#aiModal"></i>
                    
                    
                <div/>
                
            </div>
        </div>
        `
        containerCard.appendChild(cardDiv);
    });
  };
  const getDetailsData = (id) => {
    //   console.log("called", id);
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(URL)
      .then((res) => res.json())
      .then((data) => displaySingleData(data.data));
    //   console.log(URL);

  };
  const displaySingleData=(data)=>{
    console.log(data);
    const singleDataContainer= document.getElementById('singleDataContainer');
    singleDataContainer.innerHTML='';
    const modalInfo= document.createElement('div');
    modalInfo.innerHTML=`
    <!-- Modal Body Start  -->
    <div class="col ">
              <div class="card ">
                <div class="card-body bg-secondary">
                  <h5 class="card-title text-white ">${data.description}</h5>
                  <div class=" pricing-section d-flex justify-content-between align-items-center row row-cols-1 row-cols-md-3 row-cols-lg-3 ">
                      <div class="bg-light p-2  rounded text-success">
                          <p>${data.pricing[0].price}<br>${data.pricing[0].plan}</p>
                      </div>
                      <div class="bg-light p-2  rounded text-danger">
                      <p>${data.pricing[1].price}<br>${data.pricing[1].plan}</p>
                      </div>
                      <div class="bg-light p-2  rounded text-primary">
                          <p>${data.pricing[2].price}<br>${data.pricing[2].plan}</p>
                      </div>
                  </div>
                 <div class="d-flex ">
                 <div class="Feature-Section text-white justify-content-between flex-sm-cols ">
                 <h5 class="text-center">Feature</h5>
                 <ul class="text-white">
                     <li>${data.features[1].feature_name}</li>
                     <li>${data.features[2].feature_name}</li>
                     <li>${data.features[3].feature_name}</li>
                 </ul>
               </div>
               <div class="integration text-white">
                 <h5 class="text-center">Integration</h5>
                 <ul class="text-white">
                     <li>${data.integrations[0]}</li>
                     <li>${data.integrations[1]}</li>
                     <li>${data.integrations[2]}</li>
                 </ul>
               </div>
                 </div>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <img src="${data.image_link[0]}" class="card-img-top" alt="...">
                <p class="card-img-top-right"></p>
                <div class="card-body">
                  <h5 class="card-title">${data.input_output_examples[0].input}</h5>
                  <p class="card-text">${data.input_output_examples[0].output}</p>
                </div>
              </div>
            </div>

    <!-- Modal Body End  -->
    `;
    singleDataContainer.appendChild(modalInfo);
    
  };

  loadAllData();