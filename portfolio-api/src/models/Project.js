import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
{
 title:String,
 description:String,
 tech:[String],
 image:String,
 github:String,
 demo:String
},
{
 timestamps:true,
 toJSON:{
  transform(doc,ret){
   ret.id = ret._id
   delete ret._id
   delete ret.__v
  }
 }
})
export default mongoose.model("Project", projectSchema);