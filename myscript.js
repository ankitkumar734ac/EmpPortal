const empDB=[ 
			{empcode:'A102', name:'James', age:37, gender:'Male', department:'Finance', designation:'Manager',	salary:65000},
			{empcode:'A106', name:'Mary', age:24, gender:'Female', department:'Technology', designation:'Vice-President',	salary:68000},
			{empcode:'A122', name:'Bob', age:23, gender:'Male', department:'Marketing', designation:'Manager',	 salary:51000},
			{empcode:'A088', name:'Julia', age:33, gender:'Female', department:'Finance', designation:'Vice-President',	salary:70000},	
			{empcode:'A055', name:'Steve', age:27, gender:'Male', department:'Technology', designation:'Manager',	salary:53000},	
			{empcode:'A208', name:'Katherine', age:29, gender:'Female', department:'Marketing', designation:'Manager',	salary:61000},
			{empcode:'A181', name:'Edwards', age:31, gender:'Male', department:'Finance', designation:'Trainee',	salary:49000},				
			{empcode:'A029', name:'Margaret', age:32, gender:'Female', department:'Technology', designation:'President',	salary:53000},
			{empcode:'A028', name:'Bill', age:27, gender:'Male', department:'Operations', designation:'Manager',	salary:58000}	
];

const deptArr=['Finance','Technology','Marketing','Operations'];
const desiArr=['Trainee','Manager','Vice-President','President'];



/*------------------------------------------Dump Display-------------------------------*/

function getFullDump(){
	const arr=empDB.map(emp=>{
		let {empcode,name,age,gender,department,designation,salary}=emp;
		let txt=empcode+"::"+name+"::"+age+"::"+gender+"::"+department+"::"+designation+"::"+salary;
		return txt;
	});
	document.getElementById('show').innerHTML='<div class="dump">["'+arr.join('","')+'"]</div>';
}
function getPartialDump() {
	const arr=empDB.map(emp=>{
		let {empcode,name,age}=emp;
		let txt="Code="+empcode+",Name="+name+",Age="+age;
		return txt;
	});
	document.getElementById('show').innerHTML='<div class="dump">["'+arr.join('","')+'"]</div>';
}

/*-----------------------------------------Add New Employee Operations-----------------------------*/

function getNewEmpForm(){
	let txt=showEditForm();
	document.getElementById('show').innerHTML=txt;
}
function addNewEmp(){
	//console.log('add');

	let empcode=document.getElementById('code').value;
	let name=document.getElementById('name').value;
	let age=document.getElementById('age').value;
	let genderEle=document.getElementsByName('gender');
	let gender='';
	if(genderEle[0].checked)gender='Male';
	else if(genderEle[1].checked)gender='Female';
	else gender='';
	let department=document.getElementById('DeptSelect').value;
	let designation=document.getElementById('DesiSelect').value;
	let salary=document.getElementById('salary').value;


	if (empcode=="")alert("Enter Employee Code");
	else if(empcode){
		let ind=empDB.findIndex(emp=>{
			return emp.empcode==empcode;
		});	
		if(ind>=0){
			alert('Employee code already exists. Enter a different employee code');
		}
		else if (name=="")alert("Enter the Name");
		else if (age=="")alert("Enter the age");
		else if (gender=="")alert("Select the gender");
		else if (department=="0")alert("Select the depertment");
		else if (designation=="0")alert("Select the designation");
		else 	if (salary=="")alert("Enter the salary");
		else{
			let data={};
			data.empcode=empcode;
			data.name=name;
			data.age=age;
			data.gender=gender;
			data.department=department;
			data.designation=designation;
			data.salary=salary;
			empDB.push(data);
			alert('The new employee has been successfully added');
			show();
		}
	}
	
}

/*----------------------------Update Emp Operations------------------------*/

function update(empcod) {
	let empcode=document.getElementById('code').value;
	let name=document.getElementById('name').value;
	let age=document.getElementById('age').value;
	let salary=document.getElementById('salary').value;
	let department=document.getElementById('DeptSelect').value;
	let designation=document.getElementById('DesiSelect').value;

	let genderEle=document.getElementsByName('gender');
	let gender='';
	if(genderEle[0].checked)gender='Male';
	else if(genderEle[1].checked)gender='Female';

	let i=empDB.findIndex(emp=>{
		return emp.empcode==empcod;
	});
	empDB[i].name=name;
	empDB[i].age=age;
	empDB[i].salary=salary;
	empDB[i].department=department;
	empDB[i].designation=designation;
	empDB[i].gender=gender;
	alert("The employee details have been update");
	show();
}

/*-----------------------------Edit Form Window Operatons----------------------------------*/

function editFun(type){
	let emp=empDB.find(emp=>{
		return emp.empcode==type;
	});
	let {empcode,name,age,gender,department,designation,salary}=emp;

	let txt=showEditForm(gender,department,designation,empcode,'Edit Employee Details','update');
	document.getElementById('show').innerHTML=txt;

	document.getElementById('code').disabled = true;
	document.getElementById('code').value=empcode;
	document.getElementById('name').value=name;
	document.getElementById('age').value=age;
	document.getElementById('salary').value=salary;

}
function generateInputForm(dis,id,text){

	let txt='<tr>';
	txt+='		<td align="right">'+dis+'</td>';
	txt+='	    <td><input type="'+text+'" id="'+id+'" name=""></td>';
	txt+='	</tr>';

	return txt;
}

function generateSelectForm(arr,dis,sele=0,id){
	let mArr=arr.map(de=>{
		if(sele==de)
			return '<option selected>'+de+'</option>';
		else 
			return '<option>'+de+'</option>';
	});
	let txt='';
	txt+='<td align="right">'+dis+'</td>';
	txt+='<td><select class="myselect" id="'+id+'">';
	if(sele==0)
		txt+='		<option selected value=0 disabled>Choose '+dis+'</option>';
	else
		txt+='		<option  value=0 disabled>Choose '+dis+'</option>';
	txt+=mArr.join('');
	txt+='	</select></td>';
	return txt;
}
function showEditForm(gender,department,designation,empcode,btnMsg='Add New Employee',btnName='addNewEmp') {

	let str='<table  style="   padding-left: 50px;">';
	str+=generateInputForm('Employee Code','code');
	str+=generateInputForm('Name','name');
	str+=generateInputForm('Age','age','number');
	str+='	<tr>';
	str+='		<td align="right">Gender</td>';
	if(gender=='Male')
		str+='		<td><input type="radio" name="gender" value="Male" checked>Male <input type="radio" name="gender" value="Female">Female</td>';
	else if(gender=='Female')
		str+='		<td><input type="radio" name="gender" value="Male" >Male <input type="radio" name="gender" value="Female" checked>Female</td>';
	else
		str+='		<td><input type="radio" name="gender" value="Male">Male <input type="radio" name="gender"  value="Female" >Female</td>';
	str+='	</tr>';	
	str+='	<tr>';
	str+=generateSelectForm(deptArr,'Depertment',department,'DeptSelect');
	str+='</tr><tr>';
	str+=generateSelectForm(desiArr,'Designation',designation,'DesiSelect');
	str+='</tr>';
	str+=generateInputForm('Salary','salary','number');
	str+='	<tr>';
	str+='		<td></td>';
	str+='		<td><button class="butt" onclick=" '+btnName+'(\''+empcode+'\')">'+btnMsg+'</button></td>';
	str+='	</tr>';
	str+='</table>';
	return str;
}

/*---------------------------Filter Operations-----------------------------------*/

function doFilter(){
	let deptE=document.getElementById('DeptSelect');
	let desiE=document.getElementById('DedignSelect');
	let dept=deptE.value;
	let desi=desiE.value;
	console.log(dept,desi);
	if(dept==0 && desi==0){
		show();
	}else if(dept && desi==0){
		let arr=oneParFilter('department',dept);
		show(arr);
	}else if(desi!=0 && dept==0){
		let arr=oneParFilter('designation',desi);
		show(arr);
	}else {
		console.log('hgdhsfjdfhdsf');
		let arr=twoParFilter(dept,desi);
		show(arr);
	}

}
function oneParFilter(type,par) {
 	let arr=empDB.filter(emp=>{
 		if(emp[type]==par)return true;
 		else return false;
 	});
 	return arr;
}
function twoParFilter(par1,par2) {
 	let arr=empDB.filter(emp=>{
 		if(emp['department']==par1 && emp['designation']==par2)return true;
 		else return false;
 	});
 	return arr;
}

/*--------------------Sort Operations---------------------------------------------*/

function doSort(type){
	if(type=='empcode'){
		empDB.sort((e1,e2)=>{
			if(e1.empcode>e2.empcode)return 1;
			else if(e1.empcode<e2.empcode)return -1;
			else return 0;
		});

	}else if(type=='name'){
		empDB.sort((e1,e2)=>{
			if(e1.name>e2.name)return 1;
			else if(e1.name<e2.name)return -1;
			else return 0;
		});
	}else if(type=='age'){
		empDB.sort((e1,e2)=>{
			if(e1.age>e2.age)return 1;
			else if(e1.age<e2.age)return -1;
			else return 0;
		});
	}else if(type=='gender'){
		empDB.sort((e1,e2)=>{
			if(e1.gender>e2.gender)return 1;
			else if(e1.gender<e2.gender)return -1;
			else return 0;
		});
	}else if(type=='department'){
		empDB.sort((e1,e2)=>{
			if(e1.department>e2.department)return 1;
			else if(e1.department<e2.department)return -1;
			else return 0;
		});
	}else if(type=='designation'){
		empDB.sort((e1,e2)=>{
			if(e1.designation>e2.designation)return 1;
			else if(e1.designation<e2.designation)return -1;
			else return 0;
		});
	}else if(type=='salary'){
		empDB.sort((e1,e2)=>{
			if(e1.salary>e2.salary)return 1;
			else if(e1.salary<e2.salary)return -1;
			else return 0;
		});
	}
	show();
}

/*--------------------Display Employees Operations---------------------------------------------*/

function showAllEmpForm(){
	show();
}

function show(db=empDB){

	let txt='<p><b>Filter Employees by</b>';
	txt+='	<select class="myselect" id="DeptSelect">';
	txt+='		<option selected value=0>Choose Depertment</option>';
	txt+='		<option>Finance</option>';
	txt+='		<option>Technology</option>';
	txt+='		<option>Marketing</option>';
	txt+='		<option>Operations</option>';
	txt+='	</select>';
	txt+='	<select class="myselect" id="DedignSelect">';
	txt+='		<option selected value=0>Choose Designation</option>';
	txt+='		<option >Trainee</option>';
	txt+='		<option>Manager</option>';
	txt+='		<option>Vice-President</option>';
	txt+='		<option>President</option>';
	txt+='	</select>';
	txt+='	<button class="butt" onclick="doFilter()">Filter</button>';
	txt+='</p>';


	txt+='<table class="table">';
	txt+='	<tr>';
	txt+='		<th class="th" onclick="doSort(\'empcode\')">Emp Code</th>';
	txt+='		<th class="a" onclick="doSort(\'name\')">Name</th>';
	txt+='		<th class="th" onclick="doSort(\'age\')">Age</th>';
	txt+='		<th class="th" onclick="doSort(\'gender\')">Gender</th>';
	txt+='		<th class="a" onclick="doSort(\'department\')">Department</th>';
	txt+='		<th class="a" onclick="doSort(\'designation\')">Designation</th>';
	txt+='		<th class="a" onclick="doSort(\'salary\')">Salary</th>';
	txt+='		<th class="th"></th>';
	txt+='	</tr>';
	txt+='	<tr>';

	const arr=db.map(emp=>{
		let {empcode,name,age,gender,department,designation,salary}=emp;
		let str='<tr><td class="td">'+empcode+'</td>';
		str+='<td class="td">'+name+'</td>';
		str+='<td class="td">'+age+'</td>';
		str+='<td class="td">'+gender+'</td>';
		str+='<td class="td">'+department+'</td>';
		str+='<td class="td">'+designation+'</td>';
		str+='<td class="td">'+salary+'</td>';
		str+='<td class="td"><button class="butt" onclick="editFun(\''+empcode+'\')">Edit</button></td></tr>';
		return str;	
	});

	txt+=arr.join('');
	txt+='</table>';
	document.getElementById('show').innerHTML=txt;
}

//------------------------Show NavBar Code----------------------------------------------
function showNavBar() {
	let txt='<button class="butt" onclick="getNewEmpForm()" >New Employee</button>';
	txt+='<button class="butt" onclick="showAllEmpForm()" >All Employees</button>';
	txt+='<button class="butt" onclick="getFullDump()" >Full Dump</button>';
	txt+='<button class="butt" onclick="getPartialDump()" >Partial Dump</button><br>';
	let ele=document.getElementById('navbar').innerHTML=txt;
}
showNavBar();