// const arabic = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/  with num; 
// for server 
import { z } from 'zod'
import * as Yup from "yup"
// import { log } from 'node:console';

const max_year = new Date(new Date().setFullYear(new Date().getFullYear() - 5, 0, 1));
const min_year = new Date(new Date().setFullYear(new Date().getFullYear() - 21, 0, 1));
const overYear =  new Date() ;
min_year.setHours(0, 0, 0, 0);

const regex2 = /^[0-9]*$/;
const email = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
const address = /^[a-zA-Z\s]+,\s[a-zA-Z\s]+,\s\d+\s[a-zA-Z\s]+$/;
// const notSql = /^(?!.*\b(SELECT|UPDATE|DELETE|ALTER|INSERT|DROP)\b).*[^;]$/ ;



// const capNum = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
// const pass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/ ;

// const arabic = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s]+$/; 
// const notArabic = /[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;



// student Front end validation
export const StudentfrontSchema = Yup.object({

  firstName: Yup.string().required("* please,Enter FirstName * ")
    .test('invalid-text', " * FirstName shouldn't have any Numbers * ", value => !regex2.test(value))
    .min(2, '* minimum name should be at least 2 charcters *'),

  secondName: Yup.string().required("*please,Enter SecondName* ")
    .test('invalid-text', " * SecondName shouldn't have any Numbers * ", value => !regex2.test(value))
    .min(2, '* minmum name should be at least 2 charcters *'),

  thirdName: Yup.string().required("* please,Enter ThirdName * ")
    .test('invalid-text', " * thirdName shouldn't have any Numbers * ", value => !regex2.test(value))
    .min(2, '* minmum name should be at least 2 charcters *'),

  lastName: Yup.string().required("* please,Enter LastName * ")
    .test('invalid-text', " * LastName shouldn't have any Numbers * ", value => !regex2.test(value))
    .min(2, '* minmum name should be at least 2 charcters *'),

  NationalID: Yup.number().required(" * please,Enter National_ID * ")
  // .test('invalid-number'," * NationalID shouldn't have any letter * ",value => regex2.test(value)) 
  ,
  Address: Yup.string().required(" * please,Enter Address * ").matches(
    address,
    "Address must be in the format 'state, city, streetNumber streetName'."
  ),

  StudentNum: Yup.number().notRequired(),

  disablity_Desc: Yup.string().min(20, "please , add more information").notRequired(),
  //   .nullable()
  // .notRequired()
  guardNum: Yup.number().notRequired(),

  Grand_Num: Yup.number().notRequired(),

  DadNum: Yup.number().required(),

  st_Email: Yup.string().test(
    'valid-number',
    " * not valid Email * ",
    (value) => {
      if (!value) return true; // Pass if the field is empty
      return email.test(value); // Check if only numbers are present
    }
  ).notRequired(),

  // Nationality : Yup.string().required("*please,Enter Nationality*" ) ,
  // Address : Yup.string().required("*please,Enter Address*" ) ,
  // disablity_status : Yup.string().required("*please,Enter disablity_status*" ) ,

  // Gender : Yup.string().required("*please,Enter Gender* " ) ,

  BirthDate: Yup.date().test('InComing_Year', 'inValid incoming Year', (value) => {


    if (!value ) return true; // Pass if value is undefined (optional field) or less than 1900
    else if (value.getFullYear() < 1900 || value.getFullYear() > 2100 ) return true
    // Use type assertion to check file type
    return value.getFullYear() <= overYear.getFullYear()  ;
  }).test('overYear', "* student can't be more than 20 years *", (value) => {


    if (!value ) return true; // Pass if value is undefined (optional field) or less than 1900
    else if (value.getFullYear() <= 1900 ) return true
    // Use type assertion to check file type
    return value.getFullYear() > min_year.getFullYear()  ;
  }).max(max_year, "* student can't be less than 6 years *" )
  .required("BirthDate is Required"),

  imgUrl: Yup.mixed()
  .notRequired()
    .test('fileType', 'InValid Image Type', (value) => {
      if (!value) return true; // Pass if value is undefined (optional field)
      // Use type assertion to check file type
      return (value as File).type === 'image/jpeg' || (value as File).type === 'image/png' || (value as File).type === 'image/jpg' || (value as File).type === 'image/svg';
    })
    .test('fileSize', 'File size must be less than 5MB', (value) => {
      if (!value) return true; // Pass if value is undefined (optional field)
      // Use type assertion to check file size
      return (value as File).size <= 5 * 1024 * 1024;
    }),

  prevSchoolUrl: Yup.mixed()
    .notRequired() // The field is optional
    .test('fileSize', 'File size must be less than 5MB', async (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1000 * 1024; // 5MB
    }).test('fileType', 'Only pdf documents are allowed', async (value) => {
      if (!value) return true;

      return (
        (value as File).type === 'application/pdf'  // For .doc files
        // (value as File).type === 'application/msword' || // For .doc files
        // (value as File).type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // For .docx files
      );
    }),
}
)

export const StudentMangerSchema = Yup.object({
  name: Yup.string().required("* من فضلك ادخل اسم الزائر * ")
    .test('invalid-text', " * لا يمكن ادخال ارقام هنا * ", value => !regex2.test(value))
    .min(12, '* الحد الأدنى للأسم يجب ان يكون رباعي *'),
    type  :  Yup.string().required("* من فضلك ادخل النوع * ") ,            
    // rank  : Yup.string().required("* من فضلك ادخل الرتبة * "),               
    phone   :    Yup.string().test(
      'valid-number',
      " * غير مسموح ب ادخال نصوص * ",
      (value) => {
        if (!value) return true; // Pass if the field is empty
        if(value) return  regex2.test(value);
        // if(value.length < 12)
        ; // Check if only numbers are present
      }
    ).min(11, '* الحد الأدني للرقم يجب ان يكون 11*').notRequired(),    
    rank: Yup.string().when("type", (mainField, schema) =>
      mainField && mainField.toString() === "عسكري" ? schema.required("من فضلك ادخل الرتبه") : schema.notRequired()
    ),         
    has_oppointment :  Yup.string().required("* حدد اذا كان هناك معاد ام لا * ") ,  
    oppointment: Yup.string().when("has_oppointment", (mainField, schema) =>
      mainField && mainField.toString() === "نعم" ? schema.required("من فضلك ادخل الميعاد") : schema.notRequired()
    ) ,

    situation :  Yup.string().required("* من فضلك ادخل الموقف * ") ,       
    side :  Yup.string().required("* من فضلك ادخل الجهه * ") ,      
    region: Yup.string().when("side", (mainField, schema) =>
      mainField && mainField.toString() === "خارج المركز" ? schema.required("من فضلك ادخل المنطقه") : schema.notRequired()
    ) ,
                         
}
)



	
// 	// username String @db.VarChar(30)



// Student backend validation 
export const createStudentSchema = z.object({
  firstName: z.string({ required_error: "firstName is required" }).min(2, 'minimum for firstname must be 2').max(80, 'maximum for firstname must be 80'),
  secondName: z.string({ required_error: "secondName is required" }).min(2, 'minimum for secondName must be 2').max(80, 'maximum for secondName must be 80'),
  thirdName: z.string({ required_error: "thirdName is required" }).min(2, 'minimum for thirdName must be 2').max(80, 'maximum for thirdName must be 80'),
  lastName: z.string({ required_error: "lastName is required" }).min(2, 'minimum for lastName must be 2').max(80, 'maximum for lastName must be 80'),
  Nationality: z.string({ required_error: "Nationality is required" }),
  Gender: z.string({ required_error: "Gender is required" }),
  disablity_status: z.string({ required_error: "disablity_status is required" }),
  disablity_Desc: z.string().optional(),
  disablity_type: z.string().optional(),
  NationalID: z.string({ required_error: "NationalID is required" }),
  Address: z.string({ required_error: "Address is required" }),
  StudentNum: z.string().optional(),
  DadNum: z.string({ required_error: "DadNum is required" }),
  MomNum: z.string().optional(),
  Grand_Num: z.string().optional(),
  st_Email: z.string().optional(),
  guardNum: z.string().optional(),
  imgUrl: z.string().optional(),
  prevSchoolUrl: z.string().optional(),
  BirthDate: z.string().optional(),
  prev_school: z.string().optional(),
  isTransformed: z.boolean(),
  special_needs: z.string().optional(),
  user_id: z.number({ required_error: "user_id is required" }),
  level_id: z.number({ required_error: "level_id is required" }).optional(),
  img_position: z.string({ required_error: "img_position is required" }).optional(),
}); //.passthrough() Ignore extra fields

export const createOppointmentSchema = z.object({
  name: z.string({ required_error: "firstName is required" }).min(2, 'minimum for firstname must be 2').max(80, 'maximum for firstname must be 80'),
  type: z.string({ required_error: "type is required" }),
  // subject: z.string({ required_error: "disablity_status is required" }),
  has_oppointment: z.string({ required_error: "has_oppointment is required" }),
  situation: z.string({ required_error: "situation is required" })
}); //.passthrough() Ignore extra fields
export const UserSchema = z.object({
  userName: z.string({ required_error: "userName is required" }),
  password: z.string({ required_error: "password is required" }),
  role: z.string({ required_error: "role is required" }),
}); //.passthrough() Ignore extra fields



// interface Props {
//     params : {id : string}
// }

// (req : next , {params} : Props)

// articles.find(a=>a.id === parseInt(params.id))
// if(!found return nextResp)
// {{DOMAIN}}


