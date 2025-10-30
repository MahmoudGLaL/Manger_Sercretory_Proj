// import { Students } from "../types"

export const initialValues = {
	// id : Data. ,
	firstName: '',
	secondName: '',
	thirdName: '',
	lastName: '',
	Nationality: '',
	Gender: '',
	disablity_status: '',
	disablity_type: '',
	disablity_Desc: '',
	NationalID: '',
	Address: '',
	StudentNum: '',
	DadNum: '',
	MomNum: '',
	Grand_Num: '',
	st_Email: '',
	guardNum: '',
	imgUrl: '',
	img_position: '',
	prevSchoolUrl: '',
	// username '' @db.VarChar(30)
	BirthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 20, 0, 1)),
	prev_school: '',
	isTransformed: false,
	special_needs: '',
	level_id: 1,
	user_id: 1,
	Sec_Num: '1'
}
export const initialValues2 = {
	id : '' ,
	order : 0 ,
	status : '' ,
	updatedAt : new Date() ,
	visit_times : '' ,
	phoneNum : '' ,
	name: '',
	type: '',
	rank: '',
	phone: '',
	has_oppointment: '',
	oppointment: '',
	situation: '',
	side: '',
	region: '',
	subject: '',
}

// export const getUpdatedValues = (Data: Students) => {
// 	console.log(Data);

// 	let UpdatedValues = {
// 		// id : '' ,
// 		firstName: '',
// 		secondName: '',
// 		thirdName: '',
// 		lastName: '',
// 		Nationality: '',
// 		Gender: '',
// 		disablity_status: '',
// 		disablity_type: '',
// 		disablity_Desc: '',
// 		NationalID: '',
// 		Address: '',
// 		StudentNum: '',
// 		DadNum: '',
// 		MomNum: '',
// 		Grand_Num: '',
// 		st_Email: '',
// 		guardNum: '',
// 		imgUrl: '',
// 		img_position: '',
// 		prevSchoolUrl: '',
// 		// username '' @db.VarChar(30)
// 		BirthDate: '',
// 		prev_school: '',
// 		isTransformed: false,
// 		special_needs: '',
// 		level_id: 1,
// 		user_id: 1,
// 		Sec_Num: '1'
// 	}
// 	if (Data?.firstName) {
// 		UpdatedValues = {
// 			// id : '' ,
// 			firstName: Data.firstName,
// 			secondName: Data.secondName,
// 			thirdName: Data.thirdName,
// 			lastName: Data.lastName,
// 			Nationality: Data.Nationality,
// 			Gender: Data.Gender,
// 			disablity_status: Data.disablity_status,
// 			disablity_type: Data.disablity_type,
// 			disablity_Desc: Data.disablity_Desc,
// 			NationalID: Data.NationalID,
// 			Address: Data.Address,
// 			StudentNum: Data.StudentNum,
// 			DadNum: Data.DadNum,
// 			MomNum: Data.MomNum,
// 			Grand_Num: Data.Grand_Num,
// 			st_Email: Data.st_Email,
// 			guardNum: Data.guardNum,
// 			imgUrl: Data.imgUrl,
// 			img_position: Data.img_position,
// 			prevSchoolUrl: Data.prevSchoolUrl,
// 			// username Data. @db.VarChar(30)
// 			BirthDate: Data.BirthDate,
// 			prev_school: Data.prev_school,
// 			isTransformed: Data.isTransformed,
// 			special_needs: Data.special_needs,
// 			level_id: Data.level_id,
// 			user_id: Data.user_id,
// 			Sec_Num: Data.Sec_Num
// 		}
// 		return UpdatedValues
// 	}
// 	else {
// 		return
// 	}
// }


