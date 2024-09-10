export type Action<T=any> = {
  type:String,
  payload?:T;
};

export type ActionCreator<T = undefined > = (...args: any)=>{type:string; payload?:T};