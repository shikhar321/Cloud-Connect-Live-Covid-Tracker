(function () {
    var searchBtn = document.getElementById("search-btn");


    var today = new Date();
    var yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    today = dd + '-' + mm + '-' + yyyy;

    console.log(today);

    var pinCode;

    searchBtn.addEventListener("click", function (event) {
        var inputField = document.getElementById("input-field-pinCode");
        var displayArea = document.getElementById("area-for-vaccination-center-detail");

        event.stopPropagation();
        pinCode = parseInt(inputField.value);

        var xhrRequest = new XMLHttpRequest();
        xhrRequest.open("get", `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${today}
        `, true);
        xhrRequest.send();
        xhrRequest.onload = function () {
            var responseJSON = JSON.parse(xhrRequest.response);
            var vacCenters = responseJSON.sessions;
            displayArea.innerHTML = ``;
            console.log(vacCenters);
            if (!vacCenters) {
                displayArea.innerHTML = `<h1>Wrong Pincode.</h1>`
            }
            if (vacCenters.length == 0) {
                displayArea.innerHTML = `<h1>No Vaccine Center Available.</h1>`
            }

            for (let i = 0; i < vacCenters.length; i += 1) {
                displayArea.innerHTML += `
                <div class="vac-center-cards">
                    <div class="center-name">
                        ${vacCenters[i].name}
                    </div>
                    <div class="center-details">
                        <div>
                            <span class="key">
                                Center ID: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].center_id}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Center Address: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].address}
                            </span>
                        </div>
                        
                        <div>
                            <span class="key">
                                Block Name: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].block_name}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Vaccination Name: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].vaccine} 
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Availabilty Time: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].from} to ${vacCenters[i].to}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Fee Type: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].fee_type}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Doze 1 Availabilty: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].available_capacity_dose1}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Doze 2 Availabilty: 
                            </span>
                            <span class="value">
                                ${vacCenters[i].available_capacity_dose2}
                            </span>
                        </div>
                        <div>
                            <span class="key">
                                Age:  
                            </span>
                            <span class="value">
                                ${vacCenters[i].min_age_limit} to ${vacCenters[i].max_age_limit}
                            </span>
                        </div>
                    </div>
                </div>

                `
            }
        }



    });


})();  