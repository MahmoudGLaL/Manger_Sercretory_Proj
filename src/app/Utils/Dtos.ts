export interface CreateStudentDto {
	firstName : string 
	secondName : string 
	thirdName : string 
	lastName : string 
	Nationality: string
	Gender: string 
	disablity_status: string 
	disablity_Desc  : string 
	disablity_type  : string
	NationalID : string
	Address : string
	StudentNum : string
	DadNum : string
	MomNum  : string
	Grand_Num : string
	st_Email  : string
	guardNum : string
	imgUrl  : string
	prevSchoolUrl  : string
	
	// username String @db.VarChar(30)
	BirthDate : Date ;
	prev_school  : string
	isTransformed : boolean ;
	special_needs  : string ;
	user_id : number ;
}
// update
export interface UpdateStudentDto {
	email ? : string 
	firstName ? : string 
	secondName ? : string 
	thirdName ? : string 
	lastName ? : string 
	Nationality ? : string
	Gender ? : string 
	disablity_status ? : string 
	disablity_Desc? : string 
	disablity_type ? : string
	NationalID ? : string
	Address ? : string
	StudentNum? : string
	DadNum ? : string
	MomNum ? : string
	Grand_Num? : string
	st_Email? : string
	guardNum? : string
	imgUrl  ? : object 
	prevSchoolUrl  ? : object
	
	// username String @db.VarChar(30)
	BirthDate ? : Date ;
	prev_school ? : string
	isTransformed? : boolean ;
	special_needs ? : string ;
}