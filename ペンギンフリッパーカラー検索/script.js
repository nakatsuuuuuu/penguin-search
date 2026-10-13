const colorSelect = document.getElementById("colorSelect");
const searchButton = document.getElementById("searchButton");
const resultArea = document.getElementById("result");
const nameInput = document.getElementById("nameInput")
const facilitySelect = document.getElementById("facilitySelect");
const typeSelect = document.getElementById("typeSelect")

//penguinsからfacilityだけを取り出して、重複をなくす
const facilityNmaes = [...new Set(penguins.map(p=>p.facility))];

facilityNmaes.forEach(function(facility){
    const option = document.createElement("option");
    option.value = facility;
    option.textContent = facility;
    facilitySelect.appendChild(option);
});

bandColorList.forEach(function(bandColor){
    const option = document.createElement("option");
    option.value = bandColor;
    option.textContent = bandColor;
    colorSelect.appendChild(option);
});

const typeNames = [...new Set(penguins.map(p=>p.type))]
typeNames.forEach(function(type){
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
});

function calcAge(birthday){
    if (!birthday) return null;
    
    const m = birthday.match(/(\d+)年(\d+)月(\d+)日/);
    if(!m)return null;

    const year = Number(m[1])
    const month = Number(m[2])
    const day = Number(m[3])

    const today = new Date();
    let age = today.getFullYear() - year;
    const hadBirthday = 
        (today.getMonth() + 1 > month) ||
        (today.getMonth() + 1 === month && today.getDate() >= day);
    if (!hadBirthday) age--;

    return age < 0 ? null : age ;
}

function createCardHtml(p){
    const age = calcAge(p.birthday);
    const ageText = age === null ? "不明" : `${age}歳`;

    return `<div class = "penguin-card">
            <img class = "penguin-photo" src="${p.photo}" alt="no image" width="150"><br>
            <h2>${p.name}　${p.gender}</h2>
            <p>施設：${p.facility}</p>
            <p>種類：${p.type}</p>
            <p>識別色：${p.bandColor.join("、")}</p>
            <p>生年月日：${p.birthday}　年齢：${ageText}</p>
            <p>性格：${p.personality} </p>
    </div>`;
}

searchButton.addEventListener("click",function(){

    const inputColor = colorSelect.value;
    const selectedFacility = facilitySelect.value;
    const inputName = nameInput.value;
    const selectedType = typeSelect.value;

    const results = penguins.filter(function(p){
        const colorMatch = inputColor === "all" || p.bandColor.includes(inputColor);
        const facilityMatch = selectedFacility === "all" || p.facility === selectedFacility;
        const nameMatch = inputName ==="" || p.name === inputName
        const typeMatch = selectedType === "all" || p.type === selectedType;
        return colorMatch && facilityMatch && nameMatch && typeMatch;
    });

    let html = "";
    if(results.length===0){
        html = `<div class = "errorMessage"><h2>見つかりませんでした</h2></div>`;
    }else{
        results.forEach(function (p){
            html += createCardHtml(p);
        });
    }

    resultArea.innerHTML = html;
});

const randomButton = document.getElementById("randomButton");

randomButton.addEventListener("click",function(){
    const min = 1;
    const max = penguins.length;
    const num = Math.floor(Math.random()*(max-min+1))+min;

    const randomPenguin = penguins.find(function(p){
        return p.id === num;
    });

    resultArea.innerHTML = createCardHtml(randomPenguin)
})

const resetButton = document.getElementById("resetButton")

resetButton.addEventListener("click",function(){
    colorSelect.value = "all";
    facilitySelect.value = "all";
    nameInput.value = "";
    typeSelect.value = "all";
    resultArea.innerHTML = "";
})