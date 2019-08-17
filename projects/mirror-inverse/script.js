function calculateMirror(){
	
	var text=document.getElementById("text").value;
	text = cleanString(text);
	text = switchFB(text);
	text = switchUD(text);
	text = switchLRMirror(text);

document.getElementById("output").innerText = text;	
}
function calculateInverse(){
	
	var text=document.getElementById("text").value;
	text = cleanString(text);
	text = switchFB(text);
	text = switchUD(text);
	text = switchLRInverse(text);

text = inverseScramble(text);
document.getElementById("output").innerText = text;	
}
function inverseScramble(text){
	var result = "";
	for(var i = text.length-1; i>= 0; i--){
		if (isAmount(text[i])){
			result += text[i-1] + text[i];
			i--;
		}
		else{
		result += text[i];

		}
	}
	return result
	
}
function cleanString(text){
	text = removeSpaces(text);
	console.log(text);

	text = clearNastyChars(text);
	text = addSpaces(text);
return text;
}
function removeSpaces(text){
	return 	text.replace(/ /g,"");
}
function clearNastyChars(text){
//	text = text.replace("'","'");
	return text;
}
function addSpaces(text){
	var result = "";
	for(var i = 0; i< text.length-1; i++){
		if((isMove(text[i]) && isMove(text[i+1])) || (isMove(text[i])&& !isAmount(text[i+1]))){
			result = result + text[i] + " ";
		}
		else if(isMove(text[i]) && isAmount(text[i+1]))	{
			result = result + text[i] + text[i+1] + " ";
			i++;
		}
		else{
		console.log("fault at "+ i+ " with"  + text[i]);
		result+= text[i];
		}
	}
	if(isMove(text[text.length-1])){
			result = result + text[i] + " ";
	}
	console.log(result);
	return result;
}
function isMove(t){
	if(t=="D"||t=="U"||t=="R"||t=="L"||t=="B"||t=="F"){
		return true;
	}
	return false;
}
function isAmount(t){
	if(t=="2"||t=="'"){
		return true;
	}
	return false;
}
function switchUD(text){
	console.log(text);
	text = text.replace(/U\' /g, 'P ');
	text = text.replace(/U /g, 'U\' ');
	text = text.replace(/P /g, 'U ');
	console.log(text);
	text = text.replace(/D\' /g, 'P ');
	text = text.replace(/D /g, 'D\' ');
	text = text.replace(/P /g, 'D ');
	return text;
}
function switchFB(text){
	text = text.replace(/F\' /g, 'P ');
	text = text.replace(/F /g, 'F\' ');
	text = text.replace(/P /g, 'F ');
	
	text = text.replace(/B\' /g, 'P ');
	text = text.replace(/B /g, 'B\' ');
	text = text.replace(/P /g, 'B ');
	return text;
}
function switchLRMirror(text){
	text = text.replace(/L /g, 'P ');
	text = text.replace(/R\' /g, 'L ');
	text = text.replace(/P /g, 'R\' ');
	
	text = text.replace(/L2 /g, 'P ');
	text = text.replace(/R2 /g, 'L2 ');
	text = text.replace(/P /g, 'R2 ');

	text = text.replace(/R /g, 'P ');
	text = text.replace(/L\' /g, 'R ');
	text = text.replace(/P /g, 'L\' ');
	return text;
}
function switchLRInverse(text){
	text = text.replace(/L\' /g, 'P ');
	text = text.replace(/L /g, 'L\' ');
	text = text.replace(/P /g, 'L ');
	
	text = text.replace(/R\' /g, 'P ');
	text = text.replace(/R /g, 'R\' ');
	text = text.replace(/P /g, 'R ');
	return text;
}