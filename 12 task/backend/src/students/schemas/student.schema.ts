import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {

	@Prop()
	Id: Number;

	@Prop()
	Name: String;

	@Prop()
	Surname: String;

	@Prop()
	Patronymic: String;

	@Prop()
	Date_of_birth: Date;
	
	@Prop()
	Average_score: Number;

}

export const StudentSchema = SchemaFactory.createForClass(Student);