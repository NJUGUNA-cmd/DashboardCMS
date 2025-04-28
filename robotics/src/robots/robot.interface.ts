export interface Robot{
    id:string;
    name:string;
    type:string;
    status:'active'|"inactive"|"maintenance";
    lastActive:Date;

}