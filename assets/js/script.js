window.onload = function () {
const updateButton = document.querySelector('.update');
const output = Array.from(document.querySelectorAll('.days ul'));
const outputLi = Array.from(document.querySelectorAll('.days ul li'))
const url = 'https://raw.githubusercontent.com/saniketprdxn/JsonData/master/Users.json';
const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const Display = document.querySelector('textarea');
let UsersData;
var lastPick;
var rand;
outputLi.forEach((element) => {
	element.setAttribute('background',randomColor());
})

function randomColor() {
  var back = ["green","blue","gray","yellow","orange","purple","pink"];
  rand = back[Math.floor(Math.random() * back.length)];
  rand == lastPick ? randomColor():rand;
  lastPick = rand;
  return rand;
}

function getData() {
	// Fetching data 
	fetch(url)
	.then(function (response) {
		return response.json();
		})
		.then(function (data) {   
			UsersData = data;
			manipulateData(data);
		})
		.catch(function (error) {
			console.log("Something went wrong!", error);
	});  
}
getData();

function manipulateData(data,yearInput) {
	console.log(data);
	if(yearInput === undefined) {
		Display.innerHTML = JSON.stringify(data,null,1);
	} else {
		for (const [index, obj] of Object.entries(data)) {
			let name = obj.fullName;
			let birthDate = obj.Birthdate;
			let currentDate = yearInput + birthDate.slice(4);
			let nameArray = name.split(' ');
			let initials = nameArray[0].charAt(0) + nameArray[1].charAt(0);
			let birthDay = new Date(birthDate).getDay();
			let currentDay = new Date(currentDate).getDay();
			console.log(birthDay);
			console.log(currentDay);
			output.forEach((element) => {
				if(element.className === weekdays[currentDay]) {
					element.innerHTML += initials+" ";
				}
			});
		}	
	}
}

updateButton.addEventListener('click', (e) => {
	e.preventDefault();
	const yearInput = document.querySelector('.year').value;
	const validYear = /^[0-9]{4}$/;
	// Validation of year
	if (!validYear.test(yearInput)) {
		alert('Invalid input');
	}
	else {
		manipulateData(UsersData,yearInput);
	}
});
}