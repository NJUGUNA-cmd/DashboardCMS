export interface Robot{
  id:string;
  name:string;
  type:string;
  status:'active'|"inactive"|"maintenance";
  lastActive:Date;
}
export interface RobotState{
  robots:Robot[];
  loading:boolean;
  error:null|string;
}
