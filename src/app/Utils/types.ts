// export type Students = {
// 	id : string
// 	firstName : string 
// 	secondName : string 
// 	thirdName : string 
// 	lastName : string 
// 	Nationality: string
// 	Gender: string 
// 	disablity_status: string 
// 	disablity_Desc  : string 
// 	disablity_type : string 
// 	NationalID : string
// 	Address : string
// 	StudentNum : string
// 	DadNum : string
// 	MomNum : string
// 	Grand_Num  : string
// 	st_Email  : string
// 	guardNum  : string
// 	imgUrl   : string
// 	img_position : string
// 	prevSchoolUrl  : string
// 	Sec_Num : string
// 	// username String @db.VarChar(30)
// 	BirthDate : string 
// 	prev_school : string
// 	isTransformed : boolean 
// 	special_needs : string 
// 	level_id : number
// 	user_id : number 
// }

export type Students = {
	id : string
	name  : string ,
	type  :  string ,            
	rank  :  string ,               
	phoneNum   :  string ,            
	has_oppointment :  string ,  
	oppointment  :  string ,         
	situation :  string ,       
	side :  string ,  
	region :  string ,               
	subject : string , 
	status : string  ,
	order : number,
	visit_times : string          

}
//         status, order, visit_times, updatedAt
export type Meeting = {
	// [key: string]: any
	id? : string
	name  : string ,
	type  :  string ,            
	rank  :  string ,               
	phoneNum   :  string ,            
	has_oppointment :  string ,  
	oppointment  :  string ,         
	situation :  string ,       
	side :  string ,  
	region :  string ,               
	subject : string , 
	status ?: string  ,
	order? : number,
	visit_times? : string          
	updatedAt : Date
}

export type Meeting2 = {
	id : string
	name  : string ,
	type  :  string ,            
	rank  :  string ,               
	phoneNum   :  string ,            
	has_oppointment :  string ,  
	oppointment  :  string ,         
	situation :  string ,       
	side :  string ,  
	region :  string ,               
	subject : string , 
	status : string  ,
	order : number,
	visit_times : string          
	updatedAt : string
}

export type WebSocketContextType = {
	socket: WebSocket | null;
	messages: Meeting[]; // Ensure this is an array
	setMessages: React.Dispatch<React.SetStateAction<Meeting[]>>; // Ensure it's updating an array
	Call: string;
	setCall: React.Dispatch<React.SetStateAction<string>>;
	Status: string;
	setStatus: React.Dispatch<React.SetStateAction<string>>;
	sendMessage: (msg: Meeting[] | string) => void;
  };
  


// id, name, type, rank, phoneNum, has_oppointment, oppointment,
// situation, side, region, subject, status, order, visit_times
















export type MangerSearchCriteria = {
	name: string;
	status : string ;
	rank: string;
	has_oppointment: string;
  };

export type order = {
	order: number;
  };
export type login = {
	id ? : string
	username: string;
	password: string;
	role ?: string;
  };
export type MYDate = {
	updatedAt: string;
  };
export type formData = {
	has_oppointment: string;
	oppointment?: string;
	status: string;
  };
 export type FormikErrors<T> = {
	[K in keyof T]?: string;
  };