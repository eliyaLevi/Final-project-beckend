import { Document } from "mongoose";

export interface ITerror extends Document {
  eventid?: number; //מספר זיהוי אירוע בת 12 ספרות
  iyear?: number; //שנה שאירע האירוע
  imonth?: number; // חודש שאירע האירוע
  iday?: number; // יום שאירע האירוע
  country_txt?: string; // שם המדינה שאירע האירוע
  region_txt?: string; // האיזור במדינה שאירע האירוע
  city?: string; // שם העיר שאירע האירוע
  latitude?: number; // קו אורך
  longitude?: number; // קו רוחב
  attacktype1_txt?: string; // סוג התקיפה לדוגמא התנקשות
  targtype1_txt?: string; // סוג המטרה שהותקפה כגון אזרחים או רכוש
  target1?: string; // מטרה ספציפית שהותקפה
  gname?: string; // שם הקבוצה האחראית על האירוע
  weaptype1_txt?: string; // סוג הנשק ששימש באירוע
  nkill?: number; // מספר ההרוגים באירוע
  nwound?: number; // מספר הפצועים באירוע
}

export default ITerror;
