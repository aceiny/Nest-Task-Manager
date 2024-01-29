import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
    @Prop()
    Firstname : string

    @Prop()
    Lastname : string
    
    @Prop() 
    Fullname : string 
    
    @Prop()
    Phone : string
    
    @Prop({default : false})
    IsVerfied : boolean
    
    @Prop({unique : true})
    Email: string;
    
    @Prop()
    Password: string;
    
    @Prop()
    Role : string;
    
    @Prop()
    TWithdraw :  number
    
    @Prop()
    Tresponses :  number
    //@Prop() 
    //RTSurvies SurveyId[]
}

export const UserSchema = SchemaFactory.createForClass(User);