// Scientific Calculator for Chemists written by Eni Generalic
// URL: http://www.periodni.com/scientific_calculator.html
// Create: 1999/10/14; Update: 2014/07/31
// If you use a variant of this in your page, please email me at enig@periodni.com
// Atomic Weights of the Elements 2007, Pure & Appl. Chem., Vol. 80, No. 11, (2009) 2131-2156.

var EniG = "";
//Auto Sci Fix
var asf = 0;
var decimala = 2;
// Rad Deg Grad
var rdg = 0;
// Digit Grouping
var dg = 0;
var pi = 3.14159265358979324;
var e = 2.7182818284590452;

window.onload = start();

function start(){
	var dan = new Date();
	document.racunalo.notes.value += "   " + dan.toLocaleString() + "\n\n";
	document.racunalo.zadatak.focus();
}

function Memory(operator) {

	switch(operator) {
	case 1:		// MS 
		var memorija = document.racunalo.rezultat.value;
		if (memorija==0 || ChemSlovo(memorija.charAt(0))) {memorija = ""}

		document.racunalo.nummem.title = memorija;

		if (memorija.length) {
			document.getElementById('nummem').style.color = '#000';
		}
		else {
			document.getElementById('nummem').style.color = '#ccc';
		}		
		break;    
	case 2:	// MR
		var memorija = document.racunalo.nummem.title;

		DodajBroj(memorija);
		break; 
	case 3:	// CLS
		var dan = new Date();

		document.racunalo.notes.value = EniG;
		document.racunalo.notes.value += "\n   " + dan.toLocaleString() + "\n\n";
		break; 
	case 4:	// Mode
		vidi('numformat');
		break; 
	case 5:	// Reset
		document.racunalo.reset();

		var dan = new Date();
		document.racunalo.notes.value += "    " + dan.toLocaleString() + "\n\n";
		
		decimala = 2;
		asf = 0;
		rdg = 0;
		dg = 0;
		document.racunalo.nummem.title = "";
		document.racunalo.oldresult.title = "0";
		document.racunalo.rezultat.title = "0";
	
		document.getElementById('numauto').style.color = '#000';
		document.getElementById('numsci').style.color = '#ccc';
		document.getElementById('numfix').style.color = '#ccc';
		document.getElementById('nummem').style.color = '#ccc';
		document.getElementById('numrad').style.color = '#000';
		document.getElementById('numdeg').style.color = '#ccc';
		document.getElementById('numgrad').style.color = '#ccc';	

		document.getElementById('numformat').style.display = 'none';
		break; 
	}

	document.racunalo.zadatak.focus();
}

function DodajBroj(noviznak) {
	var selstart = document.racunalo.zadatak.selectionStart;
	var selend = document.racunalo.zadatak.selectionEnd;
	var strinput = document.racunalo.zadatak.value;

	if (selstart || selend) {
		document.racunalo.zadatak.value = strinput.slice(0, selstart) + noviznak + strinput.slice(selend);
		selstart += noviznak.length;
		document.racunalo.zadatak.setSelectionRange(selstart, selstart);
	}
	else {
	// IE before version 9 have undefined selstart
		document.racunalo.zadatak.value = strinput + noviznak
	}
	document.racunalo.zadatak.focus();
}


function Izracunaj(funkcija) {
	var pitanje = "";
	var odgovor = "0";
	var chem = false;
	var math = false;
	//var mem = 0;
	var mm = "";
	var mmup = "";
	var mmdn = "";
		
	document.racunalo.oldtask.value = document.racunalo.upit.value;
	document.racunalo.oldresult.value = document.racunalo.rezultat.value;
	document.racunalo.oldresult.title = document.racunalo.rezultat.title;
	
	var zadatak = document.racunalo.zadatak.value;
//Error handling in JavaScript
  try 
  { 
	// Remove all spaces from expression
	//zadatak = zadatak.replace(/ /g,'');
	zadatak = Cleaning(zadatak);
	
	if (zadatak.length==0) {
		if (funkcija > 1) {
			zadatak = document.racunalo.rezultat.value;
		}
		else {
			document.racunalo.upit.value = "";
			document.racunalo.rezultat.value = "";
			document.racunalo.rezultat.title = "0";
			document.racunalo.zadatak.focus();
			return;
		}
	}
	else if (UbaciRezultat(zadatak.charAt(0))) {
		odgovor = document.racunalo.rezultat.value;
		if (odgovor.length==0) {
			//document.racunalo.rezultat.title = "0";
			document.racunalo.zadatak.focus();
			return;
		}
		zadatak = document.racunalo.rezultat.value + zadatak;
	}
	
	// Cleaning input text 
	for (var i=0; i<zadatak.length; i++) 
	{
		mm = zadatak.charAt(i);
		if (i > 0) mmdn = zadatak.charAt(i-1);
		if (i < zadatak.length-1) mmup = zadatak.charAt(i+1);

		if (mm == ",") {mm = "."}
		else if (mm == "}" || mm == "]") {mm = ")"}
		else if (mm == "{" || mm == "[") {mm = "("}
		//else if (mm == " " || mm == "=") {mm = ""}
		else if (mm == String.fromCharCode(247)) {mm = "/"}
		else if (mm == String.fromCharCode(215)) {mm = "*"}
		else if (mm == "*" && mmup == "*") {mm = "^"; i++}
		else if (mm == "+" && mmup == "-") {mm = "-"; i++}
		else if (mm == "E" && KemSimbol(mmup)) {mm = "e"}
		//else if (mm == "$" || mm == "&" || mm == "@") {mm = ""}
		//else if (mm == "#" || mm == "?" || mm == "=") {mm = ""}
	
		if (mm == "." && BrojAtoma(mmdn)==false) {mm = "0."}
		else if (VelikoSlovo(mm)) {chem = true}
		else if (Operator(mm)) {math = true}

		if (pitanje == "0") {
			if (Operator(mm)) {}
			else if (mm != ".") {pitanje = ""}
		}

		pitanje += mm;
	}

	if (funkcija > 1) {
		if (math) {pitanje = "(" + pitanje + ")"}
		pitanje = DodajFunkcije(funkcija, pitanje);
	}

	if (chem) {
		odgovor = MolnaMasa(pitanje);
	}
	else {
		odgovor = CalcZagrada(pitanje);
	}
		
	document.racunalo.upit.value = pitanje;
	

	//odgovor = odgovor.toString();
	document.racunalo.rezultat.title = odgovor;
	
	//odgovor = IzgledBroja(odgovor);
	//document.racunalo.rezultat.value = odgovor;
	NumberFormat(0);

	document.racunalo.zadatak.value = "";
 	document.racunalo.zadatak.focus();
  }  
  catch(err) {

    var txt = "There was an error on this page.\n\n";
    txt += "Error description: " + err.message + "\n\n";
    txt += "Click OK to continue.\n\n";
    alert(txt);

	document.racunalo.zadatak.value = pitanje;
 	document.racunalo.zadatak.focus();
  }

}


function DodajFunkcije(funkcija, pitanje) {

	switch(funkcija) {
		case 2:		// Square
			pitanje = pitanje + "^2";
			break; 
		case 3:		// Square root
			pitanje = pitanje + "^(1/2)";
			break;
		case 4:		// Sign change
			pitanje = pitanje + "*(-1)";
			break;
		case 5:		// Natural logarithm
			pitanje = "ln" + pitanje;
			break;
		case 6:		// Natural antilogarithm
			pitanje = "e^" + pitanje;
			break;
		case 7:		// Reciprocal
			pitanje = "1/" + pitanje;
			break;
		case 8:		// Common logarithm
			pitanje = "log" + pitanje;
			break;
		case 9:		// Common antilogarithm
			pitanje = "10^" + pitanje;
			break;
		case 10:		// Arc tangent
			pitanje = "atan" + pitanje;
			break;
		case 11:		// Arc cosine
			pitanje = "acos" + pitanje;
			break;
		case 12:		// Arc sine
			pitanje = "asin" + pitanje;
			break;
		//case 13:		// Parts per million
		//	pitanje = pitanje + "ppm";
		//	break;
		case 14:		// Tangent
			pitanje = "tan" + pitanje;
			break;
		case 15:		// Cosine
			pitanje = "cos" + pitanje;
			break;
		case 16:		// Sine
			pitanje = "sin" + pitanje;
			break;
		case 17:		// Percent
			pitanje = pitanje + "%";
			break;
		case 20:		// Factorial
			pitanje = pitanje + "!";
			break;
		case 21:		// Power
			var eksponent = prompt("Unesite eksponent / Please enter exponent", 3);
			pitanje = pitanje + "^" + eksponent;
			break;
		case 22:		// Root
			var eksponent = prompt("Unesite korijen / Please enter root", 3);
			pitanje = pitanje + "^(1/" + eksponent + ")";
			break;
	}

	return pitanje;
}

function CalcZagrada(izraz) {
    var intZagClose = 0
    var intZagOpen = 0
	var broj = 0
	//var strNoviXbroj = ""
	var strResult = "";

	do {
// 2+(2*(2+4)+3)^3+5
		izraz = izraz.replace(/--/g,"-1*-");
		intZagClose = izraz.indexOf(")");
		if (intZagClose != -1) {
			for (var i = intZagClose; i >= 0; i--) {
				if (izraz.charAt(i)=="(") {
					intZagOpen = i;
					strResult = izraz.substring(intZagOpen+1,intZagClose);
					break;
				}
			}
		}
		else {
			strResult = izraz;
		}

		strResult = strResult + "*1";
		strResult = CalcPostotak(strResult);
		strResult = CalcTrigonometry(strResult);
		strResult = CalcLogaritam(strResult);
		strResult = CalcPotencija(strResult);
		
		broj = EvalString(strResult);
		strResult = broj.toString();

		if (intZagClose != -1) {
			izraz = izraz.replace(izraz.substring(intZagOpen, intZagClose+1), strResult);
		}
		else {
			izraz = strResult;
		}	
	}
	while (intZagClose > 0)
	//izraz = molmasa.toString();
	return izraz;
}


function EvalString(upit) {
	with (Math) {
		//var broj = eval(upit);
		return eval(upit);
	}
	//upit = broj.toString();
	//return broj;
}


function CalcPotencija(ulaz) {
    var intZagClose = 0
    var intZagOpen = 0;
	var fPower = 0;

	var intPozicija = ulaz.indexOf("^");  //2+2^3+2,15^2+4
	
	while (intPozicija > 0) {
		for (var i = intPozicija - 1; i >= 0; i--) {
			if (Operator(ulaz.charAt(i)) && ulaz.charAt(i-1)!="e") {
				//if (i > 0 && Operator(ulaz.charAt(i-1))) {
				intZagOpen = i+1;
				break;
			}
		}
		
		if (ulaz.charAt(i) == "-"){
			if (i == 0) {intZagOpen = 0;}
			else if (i > 0 && Operator(ulaz.charAt(i-1))) {intZagOpen = i;}
		}
		
		var strBase = ulaz.substring(intZagOpen,intPozicija);
		if (strBase == 'e') {strBase = e}; //cps
		
		for (var i = intPozicija + 2; i < ulaz.length; i++) {
			if (Operator(ulaz.charAt(i)) && ulaz.charAt(i-1)!="e") {intZagClose = i-1; break}
		}
		var strExponent = ulaz.substring(intPozicija+1,intZagClose+1);
		
		fPower = Math.pow(strBase, strExponent);
		
		ulaz = ulaz.replace(ulaz.substring(intZagOpen, intZagClose+1), fPower);

		intPozicija = ulaz.indexOf("^");
	}

	return ulaz;
}


function CalcPostotak(ulaz) {
    var intZagClose = 0;
    var intZagOpen = 0;
	var fPostotak = 0;

	var strDesnoFun = new Array ("!", "%");

	for (var f = 0; f < 2; f++) {
		var intPozicija = ulaz.indexOf(strDesnoFun[f]);
		
		while (intPozicija > 0) {
			for (var i = intPozicija - 1; i >= 0; i--) {
				if (Operator(ulaz.charAt(i)) && ulaz.charAt(i-1)!="e") {intZagOpen = i+1; break}
			}
			var strNoviXbroj = ulaz.substring(intZagOpen,intPozicija);
			intZagClose = intPozicija+1;
			//with (Math) {
				if (f == 0) {
					fPostotak = CalcFactorial(strNoviXbroj);
				}
				else {
					fPostotak = strNoviXbroj / 100;
				}
			//}
			ulaz = ulaz.replace(ulaz.substring(intZagOpen, intZagClose), fPostotak);
			intPozicija = ulaz.indexOf(strDesnoFun[f]);
		}
	}

	return ulaz;
}


function CalcTrigonometry(kut) {
    var intZagClose = 0
	var fAngle = 0
	var strNoviKut = ""
	var strKrozPi = ")"
	var strPiKroz = ")";
	
	switch(rdg) 
	{
		case 1:
			strKrozPi = ")*180/pi";
			strPiKroz = "*pi/180)";
			break;    
		case 2:
			strKrozPi = ")*200/pi";
			strPiKroz = "*pi/200)";
			break;
	//default:
	//	strKrozPi = ")";
	//	strPiKroz = ")";
	}

	var strTrigFun = new Array ("sin", "cos", "tan");

	for (var f = 0; f < 3; f++) {
		intPozicija = kut.indexOf(strTrigFun[f]);

		if (intPozicija >= 0) {
			if (VelikoSlovo(kut.charAt(intPozicija+4))) {return kut;}
			
			do {
//document.racunalo.notes.value += enter + intKut + enter;			cos(2*(3+5)+3*(2+4))+1                        2+(2*(2+cos(4))+3)+(3^3+5)*4
				intZagClose = kut.length;
				for (var i = intPozicija+4; i < intZagClose; i++) {

					if (Operator(kut.charAt(i)) && kut.charAt(i-1)!="e") {
						intZagClose = i;
						strNoviKut = kut.substring(intPozicija+3, intZagClose);
						break;
					}
				}

				if (intPozicija>0 && kut.charAt(intPozicija-1)=="a") {
					intPozicija = intPozicija - 1;
					strNoviKut = "a" + strTrigFun[f] + "(" + strNoviKut + strKrozPi;
				}
				else {
					strNoviKut = strTrigFun[f] + "(" + strNoviKut + strPiKroz;
				}

				fAngle = EvalString(strNoviKut);
				fAngle = Math.round(fAngle * Math.pow(10,14)) / Math.pow(10,14);
				//strNoviKut = fAngle.toString();
				
				kut = kut.replace(kut.substring(intPozicija, intZagClose), fAngle);
				
				intPozicija = kut.indexOf(strTrigFun[f]);

			}
			while (intPozicija != -1);
		}
	}

	return kut;
}


function CalcLogaritam(ulaz) {
    var intZagClose = 0
	var fLogaritam = 0
	var strNoviLog = ""
	var strKrozPi = ")"
	var strPiKroz = ")";
// var e = 2.71828182845905	

	var strLogFun = new Array ("ln", "log");

	for (var f = 0; f < 2; f++) {
		var intPozicija = ulaz.indexOf(strLogFun[f]);

		if (intPozicija >= 0) {
			if (VelikoSlovo(ulaz.charAt(intPozicija+3+f))) {return ulaz;}
		
			do {
				intZagClose = ulaz.length;
				for (var i = intPozicija; i < intZagClose; i++) {

					if (Operator(ulaz.charAt(i)) && ulaz.charAt(i-1)!="e") {
						intZagClose = i;
						strNoviLog = ulaz.substring(intPozicija+strLogFun[f].length, intZagClose);
						break;
					}
				}

				if (f == 0) {
					if (intPozicija>0 && ulaz.charAt(intPozicija-1)=="a") {
						intPozicija = intPozicija - 1;
						strNoviLog = "pow(E," + strNoviLog + ")";
					}
					else {
						strNoviLog = "log(" + strNoviLog + ")";
					}
				}
				else {
					if (intPozicija>0 && ulaz.charAt(intPozicija-1)=="a") {
						intPozicija = intPozicija - 1;
						strNoviLog = "pow(10," + strNoviLog + ")";
					}
					else {
						strNoviLog = "log(" + strNoviLog + ")/LN10";
					}
				}

				fLogaritam = EvalString(strNoviLog);

				ulaz = ulaz.replace(ulaz.substring(intPozicija, intZagClose), fLogaritam);
				intPozicija = ulaz.indexOf(strLogFun[f]);

			}
			while (intPozicija != -1);
		}
	}

	return ulaz;
}


function CalcFactorial(n) {
	if ((n == 0) || (n == 1)) {
		return 1;
	}
	else {
		var odgovor = (n * CalcFactorial(n-1));
		return odgovor;
	}
}


function MolnaMasa(atom) {
try 
{ 
	with (Math) {
		var atominfo = false;
		var mm="";
		var mmdn="";
		var mmup="";
		var znak="";
		var izraz="";
		var Pi=pi;
		var H=1.0079;
		var He=4.0026;
		var Li=6.941;
		var Be=9.0122;
		var B=10.811;
		var C=12.011;
		var N=14.007;
		var O=15.999;
		var F=18.998;
		var Ne=20.18;
		var Na=22.99;
		var Mg=24.305;
		var Al=26.982;
		var Si=28.086;
		var P=30.974;
		var S=32.065;
		var Cl=35.453;
		var Ar=39.948;
		var K=39.098;
		var Ca=40.078;
		var Sc=44.956;
		var Ti=47.867;
		var V=50.942;
		var Cr=51.996;
		var Mn=54.938;
		var Fe=55.845;
		var Co=58.933;
		var Ni=58.693;
		var Cu=63.546;
		var Zn=65.38;
		var Ga=69.723;
		var Ge=72.64;
		var As=74.922;
		var Se=78.96;
		var Br=79.904;
		var Kr=83.798;
		var Rb=85.468;
		var Sr=87.62;
		var Y=88.906;
		var Zr=91.224;
		var Nb=92.906;
		var Mo=95.96;
		var Tc=98;
		var Ru=101.07;
		var Rh=102.91;
		var Pd=106.42;
		var Ag=107.87;
		var Cd=112.41;
		var In=114.82;
		var Sn=118.71;
		var Sb=121.76;
		var Te=127.6;
		var I=126.9;
		var Xe=131.29;
		var Cs=132.91;
		var Ba=137.33;
		var La=138.91;
		var Ce=140.12;
		var Pr=140.91;
		var Nd=144.24;
		var Pm=145;
		var Sm=150.36;
		var Eu=151.96;
		var Gd=157.25;
		var Tb=158.93;
		var Dy=162.5;
		var Ho=164.93;
		var Er=167.26;
		var Tm=168.93;
		var Yb=173.05;
		var Lu=174.97;
		var Hf=178.49;
		var Ta=180.95;
		var W=183.84;
		var Re=186.21;
		var Os=190.23;
		var Ir=192.22;
		var Pt=195.08;
		var Au=196.97;
		var Hg=200.59;
		var Tl=204.38;
		var Pb=207.2;
		var Bi=208.98;
		var Po=209;
		var At=210;
		var Rn=222;
		var Fr=223;
		var Ra=226;
		var Ac=227;
		var Th=232.04;
		var Pa=231.04;
		var U=238.03;
		var Np=237;
		var Pu=244;
		var Am=243;
		var Cm=247;
		var Bk=247;
		var Cf=251;
		var Es=252;
		var Fm=257;
		var Md=258;
		var No=259;
		var Lr=262;
		var Rf=267;
		var Db=268;
		var Sg=271;
		var Bh=272;
		var Hs=277;
		var Mt=276;
		var Ds=281;
		var Rg=280;
		var Cn=285;
	// Pure Appl. Chem., Vol. 81, No. 11, (2009) 2131-2156
		
		for (var i=0; i<atom.length; i++) {
			mm = atom.charAt(i);
			mmup = atom.charAt(i+1);
			bigup = mm.toUpperCase();
			mmdn = atom.charAt(i-1);

			if (mm == "[") {mm = "("}
			else if (mm == "]") {mm = ")"}
			else if (mm == ",") {mm = "."}

			if (ChemSlovo(mm)) {atominfo = true}
			if (MatOperator(mm)) {atominfo = false; znak=""}
			if (atominfo) {
				if (MatOperator(mmup)) {znak=")"}
				if (MatOperator(mmdn)) {izraz += "(" + mm + znak}
				else if (mmdn=="(") {izraz += mm + znak}
				else if (mmdn=="[") {izraz += mm + znak}
				else if (ChemSlovo(mm)) {izraz += "+" + mm + znak}
				else if (BrojAtoma(mmdn)) {izraz += mm + znak}
				else if (BrojAtoma(mm)) {izraz += "*" + mm + znak}
				else {izraz += mm + znak}
			}
			else {izraz += mm}
		}
		var molmasa = eval(izraz);
	}
	return molmasa.toString();
}  
catch(err) {
    return "Syntax Error";
}
}


function ChemSlovo(znak) {
	var slovo="(ABCDEFGHIKLMNOPRSTUVWXYZ";
	for (var i=0; i<slovo.length; i++) {
		if (znak == slovo.charAt(i)) {return true}
	}
	return false;
}

function VelikoSlovo(znak) {
	var slovo="ABCDEFGHIKLMNOPRSTUVWXYZ";
	for (var i=0; i<slovo.length; i++) {
		if (znak == slovo.charAt(i)) {return true}
	}
	return false;
}

function MatOperator(znak) {
	var matoperator="*/+-";
	for (var i=0; i<matoperator.length; i++) {
		if (znak == matoperator.charAt(i)) {return true}
	}
	if (znak == "") {return true}
	if (znak == null) {return true}
	return false;
}

function Operator(znak) {
	var matoperator="^*/+-";
	if (matoperator.indexOf(znak) >= 0) {return true}
	return false;
}

function UbaciRezultat(znak) {
	var matoperator="^*/+";
	for (var i=0; i<matoperator.length; i++) {
		if (znak == matoperator.charAt(i)) {return true}
	}
	return false;
}

function BrojAtoma(znak) {
	var atom = "1234567890";
	for (var i=0; i<atom.length; i++) {
		if (znak == atom.charAt(i)) {return true}
	}
	return false;
}

function KemSimbol(znak) {
//  Er, Es, Eu
	var simbol = "rsu";
	if (simbol.indexOf(znak) == -1) {return true}
	return false;
}


function NumberFormat(x){
	var broj = document.racunalo.rezultat.title;
	
	if (broj != "0" && broj != "") {
		document.racunalo.rezultat.value = IzgledBroja(broj);
	} else {
		document.racunalo.rezultat.value = broj;
	}
	
	if (x) {
		broj = document.racunalo.oldresult.title;
		if (broj != "0" && broj != "") {
			document.racunalo.oldresult.value = IzgledBroja(broj);
		} else {
			document.racunalo.oldresult.value = broj;
		}
	}
	
	document.racunalo.zadatak.focus();
	

	switch(x) {
		case 1:		// asf
			var mod = new Array("AUTO", "SCI", "FIX");
			if (asf) {
				document.racunalo.notes.value += "[" + mod[asf] + decimala + "]";
			}
			else {
				document.racunalo.notes.value += "[AUTO]";
			}
			break;
		case 2:		// rdg
			var mod = new Array("[RAD]\n", "[DEG]\n", "[GRAD]\n");
			document.racunalo.notes.value += mod[rdg];
			return;
		default:	// calculate
			broj = document.racunalo.upit.value;
	}			
			broj += " = ";
			broj += document.racunalo.rezultat.value;
			broj += "\n";
			document.racunalo.notes.value += broj;
			//return;
}


function BrojDecimala(x) {
	decimala = x;
	NumberFormat(1);
}


function AutoSciFix(x) {
	var kut = new Array("numauto", "numsci", "numfix");

	document.getElementById(kut[asf]).style.color = '#ccc';
	asf = x;
	document.getElementById(kut[asf]).style.color = '#000';
	
	NumberFormat(1);
}


function GroupDigits(kvacica) {
	dg = (dg) ? 0 : 1;
	NumberFormat(1);
}


function RadDegGrad(x) {
	var kut = new Array("numrad", "numdeg", "numgrad");

	document.getElementById(kut[rdg]).style.color = "#ccc";
	rdg = x;
	document.getElementById(kut[rdg]).style.color = "#000";
	
	NumberFormat(2);
}


function IzgledBroja(strnum) {
//  max 16 decimala
	strnum = CheckEpsilon(strnum);
	var x = parseFloat(strnum);

	switch(asf) {
		case 0:		// auto
			strnum = x.toPrecision();
			break;
		case 1:		// sci
			strnum = x.toExponential(decimala);
			break;
		case 2:		// fix
			strnum = x.toFixed(decimala);
			break;
	}

	if (dg) {strnum = DigitGrouping (strnum)}

	return strnum;
}


function CheckEpsilon(strnum) {
// EPSILON	- Difference between 1 and the least value greater than 1 that is representable.
// The parseFloat() function parses a string and returns a floating point number.
	var epsilon = 1e-8;
	var x = parseFloat(strnum);
	
	var expbroj = x.toExponential(17);
    // Zadnjih 10 znamenki prije eksponenta (9 ako je broj negativan)
	// pretvaramo u novi decimalni broj
	var y = parseFloat("0." + expbroj.slice(9,19));
	
    // i usporedjujemo ga s epsilon (1e-8).
    // Ako je y broj manji od epsilon zaokruzuje se strnum
    if (y<epsilon || (1-y)<epsilon) {
        strnum = x.toExponential(10);
    }

    // a ako nije vraca se netaknut
	return strnum;
}


function DigitGrouping (broj) {

	if (VelikoSlovo(broj.charAt(0))) {return "Input Error"}
	//if (broj == "NaN") { return "Input Error"; }
	else if (broj.length < 5) {return broj}

	var rezultat = "";
	var strexp = "";	
	var dotplace = broj.indexOf('.');
	//if (dotplace == -1) {dotplace = 0;}
	var eplace = broj.indexOf('e');
	if (eplace == -1) {eplace = broj.length;} {strexp = " " + broj.substring(eplace);}

	var tri = 0;
	for (var i=dotplace+1; i<eplace; i++) {
		tri++;
		if (tri == 3) {
			rezultat += broj.charAt(i) + " ";
			tri = 0;
		}
		else {
			rezultat += broj.charAt(i);
		}
	}
	rezultat += strexp

	if (dotplace > -1) {
		rezultat = "." + rezultat;
		tri = 0;
		for (var i=dotplace-1; i>=0; i--) {
			if (tri == 3) {
				rezultat = broj.charAt(i) + " " + rezultat;
				tri = 0;
			}
			else {
				rezultat = broj.charAt(i) + rezultat;
			}
			tri++;
		}
	}
	rezultat = rezultat.replace("- ", "-");
	broj = rezultat;

	return broj;
}


function Cleaning(zadatak) {
	var strAllowed="1234567890!^*/+-.,×÷{[()]}abcdefghiklmnoprstuvwxyzABCDEFGHIKLMNOPRSTUVWXYZ";
	var rezultat="";
	for (var i=0; i<zadatak.length; i++) {
		znak = zadatak.charAt(i);
		for (var j=0; j<strAllowed.length; j++) {
			if (znak == strAllowed.charAt(j)) {
				rezultat += znak;
				break;
			}
		}
	}
	return rezultat;
}


function vidi(me) {
	var seeme = document.getElementById(me);
	var stanje = (seeme.style.display == 'block') ? 'none' : 'block';
	seeme.style.display = stanje;

	document.racunalo.zadatak.focus();
}

// Eni Generalic, Split, Create: 1999/10/14; Update: 2014/07/31
// Copyright © 2014 by EniG. All rights reserved.

