'use strict'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let whoThrow = 0;
let number = 0;
const vertixes = [];
const end = [
[65,64,63,62],
[54,55,56,57]
]

const start = [30, 10];
const color = ["green", "yellow"]
const varians1 = [];
const varians2 = [];
const varians3 = [];
const varians1Child = [];
let fishes =[
	[150, 150, 0, 1, 0, 0, [150, 150]], // x, y, num, player, canMove,  last
	[150, 250, 0, 1, 0, 0, [150, 250]],
	[250, 250, 0, 1, 0, 0, [250, 250]], 
	[250, 150, 0, 1, 0, 0, [250, 150]], 
	[450, 450, 0, 0, 0, 0, [450, 450]], 
	[450, 550, 0, 0, 0, 0, [450, 550]], 
	[550, 550, 0, 0, 0, 0, [550, 550]], 
	[550, 450, 0, 0, 0, 0, [550, 450]], 
]


class Vertix {
	constructor(x, y, num, color){
		this.x = x;
		this.y = y;
		this.num = num;
		this.color = color;
		this.fish = -1
	}
}




function CLICK(e) {
  const pageX = e.pageX;
  const pageY = e.pageY;
  checkCordinate(pageX, pageY);
  window.removeEventListener('click', CLICK, false);
}

const WhereClick = () => {
  canvas.addEventListener('click', CLICK, false);
  return 0;
};

WhereClick()

const checkCordinate =(y, x) =>{
	for(let i = 0; i < fishes.length; i++){
		if(Math.abs(x-fishes[i][0])<25 && Math.abs(y-fishes[i][1])<25){
			if(fishes[i][3] == 1){
			 moveFish(i);
			}
			else return 0;
		}
	}
	return 0;
}

const drawCircle = (i, j, number, color) => {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(j, i, 25, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(j, i, 22, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.font = "italic 15pt Arial";
  ctx.fillText(number, j-10, i+7);
  ctx.closePath();
};

const drawFish = (i, j, color, boll ) => {
	if((boll >=10 || boll == -1) && color == 'yellow'){
	  ctx.beginPath();
	  ctx.fillStyle = 'red';
	  ctx.arc(j, i, 16, 0, Math.PI * 2, false);
	  ctx.fill();
	  ctx.closePath();
	}
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(j, i, 15, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(j, i, 10, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
};


const insertField = () =>{
	let t = 0; 
	let k = 10;
	for(let i = 1; i <= 11; i++){
		if(t<5){
			vertixes.push(new Vertix(i*60, 60, 45+t, 'white'))
			vertixes.push(new Vertix(i*60, 660, 35-t, 'white'))
		}
		else{
			vertixes.push(new Vertix(i*60, 60, 5+t, 'white'))
			vertixes.push(new Vertix(i*60, 660, 35-t, 'white'))

		}
		t++;	

	}
	for(let i = 2; i <= 10; i++){
		vertixes.push(new Vertix(60, i*60, 55-t, 'white'))
		vertixes.push(new Vertix(660, i*60, 5+t, 'white'))
		t++;
	}
	let  m = 50;
	for(let i = 0; i < 8; i++){
		if(i <4){
			vertixes.push(new Vertix(120+i*65, 360,m, 'blue'));
			vertixes.push(new Vertix(360, 125+i*67, m+4,'yellow'));
		}
		else{
			vertixes.push(new Vertix(140+i*65, 360, m+4,'red'));
			vertixes.push(new Vertix(360, 125+i*67, m+8,'green'));
		}
		m++;
	}
}

const colorVertix = () => {
	for(let i = 0 ; i < vertixes.length; i++){
		if(vertixes[i].num == 10) vertixes[i].color = 'yellow';
		if(vertixes[i].num == 20) vertixes[i].color = 'red';
		if(vertixes[i].num == 30) vertixes[i].color = 'green';
		if(vertixes[i].num == 40) vertixes[i].color = 'blue';
		
	}
}

insertField();
colorVertix();

const drawField = () =>{
	for(let i = 0; i < vertixes.length; i++){
		drawCircle(vertixes[i].y, vertixes[i].x, vertixes[i].num, vertixes[i].color)

	}
}

const drawFishes = () =>{
	for(let i = 0; i < fishes.length; i++){
		drawFish(fishes[i][0], fishes[i][1], color[fishes[i][3]], fishes[i][4])
	}
}

drawField();
drawFishes();

const draw = () =>{
	ctx.clearRect(0, 0, 700, 700);
	drawField();
	drawFishes();
}

const spliseFishes = () => {
	for(let i = fishes.length-1; i >=0; i--){
		fishes.splice(i, 1);
	}
}

const box = (who) =>{
	if(whoThrow!= who || number==6){
		whoThrow = who;
		let rand = Math.floor(1 + Math.random() * (6 + 1 - 1));
		//if(rand == 7) rand --;
	 	document.getElementById("number").innerHTML = rand;
	 	number = rand;
	 	if(who == 1){
		 	let ar = [];
		 	ar = checkMove(1, fishes, number);
		 	for(let i = 0; i < ar.length; i++){
		 		fishes[i] =ar[i];
	 		}
	 		let k = 0; 
	 		for(let i = 0; i < fishes.length; i++){
	 			if(fishes[i][4] >= 10 || fishes[i][4] == -1) k++;
	 		}
	 		if(k == 0) setTimeout(() => box(0), 1000);
	 	}	
	 	else computerMove();
	 	draw();
	 }
	 
}

const newNum = (fise, num) =>{
	let newNumber = fise[2] + num;
	if(fise[2]<50){
		if(newNumber >= 50){
			newNumber = newNumber - 40; 
		}
		if(fise[2] == 0 && num == 6) return start[fise[3]];
		if(fise[2]!=0){
			if(fise[3] == 1){
				if(fise[5]!=0 && (fise[2]>=45 || fise[2] == 10) && newNumber > 10 && newNumber <= 16){
					let n = newNumber - 10; 
					if(n == 5) return -1; //delete
					else{
						if(n < 5) return end[fise[3]][n-1];
						else return 0; //nothing
					}
				}else{
				 return newNumber}
			}else{
				if(fise[5]!= 0 && fise[2] < start[fise[3]] && newNumber > start[fise[3]]){
					let n = newNumber - 30;
					if(n == 5) return -1; //delete
					else{
						if(n < 5) return end[fise[3]][n-1];
						else return 0; //nothing
					}
				}
				else return newNumber;
			}
		}	
	}else{
		if(fise[3]){
			if(newNumber - end[fise[3]][3] == 1) return -1;
			if(newNumber <= end[fise[3]][3]) return newNumber
			else return 0;	
		}
		else{
			newNumber = newNumber - num - num;
			if(-newNumber + end[fise[3]][3] == 1) return -1;
			if(newNumber >= end[fise[3]][3]) return newNumber
			else return 0;	
		}
	}	
}

const checkVertixe = (ver, fis) =>{
	for(let i = 0; i < fis.length; i++){
		if(fis[i][2] == ver){
			//console.log(ver, i ,  fis[i])
		 return i;
		}
	}
	return -1;
}

const checkMove = (who, fis1, num) =>{
	//console.log(custFunc(fis1, who));
	let fis = [];
	for(let i = 0; i < fis1.length; i++){
		fis.push([]);
		for(let j = 0; j < fis1[i].length; j++){
			fis[i][j] = fis1[i][j];
		}
	}
	for(let i = 0; i < fis.length; i++){
		if(fis[i][3] == who){
			let newNum1 = newNum(fis[i], num);
			if(newNum1>=10 || newNum1==-1){
				let h = checkVertixe(newNum1, fis)
				if(h == -1 || fis1[h][3]!=who){
				 fis[i][4] = newNum1;
				}
			}
		}
	}
	return fis;
}

const searchCoordinate = (ver)=>{
	for(let i = 0; i < vertixes.length; i++){
		if(vertixes[i].num == ver){
		 return[vertixes[i].y, vertixes[i].x]}
	}
return -1;
}

const removeMove = (fish) =>{
	for(let i = 0; i < fish.length; i++){
		fish[i][4] = 0;
	}
}

const searshFish = (fish, num) =>{
	for(let i = 0; i < fish.length; i++){
		if(fish[i][2] == num) return i;
	}
	return -1;
}

const moveFish = (i) =>{
	if(fishes[i][4] >= 10){
		let t = checkVertixe(fishes[i][4], fishes);
		if(t!=-1){
			//let m = searshFish(fishes, t);
			console.log(t, fishes);
			fishes[t][5] = fishes[t][2];
			fishes[t][0] = fishes[t][6][0];
			fishes[t][1] = fishes[t][6][1];
			fishes[t][2] = 0;
		}
		let ar = [];
		ar = searchCoordinate(fishes[i][4]);
		fishes[i][5] = fishes[i][2];
		fishes[i][0] = ar[0];
		fishes[i][1] = ar[1];
		fishes[i][2] = fishes[i][4];
		removeMove(fishes);
	}
	if(fishes[i][4] == -1) fishes.splice(i, 1);
	draw();
	if(number!=6){
		setTimeout(() => box(0), 1000);
	}
}

const variantsLevel1 = (fish) =>{
	
	for(let i = 0; i < fish.length; i++){
		if(fish[i][4] >=10 || fish[i][4] == -1){
			let fish1 = [];
			for(let j = 0; j < fish.length; j++){
				fish1.push([]);
				for(let k = 0; k < fish[j].length; k++){
					fish1[j][k] = fish[j][k];
				}
			}

			 if(fish[i][4]>=10){
			 	let t = checkVertixe(fish1[i][4], fish1);
			 	//console.log(t, fish)
				if(t!=-1){
					//let m = searshFish(fish, t);
					//console.log(t, fish1);
					fish1[t][5] = fish1[t][2];
					fish1[t][0] = fish1[t][6][0];
					fish1[t][1] = fish1[t][6][1];
					fish1[t][2] = 0;
				}
				let ar = [];
			 	ar = searchCoordinate(fish1[i][4]);
			 	fish1[i][5] = fish1[i][2];
			 	fish1[i][0] = ar[0];
			 	fish1[i][1] = ar[1];
			 	fish1[i][2] = fish1[i][4];
			 	removeMove(fish1);
			 }
			 if(fish1[i][4] == -1) fish1.splice(i, 1);
			 varians1.push(fish1);

		}
	}

}

const variantsLevel2 = (who) =>{
	console.log(varians1)
	for(let b = 0; b < varians1.length; b++){
		varians2.push([]);
		console.log("hey", varians1.length)
		for(let n = 1; n <=6; n++){
			varians2[b].push([])
			let fish = [];
			fish = checkMove(who, varians1[b], n);
			//console.log(varians1[b], varians1.length)
			for(let i = 0; i < fish.length; i++){
				if(fish[i][4] >=10 || fish[i][4] == -1){
					let fish1 = [];
					for(let j = 0; j < fish.length; j++){
						fish1.push([]);
						for(let k = 0; k < fish[j].length; k++){
							fish1[j][k] = fish[j][k];
						}
					}

					 if(fish[i][4]>=10){
					 	let t = checkVertixe(fish1[i][4], fish1);
					 	//console.log(t, fish)
						if(t!=-1){
							//let m = searshFish(fish, t);
							//console.log(t, fish1);
							fish1[t][5] = fish1[t][2];
							fish1[t][0] = fish1[t][6][0];
							fish1[t][1] = fish1[t][6][1];
							fish1[t][2] = 0;
						}
						let ar = [];
					 	ar = searchCoordinate(fish1[i][4]);
					 	fish1[i][5] = fish1[i][2];
					 	fish1[i][0] = ar[0];
					 	fish1[i][1] = ar[1];
					 	fish1[i][2] = fish1[i][4];
					 	removeMove(fish1);
					 }
					 if(fish1[i][4] == -1) fish1.splice(i, 1);
					 varians2[b][n-1].push(fish1);	
					}

			}
		}	
	}
	console.log(varians2);
}

const computerMove = () =>{
	let fish = [];
	fish = checkMove(0, fishes, number);
	variantsLevel1(fish);
	if(number==6){
		console.log("NOT HERE")
		variantsLevel2(0);
		let array = [];
		for(let i = 0; i < varians1.length; i++){
			array.push([]);
			for(let j = 0; j < 6;j++){
				array[i].push([]);
				for(let k = 0; k < varians2[i][j].length;k++){
					array[i][j].push(custFunc(varians2[i][j][k], 0))
				}
			}
		}
		console.log(array);
		let array2 = [];
		for(let i = 0; i < varians1.length; i++){
			 array2.push([]);
			for(let j = 0; j < 6;j++){
				array2[i].push([]);
				let g = 0;
					for(let k = 0; k < array[i][j].length;k++){
						if(array[i][j][k]>g){
							g = array[i][j][k];
						}
					}
					array2[i][j].push(g);	
				}
			}
		
		console.log(array2)	
		let array3 = [];
		for(let i = 0; i < varians1.length; i++){
			array3.push([]);
			console.log(array2[i]);
			let k = 0;
			 for(let j = 0; j < array2[i].length; j++){
				k = k + array2[i][j]/6;
			 }
			 array3[i] = k;
		}
		console.log(array3);
		let p = -1;
		let x 
		for(let i = 0; i < varians1.length; i++){
			if(array3[i]>p){
				p = array3[i];
				x = i;
			}
		}
		for(let w = fishes.length-1; w>=0; w--){
			fishes.splice(w,1);
		}
		//console.log(varians1,x);
		for(let i = 0; i <  varians1[x].length; i++){

				fishes[i] = varians1[x][i];

		}
		draw();

	}
	else{
		variantsLevel2(1);
		console.log(varians2)
		let array = [];
		let arr = [];
		for(let i = 0; i < varians1.length; i++){
			array.push([]);
			arr.push([]);
			for(let j = 0; j < 6;j++){
				array[i].push([]);
				arr[i].push([]);
				for(let k = 0; k < varians2[i][j].length;k++){
					array[i][j].push(custFunc(varians2[i][j][k], 1))
					arr[i][j].push(custFunc(varians2[i][j][k], 0))
					
				}
			}
		}
		console.log(array);
		let array2 = [];
		let arr2 = [];
		for(let i = 0; i < varians1.length; i++){
			 array2.push([]);
			 arr2.push([])
			for(let j = 0; j < 6;j++){
				array2[i].push([]);
				arr2[i].push([])
				let g = 0;
				let q =0;
					for(let k = 0; k < array[i][j].length;k++){
						if(array[i][j][k]>g){
							g = array[i][j][k];
						}
						if(arr[i][j][k]>q){
							q = arr[i][j][k];
						}
					}
					array2[i][j].push(g);
					arr2[i][j].push(q);	
				}
			}
		
		console.log(array2)	
		let array3 = [];
		for(let i = 0; i < varians1.length; i++){
			array3.push([]);
			console.log(array2[i]);
			let k = 0;
			 for(let j = 0; j < array2[i].length; j++){
			 	let f = arr2[i][j];
			 		let r = f[1];

			 	if(array2[i][j].length!=0){
			 		
				k = k + (f)/6;}
				console.log(array2[i][j], f, k + (array2[i][j][1])/6);
			 }
			 array3[i].push(k);
		}
		 console.log(array3);
		let p = -1;
		let x 
		for(let i = 0; i < varians1.length; i++){
			if(array3[i]>p){
				p = array3[i];
				x = i;
			}
		}
		if(varians1.length!=0){
		for(let w = fishes.length-1; w>=0; w--){
			fishes.splice(w,1);
		}
		console.log(varians1,x);
		
		for(let i = 0; i < varians1[x].length; i++){
				fishes[i] = varians1[x][i];
		}
		}
		draw();
	}
	setTimeout(() => deleteH(), 1000);
	if(number == 6){
		setTimeout(() => box(0), 1000);
	}
}

const deleteH = () =>{
	for(let i = varians1.length-1; i>=0;i--){
		varians1.splice(i,1);

	}
	for(let i = varians2.length-1; i>=0;i--){
		varians2.splice(i,1);
		
	}
}

const custFunc = (fish, who) =>{
	let suma = 0;
	let k = 0;
	let elem = 0;
	for(let i = 0; i < fish.length;i++){
		if(fish[i][3] == who){
			k++;
			if(fish[i][2]>=50){
				for(let j = 0; j < end[fish[i][3]].length; j++){
					if(fish[i][2] == end[fish[i][3]][j]){
						elem = elem + 50+j*5+5;
					}
				}
			}else{
				if(fish[i][2]!=0 && fish[i][5]!=0){

					let sup = fish[i][2] - start[fish[i][3]] ;
					if(sup>0) elem = elem+sup + 10;
					else{
						elem=elem + 40 + sup + 10;
					} 
				}
				if(fish[i][5]==0 && fish[i][2]!=0) elem = elem + 10;
			}
			
		}

	}

		elem = elem + (4-k)*100;
		k = 0;
		suma = suma + elem;	
	return suma;
}
